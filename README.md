This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Clone project

```bash

git clone https://github.com/tensorflow4545/joineasy-dashboard.git
cd <project_folder>

```

Install dependencies

```bash
npm install

```

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

Deployment link:https://joineasy-dashboard.vercel.app/


## Architecture:

# Folder Structure:

 assignment-dashboard/
├── app/
│   ├── layout.js
│   ├── page.js
│   └── globals.css
├── components/
│   ├── LoginPage.js
│   ├── StudentDashboard.js
│   ├── AdminDashboard.js
│   └── ConfirmDialog.js
├── lib/
│   ├── storage.js
│   └── mockData.js
├── public/
|- package.json


## High-Level Architecture:
 ┌─────────────────────────────────────────────────────────────┐
│                        CLIENT SIDE                          │
│                      (Next.js 14 App)                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      APP ROUTER (Next.js)                   │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   │
│  │   layout.js  │──▶│   page.js    │──▶│ globals.css  │   │
│  │  (Root Shell)│   │ (Main Entry) │   │  (Tailwind)  │   │
│  └──────────────┘   └──────────────┘   └──────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
│                      (Components)                           │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   │
│  │  LoginPage   │   │   Student    │   │    Admin     │   │
│  │              │──▶│  Dashboard   │   │  Dashboard   │   │
│  │  Component   │   │  Component   │   │  Component   │   │
│  └──────────────┘   └──────────────┘   └──────────────┘   │
│                              │                              │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   │
│  │   Navbar     │   │   Confirm    │   │   Shared     │   │
│  │  Component   │   │   Dialog     │   │    UI        │   │
│  └──────────────┘   └──────────────┘   └──────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     BUSINESS LOGIC LAYER                    │
│                      (Hooks & Utils)                        │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   │
│  │   useAuth    │   │  useStorage  │   │ useSubmission│   │
│  │    Hook      │   │    Hook      │   │     Hook     │   │
│  └──────────────┘   └──────────────┘   └──────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA ACCESS LAYER                      │
│                         (lib/)                              │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   │
│  │  storage.js  │   │ mockData.js  │   │   helpers    │   │
│  │  (CRUD ops)  │   │(Initial Data)│   │  (Utils)     │   │
│  └──────────────┘   └──────────────┘   └──────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA STORAGE                           │
│                    (Browser Storage)                        │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   │
│  │ localStorage │   │ assignments  │   │  submissions │   │
│  │  currentUser │   │     data     │   │     data     │   │
│  └──────────────┘   └──────────────┘   └──────────────┘   │
└─────────────────────────────────────────────────────────────┘

# Component Hierarchy

App (page.js)
│
├─── LoginPage
│    ├─── Input Fields
│    └─── Login Button
│
├─── StudentDashboard
│    ├─── Navbar
│    ├─── Progress Card
│    ├─── Assignment Grid
│    │    └─── Assignment Cards (map)
│    └─── ConfirmDialog (conditional)
│
└─── AdminDashboard
     ├─── Navbar
     ├─── Assignment List
     │    └─── Assignment Detail Cards (map)
     │         ├─── Student Progress Bar
     │         └─── Student Status List
     └─── Add Assignment Modal (conditional)


# Data Management Architecture

lib/
├── storage.js      → localStorage abstraction layer
│   ├── getAssignments()
│   ├── saveAssignments()
│   ├── getSubmissions()
│   ├── saveSubmissions()
│   ├── getStoredUser()
│   ├── saveUser()
│   └── clearUser()
│
└── mockData.js     → Initial data & constants
    ├── INITIAL_ASSIGNMENTS
    └── USERS


# Data Flow Architecture

Authentication Flow

User Input (LoginPage)
    │
    ▼
Validate Credentials (USERS array)
    │
    ├─── Valid
    │    ├─── Save to localStorage
    │    ├─── Update state
    │    └─── Route to Dashboard
    │
    └─── Invalid
         └─── Show error message

Student Submission Flow

1. Click "Submit Assignment"
        │
        ▼
2. Show Confirmation Dialog
        │
        ▼
3. User confirms "Yes, I've Submitted"
        │
        ▼
4. Create submission key: "studentId-assignmentId"
        │
        ▼
5. Update submissions object
        │
        ▼
6. Save to localStorage
        │
        ▼
7. Update UI (show checkmark, update progress)


Admin Assignment Creation Flow

1. Click "Add Assignment"
        │
        ▼
2. Show Modal Form
        │
        ▼
3. Fill form fields (title, description, date, link)
        │
        ▼
4. Click "Create Assignment"
        │
        ▼
5. Validate all fields filled
        │
        ▼
6. Generate unique ID (timestamp)
        │
        ▼
7. Add to assignments array
        │
        ▼
8. Save to localStorage
        │
        ▼
9. Update UI, close modal

## Security & Access Control

Role-Based Access Control (RBAC)
│
├─── Student Role
│    ├─── View own assignments
│    ├─── Submit assignments
│    ├─── View own progress
│    └─── Cannot create/delete assignments
│
└─── Admin Role
     ├─── View all assignments
     ├─── Create new assignments
     ├─── Delete assignments
     ├─── View all student submissions
     └─── Cannot submit assignments



