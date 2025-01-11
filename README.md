# NotesApp Backend

![JavaScript](https://img.shields.io/badge/JavaScript-100%25-yellow)

## Overview

NotesApp Backend is the server-side application for the NotesApp, built using JavaScript. It provides RESTful APIs for creating, reading, updating, and deleting notes, as well as managing user authentication and authorization.

## Features

- User authentication and authorization
- Create, read, update, and delete notes
- Organize notes with tags and categories
- Search and filter notes
- RESTful API design

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)
- MongoDB (>= 4.x)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/md-anas-sabah/notesapp_backend.git
cd notesapp_backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add the following variables:

```plaintext
PORT=3000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

### Running the Application

To start the development server:

```bash
npm run dev
```

## API Documentation

The NotesApp Backend follows RESTful principles. Below are the key endpoints:

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate a user and return a token

### Notes

- `GET /api/notes` - Get all notes for the authenticated user
- `POST /api/notes` - Create a new note
- `GET /api/notes/:id` - Get a specific note by its ID
- `PUT /api/notes/:id` - Update a note by its ID
- `DELETE /api/notes/:id` - Delete a note by its ID

### Search and Filter

- `GET /api/notes?tag=:tag` - Filter notes by tag
- `GET /api/notes?category=:category` - Filter notes by category
- `GET /api/notes?search=:query` - Search notes by keyword

