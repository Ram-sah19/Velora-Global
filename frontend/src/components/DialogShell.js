import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

// Reference-counted so overlapping dialogs (and the hero freeze) can't restore a stale
// `overflow` value and leave the document unscrollable.
const lockStack = new Set();

function setLocked(owner) {
  if (lockStack.size === 0) {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  } else if (owner) {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Attach the returned ref to the dialog panel to get scroll lock, Escape-to-close,
// a focus trap, and focus returned to the trigger on close. Pass lockScroll: false for
// notices that open themselves — they must not freeze the document scroll (§3) and closing
// one would otherwise wipe a `hidden` value the hero's story freeze had set.
export function useDialog(active, onClose, lockScroll = true) {
  const panelRef = useRef(null);
  const ownerRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!active) return undefined;
    const owner = {};
    if (lockScroll) {
      ownerRef.current = owner;
      lockStack.add(owner);
      setLocked(owner);
    }

    const trigger = document.activeElement;
    const panel = panelRef.current;
    const raf = requestAnimationFrame(() => {
      if (!panel) return;
      const target = panel.querySelector(FOCUSABLE);
      (target || panel).focus({ preventScroll: true });
    });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        // This listener runs in the capture phase, before any handler on the target, so a
        // listbox that is open has to be recognised here: Escape closes its panel, not the dialog.
        if (event.target instanceof Element && event.target.closest('[role="combobox"][aria-expanded="true"]')) {
          return;
        }
        event.stopPropagation();
        closeRef.current();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;
      const focusables = Array.from(panel.querySelectorAll(FOCUSABLE))
        .filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (focusables.length === 0) {
        event.preventDefault();
        panel.focus({ preventScroll: true });
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', handleKeyDown, true);
      if (lockScroll) {
        lockStack.delete(owner);
        setLocked(null);
      }
      if (trigger && typeof trigger.focus === 'function') trigger.focus({ preventScroll: true });
    };
  }, [active, lockScroll]);

  return panelRef;
}

export default function DialogShell({ labelId, onClose, overlayStyle, panelClassName, panelStyle, onPanelClick, lockScroll = true, children }) {
  const panelRef = useDialog(true, onClose, lockScroll);

  return ReactDOM.createPortal(
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(11, 15, 25, 0.7)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        overflowY: 'auto',
        ...overlayStyle
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        tabIndex={-1}
        className={panelClassName}
        style={panelStyle}
        onClick={(event) => {
          event.stopPropagation();
          if (onPanelClick) onPanelClick(event);
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
