# Velora Global Project Guidelines & Rules

## 1. STRICT HERO SECTION LOCK (NON-NEGOTIABLE)
- **CRITICAL DIRECTIVE**: Under NO circumstances should the Hero Section (`HeroSection.js`) be modified, touched, refactored, restructured, or replaced without direct, explicit permission from the user.
- **The Hero Section must remain exactly as it is**: Its 4-step story scroll, animations, layout, background effects, styling, and behavior are completely locked.
- Even if fixing other sections, adding features, or resolving issues elsewhere on the website, **never touch `HeroSection.js`**.

## 2. Component Safeguards & Modular Architecture
- When adding, extracting, or updating new sections (e.g., Domain Specializations, Services, Internships), build them as completely isolated, modular components.
- Never modify or break existing working parent sections or layouts.

## 3. Scroll & UX Stability
- Never introduce unintentional scrollbar freezes, permanent body overflow locks (`overflow: hidden`), or scroll-jacking regressions.
- Ensure all page transitions, navigation links, and back-button actions reliably leave the document scrollbar free and responsive (`overflow: unset`).
- Maintain smooth, natural scroll speeds without sudden momentum dumps or jarring jumps after transitions.

## 4. Design & Code Quality Standards
- Adhere strictly to the corporate design system: clean typography, refined contrast, rounded pill buttons, and subtle backdrop blurs.
- **Zero emojis in interactive UI**: Do not use emojis in buttons, badges, headers, or critical UI elements unless specifically asked. Use professional SVGs or clean icons instead.
- All code changes must compile cleanly (`npm run build`) with zero lint or runtime errors.
