This file defines a React component for rendering a single command item in a command menu. It handles keyboard shortcuts, selection, scrolling into view, checkboxes, and supports both custom anchor components and standard links.

---

## How it works

### 1. **Props**
- `command`: The command object (with text, icon, shortcuts, etc.).
- `onMouseEnter`: Function to call when the mouse moves over the command (for selection).
- `isSelected`: Boolean indicating if this command is currently selected.

### 2. **State and Context**
- Uses `MenuContext` to access `setOpen` (for closing the menu).
- Tracks checkbox state if the command has a checkbox.

### 3. **Keyboard Shortcut**
- Uses `useShortcut` to trigger the command when the Enter key is pressed and the command is selected.

### 4. **Scrolling into View**
- Uses `useInView` and refs to check if the command is visible in the scrollable area.
- If the command is selected but not fully in view, it scrolls it into view smoothly.

### 5. **Click Handling**
- When clicked:
  - Toggles checkbox state (if present).
  - Runs the command (calls `perform` or opens a link).
  - Closes the menu if `closeOnComplete` is set.

### 6. **Rendering**
- If `command.anchor` is provided, uses it as a custom anchor component.
- Otherwise, renders a standard `<a>` tag.
- Shows icon, text, checkbox (if applicable), and keyboard shortcuts.

---

## Example Usage

Suppose you have a command like this:

```typescript
const command = {
  text: 'Open GitHub',
  icon: <GitHubIcon />,
  href: 'https://github.com',
  newTab: true,
  shortcuts: { modifier: 'ctrl', keys: ['g'] },
  closeOnComplete: true,
}
```

You can render it in a menu:

```tsx
<Command
  command={command}
  isSelected={selectedIndex === 0}
  onMouseEnter={() => setSelectedIndex(0)}
/>
```

**What happens:**
- The command displays with its icon and text.
- Shows the shortcut (`Ctrl + g`).
- If you click it or press Enter while it’s selected, it opens GitHub in a new tab and closes the menu.
- If the command is not fully visible, it scrolls into view when selected.

---

## Summary

- **Command** is a flexible menu item component.
- Handles keyboard shortcuts, selection, scrolling, checkboxes, and custom anchors.
- Useful for building accessible, interactive command menus in React apps.