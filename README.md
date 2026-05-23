# MCWordle

A Wordle-style game built with React, TypeScript, and Material UI.

## Tech Stack

- **[Vite](https://vite.dev/)** — build tool and dev server with HMR
- **[React 19](https://react.dev/)** — UI library
- **[TypeScript](https://www.typescriptlang.org/)** — static typing
- **[Material UI](https://mui.com/)** — component library
- **[Biome](https://biomejs.dev/)** — linter and formatter (replaces ESLint + Prettier)
- **[Vitest](https://vitest.dev/)** — unit and component testing
- **[Testing Library](https://testing-library.com/)** — React component test utilities

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run Biome linter |
| `npm run format` | Auto-format all files with Biome |
| `npm test` | Run test suite once |
| `npm run test:watch` | Run tests in watch mode |

## How to Play

1. Type a 5-letter word into the input and press the search button.
2. Each tile shows feedback on your guess:
   - **Green** — correct letter, correct position
   - **Yellow** — correct letter, wrong position
   - **Gray** — letter not in the word
3. You have 6 attempts to guess the word.

## Project Structure

```
src/
  components/    # React components (RowGenerator)
  lib/           # Utility functions and constants
  types/         # Shared TypeScript types
  test/          # Test setup
  App.tsx        # Root component with game logic
  main.tsx       # Entry point
```
