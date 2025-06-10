This file defines the `CommandWrapper` React component, which provides the structure and behavior for a command menu modal. It handles opening/closing, animation, focus management, breadcrumbs, and search input.

---

## How it works

### 1. **Context and Refs**
- Uses `MenuContext` to access menu state and actions (`open`, `setOpen`, `query`, `setQuery`, `crumbs`, etc.).
- Uses a `menuRef` to reference the menu dialog for click-outside detection.

### 2. **Click Outside to Close**
- Uses the `useClickOutside` hook:  
  If the user clicks outside the menu dialog, `setOpen(0)` is called to close the menu.

### 3. **Animation**
- Uses `framer-motion` for smooth open/close transitions.
- Animation respects user’s reduced motion preferences and Firefox quirks via `useAnimation`.

### 4. **Backdrop and Dialog**
- Renders a backdrop overlay and a modal dialog when `open > 0`.
- The dialog contains:
  - **Breadcrumbs:** Navigation buttons for menu hierarchy.
  - **Search Input:** For filtering commands.
  - **Children:** The actual command list or content passed as children.

### 5. **Accessibility**
- Uses ARIA roles and attributes for accessibility (`role="dialog"`, `aria-modal`, `role="combobox"`, etc.).
- The search input is auto-focused and supports keyboard navigation.

---

## Example Usage

Suppose you want to use `CommandWrapper` to wrap your command menu:

```tsx
import { CommandWrapper } from './CommandWrapper'
import CommandList from './CommandList'

function App() {
  return (
    <CommandWrapper>
      <CommandList />
    </CommandWrapper>
  )
}
```

**What happens:**
- When the menu is open (`open > 0` in context), a modal appears with a search bar and breadcrumbs.
- Clicking outside the menu closes it.
- Typing in the search bar updates the query.
- The command list (passed as children) is rendered inside the modal.
- Breadcrumbs allow navigation through nested menus.

---

## Summary

- **CommandWrapper** provides a modal command menu with animation, search, breadcrumbs, and click-outside-to-close.
- It’s designed to be accessible and customizable, wrapping your command menu content.
- Use it as a container for your command palette or quick command UI in React apps.