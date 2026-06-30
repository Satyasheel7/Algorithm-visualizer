# AlgoForge - Interactive Algorithm Visualizer

> Interactive web platform for visualizing algorithms and data structures through step-by-step animations.

🔗 **Live Demo**: replace with your deployed Vercel URL

## Quick Start

```bash
# Terminal 1 - Backend
cd backend && npm install && npm run dev

# Terminal 2 - Frontend
cd frontend && npm install && npm run dev

# Open http://localhost:5173
```

## Features

| Category | Algorithms |
|----------|------------|
| **Data Structures** | Array, Stack, Queue, Linked List |
| **Sorting** | Bubble, Selection, Insertion, Merge, Quick Sort |
| **Searching** | Linear Search, Binary Search |

### Interactive Controls
▶️ Play/Pause • ⏮️⏭️ Step through • 🎚️ Speed (0.5x-4x) • 🔄 Reset

## Tech Stack

- **Frontend**: React 19, TypeScript, Redux Toolkit, Framer Motion, TailwindCSS, Vite
- **Backend**: Node.js, Express, TypeScript, Socket.io

## Project Structure

```
Algo_visualizer/
├── backend/src/          # API & algorithm implementations
│   ├── algorithms/       # Algorithm logic
│   ├── controllers/      # Route handlers
│   └── routes/           # API endpoints
└── frontend/src/         # React application
    ├── components/       # UI & Visualizers
    ├── store/            # Redux state
    └── pages/            # Page components
```

## Use Cases

- 📚 Learning DSA concepts
- 🎯 Interview preparation
- 🏫 Classroom demonstrations
- 🔬 Algorithm comparison

## Deploying As Your Solo Project

Use your own accounts and secrets for every deployment. Do not reuse the previous owner’s environment values.

1. Create a new MongoDB Atlas cluster or database user for your profile.
1. Create a new Google OAuth client in Google Cloud Console and add your frontend URLs to the authorized origins and redirect list.
1. Create a new Gemini API key for your own Google account.
1. Deploy the backend to Render as a Web Service from the `backend` folder.
1. Deploy the frontend to Vercel as a static Vite app from the `frontend` folder.
1. Point the frontend `VITE_API_URL` to the Render backend URL and set the backend `FRONTEND_URL` to the Vercel domain.

### Render backend settings

- Build command: `npm install && npm run build`
- Start command: `npm run start`
- Root directory: `backend`
- Environment variables: `MONGODB_URI`, `JWT_SECRET`, `REFRESH_TOKEN_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GEMINI_API_KEY`, `FRONTEND_URL`, `NODE_ENV=production`, `PORT=5000`

### Vercel frontend settings

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: `VITE_API_URL`, `VITE_GOOGLE_CLIENT_ID`

### Resume-safe polish checklist

- Replace the app title, hero copy, and favicon with your own branding.
- Update the README live link and screenshots to the new deployment.
- Remove any old demo URLs that point to the previous team deployment.
- Verify Google OAuth and Gemini still work after switching to the new environment variables.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit and push changes
4. Create a Pull Request

## License

MIT License

---

**Built for algorithm learners everywhere**
