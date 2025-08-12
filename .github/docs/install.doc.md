# ⚙️ Getting Started

## ▶️ Install with Yarn

To get up and running, just clone the repo and install all dependencies:

```bash
yarn install
```

That’s it. You’re ready to roll 🚀

---

## 📦 Packages Overview

Here’s a breakdown of the core packages used in this project, grouped by functionality for easy reference:

---

### 🧩 Form & Validation

- **[`react-hook-form`](https://react-hook-form.com/):** Performant and intuitive form handling for React apps.
- **[`@hookform/resolvers`](https://github.com/react-hook-form/resolvers):** Bridges validation libraries like Zod with `react-hook-form`.
- **[`zod`](https://zod.dev/):** Type-safe, schema-based validation library. Works perfectly with TypeScript.

---

### 🎨 UI & Design System

- **[`@radix-ui/*`](https://www.radix-ui.com/):** Low-level accessible UI primitives (Dialog, Tooltip, Tabs, etc.).
- **[`tailwindcss`](https://tailwindcss.com/):** Utility-first CSS framework for rapid UI building.
- **[`tailwind-merge`](https://github.com/dcastil/tailwind-merge):** Smart class merging to avoid style conflicts.
- **[`tailwindcss-animate`](https://github.com/joe-bell/tailwindcss-animate):** Pre-configured animation classes for Tailwind.
- **[`tw-animate-css`](https://www.npmjs.com/package/tw-animate-css):** Plug-and-play Animate.css classes in Tailwind.
- **[`lucide-react`](https://lucide.dev/):** Beautiful, consistent open-source SVG icons.
- **[`clsx`](https://github.com/lukeed/clsx)** & **[`class-variance-authority`](https://cva.style/):** Smart utilities for conditional className handling and scalable UI component variants.

---

### ⚙️ State Management & API

- **[`@tanstack/react-query`](https://tanstack.com/query/latest):** Powerful tool for fetching, caching, and syncing server state.
- **[`axios`](https://axios-http.com/):** Promise-based HTTP client for making API calls.
- **[`zustand`](https://github.com/pmndrs/zustand):** Lightweight global state management, minimal boilerplate.

---

### ✍️ Rich Text & Markdown

- **[`@tiptap/react`](https://tiptap.dev/):** Headless rich-text editor built on ProseMirror.
- **`@tiptap/extension-*` + `starter-kit`**: Add-ons for blockquotes, images, links, strike-through, etc.
- **[`tiptap-markdown`](https://www.npmjs.com/package/tiptap-markdown):** Convert between Markdown and Tiptap content.
- **[`react-markdown`](https://github.com/remarkjs/react-markdown)** + **[`remark-gfm`](https://github.com/remarkjs/remark-gfm):** Render and support GitHub-flavored Markdown in React.

---

### 📅 Date & Utility

- **[`date-fns`](https://date-fns.org/):** Lightweight date utilities.
- **[`lodash`](https://lodash.com/):** Utility functions for arrays, objects, strings, etc.
- **[`bowser`](https://www.npmjs.com/package/bowser):** Detect and parse user agent strings.

---

### 📊 Data Visualization

- **[`recharts`](https://recharts.org/):** Chart library built with React and D3.

---

### 🧪 Dev Tools & Linting

- **`eslint`, `prettier`, `eslint-plugin-prettier`, `eslint-config-next`**: Linting & formatting for a clean, consistent codebase.
- **`husky`, `lint-staged`**: Git hooks for pre-commit checks.
- **`typescript`, `@types/*`**: Type safety across the whole codebase.
