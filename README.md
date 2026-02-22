# คิดดูก่อน (Kiddugorn)

A scheduling and voting app for groups - no login required.

## Project Structure

```
kiddugorn/
├── frontend/          # Next.js 15 + React 19 frontend
├── backend/           # Express + Prisma API
├── shared-types/      # Shared TypeScript types
├── doc/              # Documentation (PRD, TECH, Design, IMPLEMENT)
└── package.json      # Root package for monorepo management
```

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- SWR for data fetching
- Zustand for state
- React Hook Form + Zod

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL (Supabase)
- Zod validation

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Setup database
npm run db:migrate

# Start development servers
npm run dev
```

### Development

- Frontend runs on http://localhost:3000
- Backend runs on http://localhost:3001

## Features

- Create events with multiple date options
- Share voting links with friends
- Vote: Yes / Maybe / No
- Visual summary of votes
- Admin dashboard for organizers
- Fix final date
- Lock/Unlock events
- Mobile-first responsive design
- Thai language support

## License

MIT
