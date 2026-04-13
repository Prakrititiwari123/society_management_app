# Society Management App

A full-stack application for managing day-to-day society operations, including resident access, facilities, payments, maintenance, and community engagement.

## Project Structure

- client: React + Vite frontend
- server: Express + MongoDB backend API

## Core Modules

- Authentication and resident profile
- Dashboard overview
- Facilities and bookings
- Payments and transaction history
- Maintenance requests
- Community events and discussions
- Contact messages

## Tech Stack

Frontend:
- React 19
- Vite 7
- React Router
- Axios
- Tailwind CSS

Backend:
- Node.js
- Express 5
- MongoDB + Mongoose
- JWT + bcryptjs

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB connection string

## Quick Start

1. Install server dependencies:

cd server
npm install

2. Create server environment file server/.env:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret

3. Start backend:

npm run dev

4. In a new terminal, install client dependencies:

cd client
npm install

5. Create client environment file client/.env:

VITE_API_URL=http://localhost:5000/api

6. Start frontend:

npm run dev

7. Open the app in your browser (Vite dev URL).

## Development Notes

- Client auth data is stored under societyAuth in localStorage or sessionStorage.
- Protected frontend routes require a valid JWT returned by backend login/register.
- If client VITE_API_URL is not set, frontend defaults to http://localhost:4500/api.
- If server MONGO_URI is not set, backend starts without database connection.

## API Base URL

- Local: http://localhost:5000/api

## Scripts

Client (in client):
- npm run dev
- npm run build
- npm run preview
- npm run lint

Server (in server):
- npm run dev

## Recommended Next Improvements

- Add automated tests for client and server
- Add role-based authorization (admin/resident)
- Add API docs (OpenAPI/Swagger)
- Add production deployment configs
