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

# Component Hierarchy

<img width="793" height="603" alt="image" src="https://github.com/user-attachments/assets/f840fea8-3884-477e-9f6f-4340f8f69fc0" />



# Data Management Architecture

<img width="708" height="390" alt="image" src="https://github.com/user-attachments/assets/f6ef4444-384b-415c-bd8e-73424936a69e" />



# Data Flow Architecture

Authentication Flow

<img width="731" height="368" alt="image" src="https://github.com/user-attachments/assets/5678f6a6-130e-4773-947e-70757e8af973" />


Student Submission Flow

<img width="756" height="581" alt="image" src="https://github.com/user-attachments/assets/fee5241c-d0b5-4d5e-beaa-bbb0a7eee3fd" />



Admin Assignment Creation Flow

<img width="759" height="745" alt="image" src="https://github.com/user-attachments/assets/2b49afd8-83c7-4568-9ab3-48d3f216f2ab" />


## Security & Access Control

<img width="641" height="413" alt="image" src="https://github.com/user-attachments/assets/959ef7b1-c122-4201-be5b-2643af947e2d" />




