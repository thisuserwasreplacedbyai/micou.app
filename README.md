# micou - habit tracker app

**live site:** https://micou.app

a simple habit tracker i built to help fight imposter syndrome by showing concrete proof of work accomplished. tracks focused work sessions and displays stats to show you're actually making progress.

## what it does

micou lets you track work sessions across 5 activity types (work, study, read, code, write). you can:

- start/pause/resume a timer
- add notes to sessions
- view your streak and stats
- see weekly and all-time breakdowns
- edit or delete past sessions

the timer keeps running even if you switch pages, and there's a pop-up at the end of each session to adjust details before saving.

## why i built this

named after the golden lion tamarin (mico-leão-dourado) and "Make It COUnt" an endangered species. the idea is that small consistent actions add up over time if this passion project ever gets profitable I'll donate the money to conservation efforts in Brasil.

## tech stack

**frontend:**
- react (with vite)
- react router for navigation
- context api for auth and timer state
- custom css

**backend:**
- node.js + express
- mongodb with mongoose
- JWT authentication (httpOnly cookies)
- bcrypt for passwords

**deployed on:**
- netlify (frontend)
- render (backend)
- mongodb atlas (database)

## running it locally

### backend
```bash
cd server
npm install

# create .env with:
# MONGODB_URI=your_connection_string
# JWT_SECRET=some_random_string
# NODE_ENV=development

npm run dev
```

runs on http://localhost:5000

### frontend
```bash
cd client
npm install

# create .env with:
# VITE_API_URL=http://localhost:5000

npm run dev
```

runs on http://localhost:5173

## how it works

**authentication:**
- signup/login with email + password
- JWT tokens stored in httpOnly cookies
- protected routes redirect to login if not authenticated

**timer:**
- uses context api so state persists across pages
- pause/resume functionality
- notes field during session
- post-session modal for editing activity/notes

**stats:**
- calculates streak (consecutive days with sessions)
- breaks down time by activity type
- shows weekly vs all-time totals

## file structure

server/
  ├── models/          # user and session schemas
  ├── routes/          # auth, sessions, stats endpoints
  ├── middleware/      # JWT verification
  └── config/          # mongodb connection

client/
  ├── src/
  │   ├── components/  # navbar, modals
  │   ├── pages/       # landing, timer, profile, etc
  │   ├── contexts/    # auth and timer contexts
  │   └── services/    # api calls
  └── public/          # favicon, assets


## features i implemented

- timer with pause/resume
- timer persists when navigating between pages
- custom styled modals (no ugly browser alerts)
- streak calculation
- session CRUD operations
- stats breakdowns (week/all-time)
- custom domain setup
- responsive design (mostly desktop focused for now)

## things i learned

- setting up CORS for cross-domain cookies was tricky
- JWT with httpOnly cookies for security
- react context for global state management
- deploying full-stack apps with custom domains
- DNS configuration and SSL certificates

## Why micou?

Because sometimes you need proof that you're actually making progress. micou gives you that proof.

Small, consistent sessions add up. Every minute counts.

**make it count, one day at a time** 🦁