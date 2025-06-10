This code defines a utility function that executes a command based on its properties.

---

## How it works

- **Input:**  
  Takes a `command` object (of type `InnerCommand`).

- **Logic:**  
  1. If the command has a `perform` function, it calls that function.
  2. If not, but the command has an `href` property, it opens the link in a new tab (`_blank`) or the same tab (`_self`) depending on the `newTab` property.

---

## Example Usage

### 1. Command with `perform` function

```typescript
const command = {
  perform: () => alert('Action performed!')
}

run(command) // Shows alert: "Action performed!"
```

### 2. Command with `href` and `newTab`

```typescript
const command = {
  href: 'https://github.com',
  newTab: true
}

run(command) // Opens https://github.com in a new browser tab
```

### 3. Command with `href` and no `newTab`

```typescript
const command = {
  href: 'https://github.com',
  newTab: false
}

run(command) // Opens https://github.com in the current tab
```

---

**Summary:**  
This function lets you execute a command by either running its action or navigating to a link, depending on the command’s properties.