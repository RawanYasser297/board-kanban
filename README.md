# Kanban Board

A minimal Kanban-style board built with React + Vite, Tailwind CSS and Radix UI primitives. Supports creating/editing/deleting boards, columns and tasks, task editing, persistent storage in localStorage, and drag-and-drop powered by @dnd-kit.

## Quick start

1. Install dependencies
   npm install

2. Run dev server
   npm run dev

3. Build for production
   npm run build

(See scripts in [`package.json`](package.json).)

## Live demo

- Live version (Labtobe):[https://board-kanban-sandy.vercel.app/]

## Browser support / Responsiveness

- Intended for laptop/desktop use (Labtobe).
- Not optimized or responsive for mobile devices.

## Project structure (important files)

- App entry
  - [`App`](src/App.jsx) — main provider & layout
  - [`main`](src/main.jsx) — app bootstrapping
- Layout
  - [`Sidebar`](src/layout/Sidebar.jsx)
  - [`Header`](src/layout/Header.jsx)
  - [`Workspace`](src/layout/Workspace.jsx) — drag & drop logic (@dnd-kit)
- Components
  - [`Column`](src/components/Column.jsx)
  - [`Task`](src/components/Task.jsx)
  - [`CreateNewBoard`](src/components/CreateNewBoard.jsx)
  - [`DialogModel`](src/components/DialogModel.jsx)
  - [`InputField`](src/components/InputField.jsx)
  - [`Buttons`](src/components/Buttons.jsx)
  - [`Dropdown`](src/components/Dropdown.jsx)
- State & data
  - [`DataContext`](src/dataContext.js)
  - [Initial JSON (example)](src/data.json)
- Config & styles
  - [`vite.config.js`](vite.config.js)
  - [`tailwind.config.js`](tailwind.config.js)
  - [`src/index.css`](src/index.css)

## Features

- Create / edit / delete boards (modal UI)
- Add / delete columns and tasks
- Inline task edit
- Persist boards to localStorage
- Drag & drop tasks across and within columns (uses @dnd-kit)
- UI primitives via @radix-ui/themes

## Contributing

- Run the dev server (`npm run dev`) and edit components under `src/`.
- Follow existing component patterns; use `DataContext` for global state.

## License

This project is released under the MIT License.

Full text:

MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
