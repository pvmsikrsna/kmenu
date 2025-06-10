## Question: How the code selected next or previous item using tab or shift tab ?


Great question! In your code, the **up** and **down arrow keys** are handled directly using the `useShortcut` hook, which calls `upHandler` and `downHandler` to dispatch actions that change the selected item.

However, **Tab** and **Shift+Tab** navigation is not handled in the code you shared. If you want to support using Tab to move to the next item and Shift+Tab to move to the previous item (like in VS Code), you need to add handlers for those keys as well.

### How Arrow Keys Work (Current Code)
```tsx
const upHandler = () => dispatch({ type: ActionType.DECREASE, custom: 0 })
const downHandler = () => dispatch({ type: ActionType.INCREASE, custom: 0 })

useShortcut({ targetKey: 'ArrowUp', handler: upHandler })
useShortcut({ targetKey: 'ArrowDown', handler: downHandler })
```
- Pressing **ArrowUp** calls `upHandler`, which dispatches a "DECREASE" action to move the selection up.
- Pressing **ArrowDown** calls `downHandler`, which dispatches an "INCREASE" action to move the selection down.

---

### How to Add Tab and Shift+Tab Support

You can add similar handlers for Tab and Shift+Tab:

```tsx
const tabHandler = (e: KeyboardEvent) => {
  e.preventDefault()
  dispatch({ type: ActionType.INCREASE, custom: 0 })
}
const shiftTabHandler = (e: KeyboardEvent) => {
  e.preventDefault()
  dispatch({ type: ActionType.DECREASE, custom: 0 })
}

useShortcut({ targetKey: 'Tab', handler: tabHandler })
useShortcut({ targetKey: 'Tab', handler: shiftTabHandler, shift: true })
```

- **Tab** will move the selection down (next item).
- **Shift+Tab** will move the selection up (previous item).

---

**Summary:**  
Currently, only ArrowUp and ArrowDown are supported for navigation. To support Tab and Shift+Tab, add handlers for those keys as shown above. This will make your command menu more keyboard-friendly!

Similar code found with 1 license type


## How the background scroll is disabled while the menu is open? How the scroll is enabled back when menu is closed ?

In this code, the background scroll is typically disabled by adding a CSS style like `overflow: hidden` to the `<body>` element when the menu is open, and removing it when the menu is closed.

**However, in the code you shared, this logic is not shown directly.**  
Usually, this is handled inside the `MenuProvider` or a related effect. Here’s how it’s commonly implemented:

---

### Example Implementation

```tsx
// This would be inside MenuProvider or a similar context/provider
useEffect(() => {
  if (open) {
    document.body.style.overflow = 'hidden' // Disable background scroll
  } else {
    document.body.style.overflow = '' // Restore scroll
  }
  return () => {
    document.body.style.overflow = '' // Clean up on unmount
  }
}, [open])
```

- When the menu is **open**, `document.body.style.overflow` is set to `'hidden'`, preventing the background from scrolling.
- When the menu is **closed**, it resets to allow scrolling again.

---

**Summary:**  
- **Scroll is disabled** by setting `document.body.style.overflow = 'hidden'` when the menu opens.
- **Scroll is enabled** by resetting or removing that style when the menu closes.

If you want to see the exact implementation, check your `MenuProvider` or the main component that manages the menu’s open state.