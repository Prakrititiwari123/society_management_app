# Server - Society Management App

Backend API for the Society Management App built with Express and MongoDB.

## Tech Stack

- Node.js
- Express 5
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing

## Features

- User registration, login, and profile endpoint
- Dashboard overview endpoint
- Community events and discussions
- Facility amenities and booking APIs
- Maintenance request APIs
- Payment summary, transactions, and payment APIs
- Contact message APIs
- Centralized not-found and error middleware

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB instance (local or cloud)

## Environment Variables

Create a .env file in the server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret

Notes:
- If MONGO_URI is missing, the server still starts but without DB connection.
- JWT_SECRET falls back to dev_secret if not provided. Set a strong secret for non-local environments.

## Install and Run

1. Install dependencies:

npm install

2. Start development server:

npm run dev

The API will run at http://localhost:5000 by default.

## Health Endpoint

GET /
- Returns backend status and timestamp.

## API Route Groups

- /api/auth
  - POST /register
  - POST /login
  - GET /me (protected)

- /api/dashboard
  - GET /overview (protected)

- /api/community
  - GET /highlights
  - GET /events
  - POST /events (protected)
  - GET /discussions
  - POST /discussions

- /api/facilities
  - GET /amenities
  - GET /bookings
  - POST /bookings (protected)

- /api/maintenance
  - GET / (protected)
  - POST / (protected)

- /api/payments
  - GET /summary (protected)
  - GET /transactions (protected)
  - POST /pay (protected)

- /api/contact
  - POST /
  - GET /

## Project Structure

config/
- db.js

controllers/
- Request handlers by module

middlewares/
- authMiddleware.js
- notFoundMiddleware.js
- errorMiddleware.js

models/
- Mongoose models

routes/
- Route definitions by module
