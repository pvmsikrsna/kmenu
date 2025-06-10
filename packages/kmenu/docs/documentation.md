
# Kmenu Components: Overview, Functionality, and Customization

This document summarizes the main components in the `kmenu` package, explaining their purpose, how they work, and how you can customize them with code examples.

---

## 1. `MenuProvider`

**What it does:**  
Wraps your app or a subtree to provide menu context (state, handlers, etc.) to all child components using React Context.

**How it works:**  
- Manages state for open/close, selected item, search query, results, etc.
- Provides context to all menu-related components.

**Customization Example:**
```tsx
import { MenuProvider } from 'kmenu'

<MenuProvider dimensions={{ commands: 8, sectionHeight: 40 }}>
  <YourApp />
</MenuProvider>
```
*You can customize the `dimensions` prop to control menu sizing.*

---

## 2. `CommandMenu`

**What it does:**  
The main menu UI component. Renders the command palette, handles keyboard navigation, search, and displays results.

**How it works:**  
- Consumes context from `MenuProvider`.
- Renders input, command list, and handles user interaction.
- Supports loading states, placeholders, and custom rendering.

**Customization Example:**
```tsx
import { CommandMenu } from 'kmenu'

<CommandMenu
  index={0}
  commands={yourCommands}
  crumbs={['Main']}
  placeholder="Type a command..."
  loadingPlaceholder={<span>Loading...</span>}
  loadingState={isLoading}
/>
```
*You can customize the placeholder, loading state, and pass your own commands.*

---

## 3. `CommandWrapper`

**What it does:**  
Wraps the command input and menu, providing default input value and context.

**How it works:**  
- Optionally sets a default value for the search input.
- Useful for resetting or pre-filling the command bar.

**Customization Example:**
```tsx
import { CommandWrapper } from 'kmenu'

<CommandWrapper defaultValue="help" />
```

---

## 4. `Checkbox`

**What it does:**  
A simple checkbox component for use in command items.

**How it works:**  
- Can be used as an icon or state indicator in commands.
- Controlled via the `checked` prop.

**Customization Example:**
```tsx
import { Checkbox } from 'kmenu'

<Checkbox checked={true} />
```

---

## 5. `useKmenu` (Hook)

**What it does:**  
Custom React hook to control the menu programmatically.

**How it works:**  
- Returns state and handlers for input, open/close, and toggling the menu.

**Customization Example:**
```tsx
import { useKmenu } from 'kmenu'

const { input, setInput, isOpen, open, setOpen, toggle } = useKmenu()
```

---

## 6. `useCommands` (Hook)

**What it does:**  
Manages and filters the list of commands based on the current query.

**How it works:**  
- Returns filtered commands for rendering.
- Handles search and keyboard navigation.

**Customization Example:**
```tsx
import { useCommands } from 'kmenu'

const commands = useCommands(yourCommandList)
```

---

## 7. `useShortcut` (Hook)

**What it does:**  
Registers global keyboard shortcuts for triggering commands.

**How it works:**  
- Listens for specified key/modifier combinations.
- Calls a handler when the shortcut is pressed.

**Customization Example:**
```tsx
import { useShortcut } from 'kmenu'

useShortcut({ targetKey: 'k', modifier: 'meta', handler: () => openMenu() })
```

---

## 8. `useClickOutside` (Hook)

**What it does:**  
Detects clicks outside a referenced element to close the menu or perform other actions.

**How it works:**  
- Takes a ref and a handler function.
- Calls the handler when a click outside the ref is detected.

**Customization Example:**
```tsx
import { useClickOutside } from 'kmenu'

const ref = useRef<HTMLDivElement>(null)
useClickOutside({ ref, handler: () => closeMenu() })
```

---

## 9. Command Structure

**Command Object Example:**
```tsx
const commands = [
  {
    category: 'General',
    commands: [
      {
        text: 'Open Settings',
        icon: <SettingsIcon />,
        perform: () => openSettings(),
        keywords: ['settings', 'preferences'],
        shortcuts: { modifier: 'meta', keys: ['s'] },
      },
    ],
  },
]
```
*You can add icons, actions, keywords, shortcuts, and more to each command.*

---

## 10. Customizing Menu Appearance

- Use the `dimensions` prop in `MenuProvider` to control menu and item sizing.
- Use the `placeholder` prop in `CommandMenu` for custom input hints.
- Use `loadingPlaceholder` and `loadingState` for async data.

---

**Summary:**  
The `kmenu` package provides a flexible, context-driven command menu system for React. You can customize its behavior and appearance via props, hooks, and command definitions, making it suitable for a wide range of applications.

