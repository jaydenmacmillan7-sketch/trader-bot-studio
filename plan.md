# AURORA.FX: Neon Glass Revamp & Customization Plan

## 1. Theme Transformation (Neon Glass Reversion)
- Replace the "Aquatic Blue" theme with a "Premium Cyber-Professional Neon Glass" interface.
- Core aesthetic: Deep black backgrounds, semi-transparent glass panels with high-blur, and vibrant neon accents.
- Implement dynamic accent colors based on user selection.

## 2. Dynamic Color System
- Create a state-driven color system for neon accents (primary, glow, borders).
- Default to Cyber Cyan (#00f2ff).
- Add a utility to apply these colors to Tailwind classes or via CSS variables.

## 3. Advanced Settings Menu
- Add a "Settings" section accessible via the user profile or hamburger menu.
- **Color Customization**:
  - Predefined palette: Neon Blue, Cyber Pink, Emerald Green, Electric Gold, Crimson Red.
  - Custom color picker (Hex input).
- **Automation Settings**:
  - "Auto-Trade Limit": Numeric input to set how many trades the bot should execute automatically when connected.

## 4. Feature Preservation & Integration
- Retain all core MT4/MT5 trading controls ('Engage', 'Suspend', 'Abort').
- Keep the hamburger menu content: AURORA.FX AI, Community Chat, Service Guides, Code of Conduct, Privacy Policies.
- Keep the "Signal Intelligence" (screenshot analysis) feature.
- Maintain the user profile and licensing system.

## 5. UI/UX Polish
- Use `framer-motion` for fluid transitions between themes/colors.
- Use `sonner` for high-visibility notifications during settings changes.
- Ensure 100% mobile-first responsiveness for all new and modified components.
