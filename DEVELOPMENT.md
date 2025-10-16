# 🚀 LiteX Development Setup

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment

```bash
# Copy environment template
copy .env.example .env

# Edit .env file with your configuration
```

### 3. Development Mode

```bash
# Start both frontend and backend in development mode
npm run dev
```

This will start:

- 🎨 **Vite Dev Server** on http://localhost:3000 (Frontend)
- ⚡ **LiteX Backend Server** on http://localhost:5555 (API/Backend)

### Individual Commands

```bash
# Start only backend server (with tsx watch)
npm run dev:server

# Start only frontend dev server (with Vite)
npm run dev:vite

# Build frontend only
npm run build:vite

# Build backend only
npm run build:server

# Build everything
npm run build

# Start production server
npm start
```

## Technology Stack

### Frontend

- ⚡ **Vite** - Ultra fast build tool
- 🎯 **Svelte 5** - Modern reactive framework
- 🎨 **TailwindCSS** - Utility-first CSS framework
- 🔗 **Inertia.js** - Modern monolith approach

### Backend

- 🚀 **Ultimate Express** - High performance web framework
- 📝 **TypeScript** - Type safety
- 🔄 **tsx watch** - Fast TypeScript execution with hot reload
- 💾 **SQLite** - Embedded database
- 🔐 **JWT** - Authentication

### Development Tools

- 🔄 **tsx** - TypeScript execution (replaces nodemon)
- ⚡ **Vite HMR** - Hot module replacement
- 🔀 **Concurrently** - Run multiple commands
- 🎯 **Proxy** - API proxy from Vite to backend

## Development Workflow

1. **Frontend changes** → Vite HMR → Instant browser update
2. **Backend changes** → tsx watch → Automatic server restart
3. **API calls** → Vite proxy → Backend server

## Project Structure

```
litex/
├── resources/           # Frontend assets
│   ├── js/             # Svelte components & JS
│   ├── views/          # HTML templates
│   └── css/            # Stylesheets
├── app/                # Backend application
│   ├── controllers/    # Route handlers
│   ├── middlewares/    # Custom middleware
│   └── services/       # Business logic
├── routes/             # API routes
├── public/             # Static assets
└── server.ts           # Main server file
```

## Performance Benefits

### Development Speed

- 🚀 **tsx** is ~10x faster than nodemon + ts-node
- ⚡ **Vite HMR** provides instant frontend updates
- 🔄 **Hot reload** for both frontend and backend

### Production Ready

- 📦 **Optimized builds** with Vite and TypeScript
- 🎯 **Tree shaking** removes unused code
- 💨 **Fast startup** with compiled JavaScript

## Environment Variables

```bash
# Server
PORT=5555              # Backend server port
NODE_ENV=development   # Environment mode

# Frontend
VITE_PORT=3000        # Vite dev server port

# Database
DATABASE_URL=./dev.sqlite3

# Add other variables as needed...
```

## Troubleshooting

### Port Conflicts

If ports are in use, update `.env`:

```bash
PORT=5556              # Change backend port
VITE_PORT=3001        # Change frontend port
```

### Clear Build Cache

```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Clear TypeScript cache
rm -rf build/
```

### Dependencies Issues

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```
