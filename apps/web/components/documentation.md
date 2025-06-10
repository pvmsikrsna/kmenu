# Component Documentation for `apps/web/components`

Below are notes for each component in this directory, describing their purpose, how they work, and how to customize them with code examples.

---

## 1. `CommandMenu.tsx`

**Purpose:**  
Provides a multi-menu command palette experience using the `kmenu` library.

**How it works:**  
- Uses `useKmenu` and `useTheme` hooks to manage menu state and theme.
- Defines several command arrays (main, projects, teams, theme) with categories and actions.
- Uses `useCommands` to process command definitions.
- Renders multiple `CommandMenu` components inside a `CommandWrapper`, each with its own commands, breadcrumbs, and placeholder.

**Customization Example:**
```tsx
const main: Command[] = [
  {
    category: "Projects",
    commands: [
      {
        icon: <FiGrid />,
        text: "Search Projects...",
        shortcuts: { modifier: <BsShift />, keys: ["P"] },
        perform: () => setOpen(2),
      },
      // ...more commands
    ],
  },
  // ...more categories
];

const [mainCommands] = useCommands(main);

<CommandMenu
  commands={mainCommands}
  crumbs={["Home"]}
  index={1}
  placeholder="What do you need?"
/>
```
You can add or modify categories, commands, and their actions as needed.

---

## 2. `Hero.tsx`

**Purpose:**  
Displays the main hero section with the project name, tagline, and quick actions.

**How it works:**  
- Shows the project title and description.
- Provides a button to copy the install command to clipboard, with feedback.
- Includes a "Get Started" link to the GitHub repo.
- Uses animation classes for visual effects.

**Customization Example:**
```tsx
<button
  onClick={() => {
    setCopy(true);
    navigator.clipboard.writeText("npm install kmenu");
  }}
>
  npm install kmenu
  {/* ...icon logic... */}
</button>
```
You can change the install command, icons, or add more actions as needed.

---

## 3. `Footer.tsx`

**Purpose:**  
Displays a fixed footer with a keyboard shortcut hint.

**How it works:**  
- Shows the message "Press ⌘K to open" at the bottom of the screen.
- Uses animation and styling classes for appearance.

**Customization Example:**
```tsx
<footer>
  <p>Press ⌘K to open</p>
</footer>
```
You can change the message or add more instructions as needed.

---

For more details and advanced usage, see the main [README.md](../../README.md).
