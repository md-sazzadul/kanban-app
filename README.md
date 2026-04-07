# Kanban Board App

A full-featured, production-quality Kanban board built with React 19, TypeScript, and modern tooling. Designed to demonstrate real-world frontend architecture, UI/UX polish, and clean engineering practices.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38BDF8?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white)

---

## Live Demo

> **Credentials:** `test@test.com` / `123456`

---

## Features

- **Drag & Drop** — Smooth card reordering within and across columns powered by `@dnd-kit`
- **Authentication** — Session-persisted login with protected routes
- **Task Management** — Create, edit, and delete tasks via modal forms with validation
- **Priority System** — Low / Medium / High priority labels with visual color coding
- **Search** — Real-time task filtering with keyword highlighting
- **Priority Filter** — Filter tasks across all columns by priority level
- **Dark / Light Mode** — System-aware theme with manual toggle and `localStorage` persistence
- **Multiple Boards** — Tab-based navigation between independent boards
- **Responsive Design** — Mobile-friendly layout with custom scrollbars and adaptive UI

---

## Tech Stack

| Layer            | Technology                          |
| ---------------- | ----------------------------------- |
| Framework        | React 19                            |
| Language         | TypeScript 5.8 (strict mode)        |
| Styling          | Tailwind CSS v4                     |
| State Management | Zustand 5 with `persist` middleware |
| Routing          | React Router v7                     |
| Drag & Drop      | @dnd-kit/core + @dnd-kit/sortable   |
| HTTP Client      | Axios                               |
| Validation       | Zod                                 |
| Build Tool       | Vite 7                              |
| Linting          | ESLint 9 + typescript-eslint        |

---

## Architecture

The project follows a **feature-sliced** folder structure, keeping concerns separated and files easy to locate:

```
src/
├── app/               # App-level initializers and layout wrappers
├── components/        # Shared UI components (Modal, ThemeToggle)
├── context/           # React context definitions
├── features/
│   ├── auth/          # Login state and store
│   ├── board/         # Board header, board view, board store
│   ├── column/        # Column component and store
│   ├── filter/        # Priority filter UI
│   ├── search/        # Search bar UI
│   └── task/          # Task card, task form, task store
├── hooks/             # Custom React hooks (useTheme)
├── pages/             # Route-level page components
├── provider/          # ThemeProvider
├── routes/            # Router config and ProtectedRoute guard
├── services/          # API layer (Axios wrappers)
├── types/             # Shared TypeScript types
└── utils/             # Utility helpers
```

### Key Design Decisions

- **Zustand over Redux** — Lightweight global state without boilerplate; `persist` middleware handles localStorage sync cleanly
- **Feature-first folders** — Co-locates each feature's component, store, and logic, making the codebase scalable as it grows
- **Service layer** — All API calls live in `/services`, keeping components decoupled from data-fetching concerns
- **Zod validation** — Form validation at the boundary keeps invalid state out of the store entirely
- **Controlled filtering** — `getFilteredTasks` is a store selector that composes search and priority filters, keeping derived state in one place

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/md-sazzadul/kanban-app.git
cd kanban-app
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and log in with the demo credentials above.

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Type-check and build for production
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

---

## Implementation Highlights

### Drag & Drop

Tasks support drag-and-drop reordering within a column and movement between columns. The `DndContext` wraps the board, and each column is both a `Droppable` zone and a `SortableContext`. The `handleDragEnd` handler cleanly separates the "move to column" and "reorder within list" operations.

### State Persistence

Board UI state (active board, priority filter) is persisted to `localStorage` via Zustand's `persist` middleware. Tasks and boards are always re-fetched from the API on load, while only lightweight UI preferences are stored locally.

### Search with Highlighting

The search bar filters tasks in real time across all columns simultaneously. Matching substrings are wrapped in a `<mark>` element with a highlight style — implemented as a pure function that splits on the query regex and maps to React nodes.

### Protected Routing

`ProtectedRoute` reads auth state from Zustand and redirects unauthenticated users to `/login`. No session data is exposed to unprotected routes.

### Theme System

A `ThemeContext` + `ThemeProvider` pattern applies the `dark` class to `<html>`, enabling Tailwind's dark mode variant globally. The preference is persisted and initialized from `localStorage`, with a fallback to `prefers-color-scheme`.

---

## Data Layer

The app currently uses static JSON files served from `/public/mock/` as a stand-in for a REST API. The service layer (`src/services/`) is structured identically to how it would work against a real backend — swapping the base URL is the only change needed to connect to a live API.

---

## Author

Built by [Md Sazzadul Islam] · [md.sazzadul.islam15@gmail.com] · [LinkedIn](https://www.linkedin.com/in/md-sazzadul-islam15/) · [Portfolio](https://yourportfolio.com)
