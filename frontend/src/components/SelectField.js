import React, { useEffect, useRef, useState } from 'react';

// Native <select> cannot carry the panel styling this design calls for (option rows,
// hover/selected states, layering above the dialog), so the list is rendered here and
// keyboard behaviour is reimplemented on the trigger button.
export default function SelectField({ id, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [placement, setPlacement] = useState({ side: 'down', maxHeight: 240 });
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);

  const selectedIndex = Math.max(0, options.indexOf(value));
  const listId = `${id}-listbox`;

  const show = (index) => {
    const rect = triggerRef.current.getBoundingClientRect();
    const gap = 20;
    const below = window.innerHeight - rect.bottom - gap;
    const above = rect.top - gap;
    // Drop down whenever that still leaves a usable list; only flip up when the trigger
    // sits near the bottom of the window or dialog.
    const side = below >= 200 || below >= above ? 'down' : 'up';
    setPlacement({ side, maxHeight: Math.min(240, Math.max(120, side === 'down' ? below : above)) });
    setActiveIndex(index);
    setOpen(true);
  };

  const commit = (index) => {
    onChange(options[index]);
    setOpen(false);
    triggerRef.current.focus();
  };

  const handleKeyDown = (event) => {
    if (!open) {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
        event.preventDefault();
        show(event.key === 'ArrowUp' ? options.length - 1 : selectedIndex);
      }
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((current) => (current + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      setActiveIndex(event.key === 'Home' ? 0 : options.length - 1);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      commit(activeIndex);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Tab') {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!open) return undefined;
    const closeOnOutsidePress = (event) => {
      if (!rootRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsidePress);
    return () => document.removeEventListener('mousedown', closeOnOutsidePress);
  }, [open]);

  // Keep the active row inside the panel without scrolling the dialog itself.
  useEffect(() => {
    const panel = panelRef.current;
    const row = panel && panel.children[activeIndex];
    if (!open || !row) return;
    const top = row.offsetTop;
    const bottom = top + row.offsetHeight;
    if (top < panel.scrollTop) panel.scrollTop = top;
    else if (bottom > panel.scrollTop + panel.clientHeight) panel.scrollTop = bottom - panel.clientHeight;
  }, [open, activeIndex]);

  return (
    <div ref={rootRef} className={`svc-select${open ? ' svc-select--open' : ''}`}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        className="svc-select__trigger"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-labelledby={`${id}-label`}
        aria-activedescendant={open ? `${listId}-${activeIndex}` : undefined}
        onKeyDown={handleKeyDown}
        onClick={() => (open ? setOpen(false) : show(selectedIndex))}
      >
        <span className="svc-select__value">{value}</span>
        <svg className="svc-select__chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          ref={panelRef}
          id={listId}
          className={`svc-select__panel svc-select__panel--${placement.side}`}
          style={{ maxHeight: placement.maxHeight }}
          role="listbox"
          aria-labelledby={`${id}-label`}
        >
          {options.map((option, index) => {
            const isSelected = option === value;
            const classes = ['svc-select__option'];
            if (isSelected) classes.push('svc-select__option--selected');
            if (index === activeIndex) classes.push('svc-select__option--active');
            return (
              <li
                key={option}
                id={`${listId}-${index}`}
                className={classes.join(' ')}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => {
                  event.preventDefault();
                  commit(index);
                }}
              >
                <span>{option}</span>
                {isSelected && (
                  <svg className="svc-select__tick" width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2.5 7.5L5.5 10.5L11.5 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
