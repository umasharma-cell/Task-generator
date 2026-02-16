# Tasks Generator

A mini planning tool that helps you break down feature ideas into user stories and engineering tasks.

## Features

- Describe your feature idea with goal, target users, constraints, and project type
- Generate structured user stories and engineering tasks
- Edit tasks inline and reorder them within categories
- Group tasks by Frontend, Backend, and Infrastructure
- Export results as Markdown (copy or download)
- Keeps your last 5 generated specs in history

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Storage:** LocalStorage for history

## Setup

1. Clone the repo
2. Install dependencies:
   ```bash
   npm run install:all
   ```
3. Start development servers:
   ```bash
   # Terminal 1 - Backend
   npm run dev:server

   # Terminal 2 - Frontend
   npm run dev:client
   ```
4. Open http://localhost:5173

## Production Build

```bash
npm run build
NODE_ENV=production npm start
```

The server will serve the frontend at http://localhost:3001

## Deploy

This project is configured for Render. Connect your repo and it will use `render.yaml` for setup.

## Live Demo

https://task-generator-peach-ten.vercel.app/
