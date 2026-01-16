MOPTrO – EV Fleet Dashboard

MOPTrO is a modern full-stack dashboard application designed to monitor and manage electric vehicle (EV) data.
The project emphasizes clean UI design, smooth user experience, secure routing, and scalable frontend architecture.

It demonstrates real-world frontend development practices using React, TypeScript, and modern UI tooling.

Overview

The application provides authenticated users with access to an interactive dashboard displaying vehicle statistics, projects, teams, tables, and user settings. Public authentication routes are blocked once a user is logged in, ensuring a secure and predictable navigation flow.

Features

Authentication with protected and public routes

Role-aware navigation for authenticated users

Interactive dashboard cards and data visualization

Structured data tables

User profile and account management

Platform settings with persistent state

Modular and reusable UI components

Smooth page transitions and micro-interactions

Responsive and scalable layout

Technology Stack
Frontend

React 18

TypeScript

Vite

Tailwind CSS

React Router v6

Framer Motion

TanStack React Table

Lucide Icons

Backend (Support Layer)

Node.js

Express.js

MongoDB

JWT-based authentication

The backend is API-driven and structured to support scalable frontend development.

Frontend Libraries and Tools
Purpose	Library
Routing	React Router
Animations	Framer Motion
Data Tables	TanStack React Table
Icons	Lucide React
Styling	Tailwind CSS
Build Tool	Vite
State Management	React Hooks
API Communication	Custom Fetch Wrapper
Key Frontend Concepts Implemented

Protected and public routing patterns

Authentication-based conditional rendering

Component-driven architecture

Reusable UI components and layout primitives

Optimistic UI updates

Loading and error state handling

Smooth transitions and animations

Performance-aware rendering

Type-safe API integration

Project Structure (Frontend)
src/
│
├── components/
│   ├── auth/           # Route guards
│   ├── dashboard/      # Dashboard UI components
│   ├── layout/         # Navbar and footer
│   └── ui/             # Reusable UI elements
│
├── pages/
│   ├── dashboard/      # Dashboard sub-pages
│   ├── SignIn.tsx
│   ├── SignUp.tsx
│   ├── ProfilePage.tsx
│   └── TablesPage.tsx
│
├── router/
│   └── AppRouter.tsx
│
├── utils/
│   ├── apiClient.ts
│   ├── auth.ts
│   └── useAuth.ts
│
└── main.tsx

Authentication Flow

JWT-based authentication

Secure token handling in browser storage

Public routes blocked when authenticated

Protected routes enforced using route guards

Automatic redirection based on auth state

UI and UX Considerations

Consistent spacing and typography

Glassmorphism-inspired design

Smooth hover effects and transitions

Clear visual hierarchy

Accessible and readable layout

Performance Optimizations

Controlled component re-rendering

Optimized table rendering

Prepared for lazy loading and code splitting

Clean separation of logic and presentation

Environment Variables

Environment variables are managed using .env files.

Frontend environment file: .env

Backend environment file: src/server/.env

Sensitive values are excluded from version control. Example files are provided for reference.

Author

Partha Sen
Frontend / MERN Stack Developer

GitHub: https://github.com/Enigma351

Project Relevance

This project reflects production-level frontend development practices expected from an early-career frontend developer, including secure routing, clean UI composition, maintainable code structure, and performance awareness.
