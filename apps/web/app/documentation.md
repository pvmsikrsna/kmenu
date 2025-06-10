# Component Documentation for `apps/web/app`

Below are notes for each component in the provided files, describing their purpose, how they work, and how to customize them with code examples.

---

## 1. `providers.tsx`

**Purpose:**  
Sets up global providers for the app, including theme and command menu context.

**How it works:**  
- Uses `ThemeProvider` from `next-themes` to enable dark/light/system themes.
- Uses `MenuProvider` from `kmenu` to provide command menu context and configuration.
- Waits for the component to mount before rendering children to avoid hydration mismatches.

**Customization Example:**
```tsx
const dimensions: Dimensions = {
  sectionHeight: 40,
  commandHeight: 60,
  commands: 8,
};

<MenuProvider dimensions={dimensions}>{children}</MenuProvider>
```
You can adjust the `dimensions` object to change the menu's appearance.

---

## 2. `layout.tsx`

**Purpose:**  
Defines the root layout for the Next.js app, including metadata, global styles, and providers.

**How it works:**  
- Imports global CSS and command menu CSS.
- Sets up metadata for SEO and social sharing.
- Wraps the app in `Providers` (from `providers.tsx`) and includes the `CommandMenu` component globally.
- Applies the Inter font and background color classes.

**Customization Example:**
```tsx
<body className={clsx(inter.className, "bg-neutral-100 dark:bg-neutral-950")}>
  <Providers>
    <CommandMenu />
    {children}
  </Providers>
</body>
```
You can add more providers or global components as needed.

---

## 3. `page.tsx`

**Purpose:**  
Defines the main page content for the app.

**How it works:**  
- Renders the `Hero` and `Footer` components inside a root div.

**Customization Example:**
```tsx
<div className="root">
  <Hero />
  <Footer />
</div>
```
You can add more components or content between `Hero` and `Footer` as needed.

---

## 4. `cmdk.css`

**Purpose:**  
Provides Tailwind CSS utility classes for styling the command menu and related UI.

**How it works:**  
- Uses `@apply` to compose utility classes for each selector.
- Styles elements like `.backdrop`, `.dialog`, `.command`, `.shortcuts`, etc.

**Customization Example:**
```css
.command {
  @apply relative flex h-[60px] items-center justify-between text-base text-neutral-600;
}
```
You can override or extend these styles in your own CSS files.

---

For more details and advanced usage, see the main [README.md](../../README.md).
