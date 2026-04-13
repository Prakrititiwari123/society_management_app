# Client - Society Management App

Frontend for the Society Management App built with React and Vite.

## Tech Stack

- React 19
- Vite 7
- React Router
- Axios
- Tailwind CSS
- Framer Motion
- React Hot Toast

## Features

- Resident authentication (register/login)
- Protected routes for authenticated pages
- Dashboard overview
- Facilities listing and booking flow
- Payments and transaction views
- Community pages (events/discussions)
- Contact page integration

## App Routes

- /
- /register
- /login
- /dashboard (protected)
- /user-facilities (protected)
- /user-payments (protected)
- /facilities
- /contact
- /community
- /payments (protected)

## Prerequisites

- Node.js 18+
- npm 9+

## Environment Variables

Create a .env file in the client folder:

VITE_API_URL=http://localhost:5000/api

Notes:
- If your backend runs on port 4500, update VITE_API_URL accordingly.
- If VITE_API_URL is not set, the app falls back to http://localhost:4500/api.

## Install and Run

1. Install dependencies:

npm install

2. Start development server:

npm run dev

3. Build for production:

npm run build

4. Preview production build:

npm run preview

5. Lint:

npm run lint

## Folder Structure

src/
- api/            Axios client and auth storage helpers
- components/     Shared UI and protected route wrapper
- pages/          Page-level components
- assets/         Static assets

## Authentication Storage

The client stores auth data under societyAuth:
- localStorage when remember is true
- sessionStorage otherwise

## Backend Requirement

This client expects the backend API from the server folder to be running and reachable at VITE_API_URL.
