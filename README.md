# คิดดูก่อน (Kiddugorn)

A scheduling and voting web application for groups - no login required. Perfect for planning events, meetings, or activities with friends and colleagues.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI**: React 19, Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: SWR
- **Forms**: React Hook Form + Zod validation
- **Components**: Radix UI primitives

## Features

- **Create Events** - Set up polls with multiple date options
- **Voting** - Vote Yes / Maybe / No for each date
- **Share Links** - Share voting pages with friends via URL
- **Visual Summary** - See vote counts with progress bars
- **Admin Dashboard** - Organize events, lock/unlock voting
- **Fix Final Date** - Select winning date option
- **Mobile-First** - Responsive design for all devices
- **Thai Language** - Full Thai language support

## Project Structure

```
kiddugorn-frontend/
├── app/                    # Next.js App Router pages
│   ├── (admin)/           # Admin dashboard routes
│   │   └── a/[eventId]/   # Event management
│   ├── (auth)/            # Authentication routes
│   │   ├── login/
│   │   └── register/
│   ├── (public)/          # Public routes
│   │   ├── create/        # Create new event
│   │   ├── v/[eventId]/   # Vote on event
│   │   ├── checkout/      # Payment pages
│   │   └── pricing/       # Pricing page
│   └── layout.tsx         # Root layout
├── components/             # React components
│   ├── ui/                # Base UI components
│   ├── voting/            # Voting components
│   ├── create/            # Event creation
│   └── shared/            # Shared components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities & API client
│   ├── api/               # API client
│   ├── auth/              # Authentication
│   └── swr/               # SWR hooks
└── types/                 # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+
- API backend (see [kiddugorn-backend](https://github.com/kiddugorn/backend))

### Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your API URL
```

### Development

```bash
# Run development server
npm run dev
```

The app will be available at http://localhost:3000

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | http://localhost:3001/api |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Integration

This frontend connects to a REST API. Make sure the backend is running and accessible via `NEXT_PUBLIC_API_URL`.

## License

MIT
