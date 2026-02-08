Invoice Management System — Frontend

It is built using React (Vite) and Tailwind CSS. It provides login, dashboard, and invoice management UI connected to the backend APIs.

## Folder Structure

frontend/IMS
│
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── CreateInvoice.jsx
│   │   └── EditInvoice.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
└── vite.config.js

## 1. Clone and Run the Project
open terminal and run following commands:
    git clone https://github.com/gaganbedi771/Invoice-Management-System.git
    cd Frontend/IMS
    npm install
    npm run dev


Frontend will start on: http://localhost:5173

Make sure backend is running on:
    http://localhost:3001

## 2. Features Implemented

* User login
* Dashboard with summary
* View all invoices
* Create invoice
* Edit invoice
* Delete invoice
* Search invoices
* Filter by status
* Protected routes using JWT

## 3. Available Pages

/           → Login page
/dashboard  → Dashboard page
/create     → Create Invoice page
/edit/:id   → Edit Invoice page


