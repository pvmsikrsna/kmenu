Here’s an explanation of the `useKmenu` hook code, along with a usage example:

---

## What does `useKmenu` do?

`useKmenu` is a custom React hook that provides utility functions and state for controlling the command menu (kmenu) in your app.  
It must be used inside a `MenuProvider`.

---

## What does it return?

- **input**: The current search/query string in the command menu.
- **setInput**: Function to update the query string.
- **isOpen**: Function that returns `true` if the menu is open.
- **open**: The index of the currently open menu.
- **setOpen**: Function to open a nested menu (with optional animation).
- **lastOpen**: The index of the last open menu.
- **setLastOpen**: Function to set the last open menu index.
- **toggle**: Function to toggle the menu open/closed.

---

## Example Usage

```tsx
import { useKmenu } from 'kmenu'

function CommandMenuButton() {
  const { isOpen, toggle, input, setInput } = useKmenu()

  return (
    <div>
      <button onClick={toggle}>
        {isOpen() ? 'Close Command Menu' : 'Open Command Menu'}
      </button>
      {isOpen() && (
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a command..."
        />
      )}
    </div>
  )
}
```

**How it works:**
- Clicking the button toggles the command menu.
- When open, an input appears, bound to the menu’s query state.

---

**Summary:**  
`useKmenu` gives you easy access to the command menu’s state and controls, so you can open, close, and interact with the menu from any component inside the `MenuProvider`.