# Healthcare SaaS Dashboard
A modern, responsive B2B healthcare dashboard built using React, TypeScript, and Zustand. This project
demonstrates scalable frontend architecture, real-world UI/UX patterns, and performance optimizations.

## Live Demo & Credentials
Demo Link: [[healthcare-app](https://healthcare-app-pi-livid.vercel.app/)]

Email: test@test.com

Password: 123456

## Key Features
### Secure Authentication
Integrated Firebase Auth with protected route guards.

Persistent login sessions and secure logout flows.

### Patient Management (CRUD)
Full Create, Read, Update, and Delete capabilities.

Advanced search & filtering with debounced inputs.

Toggleable Grid and List views with pagination.

### Medical Analytics
Interactive data visualization using Recharts.

Distribution analysis for patient demographics and disease prevalence.

### Modern UI/UX
Dark/Light Mode support with system preference detection.

Fully responsive layout (Mobile-first approach).

Browser notifications via Service Workers.

### Tech Stack
Core: React 18 (Vite), TypeScript

State Management: Zustand (with Middleware Persistence)

Styling: Tailwind CSS

Charts: Recharts

Backend/Auth: Firebase

Icons: Lucide React 

## Architecture & Decisions
Feature-Based Folder Structure
The project follows a modular architecture to ensure scalability as the application grows:
```
src/
├── components/ # Shared UI atoms (Buttons, Inputs, Modals)
├── layouts/    # Wrapper components (Sidebar, Navbar)
├── modules/    # Feature-specific logic (Patients, Analytics, Auth)
├── store/      # Zustand store slices
├── hooks/      # Reusable custom hooks (useDebounce, useTheme)
└── services/   # Firebase config and API logic
``` 

## Performance Optimizations
Route-based Code Splitting: Using React.lazy to reduce initial bundle size.

Memoization: Strategic use of useMemo and useCallback for expensive chart calculations.

State Efficiency: Zustand used over Redux for lower boilerplate and faster execution.

# Getting Started
Prerequisites
* Node.js (v18+)

* npm or yarn

Installation
1. Clone the repository
```
git clone https://github.com/Mridul9A/healthcare-app.git
cd healthcare-app
```
2. Install dependencies
```
npm install
```
3. Environment Setup
Create a .env file in the root directory and add your Firebase credentials:
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Run Development Server
``` 
npm run dev
```

# Author
Mridul

LinkedIn: [[Mridul](https://www.linkedin.com/in/mridul09/) ]