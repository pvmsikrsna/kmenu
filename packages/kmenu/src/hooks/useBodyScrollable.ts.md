This code defines a custom React hook called `useBodyScrollable`. It tells you if the page’s `<body>` is currently scrollable vertically (i.e., if the content is taller than the visible window).

---

## How it works

- **State:**  
  Uses `useState` to track if the body is scrollable (`bodyScrollable`).

- **Effect:**  
  - Sets up a `ResizeObserver` to watch for changes in the size of the `<body>`.
  - Whenever the body resizes, it checks if `document.body.scrollHeight > window.innerHeight`:
    - If true, the body is scrollable.
    - If false, the body is not scrollable.
  - Cleans up the observer when the component unmounts.

- **Return:**  
  Returns a boolean (`bodyScrollable`) indicating if the body is scrollable.

---

## Example Usage

Suppose you want to show a "Back to Top" button only when the page is scrollable:

```typescript
import React from 'react'
import useBodyScrollable from './useBodyScrollable'

function BackToTopButton() {
  const bodyScrollable = useBodyScrollable()

  if (!bodyScrollable) return null

  return (
    <button
      style={{ position: 'fixed', bottom: 20, right: 20 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      Back to Top
    </button>
  )
}
```

**What happens:**  
- The button only appears if the page content is tall enough to require scrolling.

---

**Summary:**  
`useBodyScrollable` is a handy hook for detecting if the page is scrollable, so you can show or hide UI elements based on that condition.