Invoice Management System — Backend
It provides authentication, dashboard, and full CRUD APIs for managing invoices. Built using Node.js, Express, Prisma, MySQL, Bcrypt, and Json Web Token.

## 1. Clone and Run the Project
open terminal and run following commands:
    git clone https://github.com/gaganbedi771/Invoice-Management-System.git
    cd Backend
    npm install
    npx prisma generate

create "env" file as Backend/.env and put following variables (change username and password to system specific)
    PORT=<port number>
    DATABASE_URL=<mysql://username:password@localhost:3306/invoice_db>
    JWT_SECRET=<some secret key>
Run following command:
    npm start

A default admin user is already created:
Email:admin@gmail.com
Password:admin

Use this to login and access the system.

## 2. Authentication APIs

#Signup:Creates a new user.

POST: /auth/signup

Request:
{
  "email": "admin@gmail.com",
  "password": "admin"
}

Response:
{
  "success": true,
  "data": {
    "id": 2,
    "email": "user@gmail.com"
  }
}

#Signin: Logs in user and returns token.

POST: /auth/signin

Request:
{
  "email": "admin@gmail.com",
  "password": "admin"
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "admin@gmail.com"
    },
    "token": "token"
  }
}

Use this token in headers for protected routes:

authorization: jwt_token

## 3. Dashboard API


#GET /dashboard

Request:
    Headers:
    authorization: jwt_token_here

Response:
{
  "success": true,
  "data": {
    "totalInvoices": 5,
    "totalAmount": 2500,
    "invoices": [list of invoices with invoice details]
  }
}


## 4. Invoice APIs

Invoice number is generated at the backend.
All invoice APIs require authentication header.
    Headers:
    authorization: jwt_token_here

#Create Invoice

POST /invoices

Request:
{
  "customerName": "Gagan",
  "amount": 500,
  "date": "2026-12-26",
  "status": "PAID"
}

Response:
{
  "success": true,
  "data": {
    "invoiceNumber": "INV_1",
    "customerName": "Gagan",
    "amount": 500,
    "date": "2026-12-26T00:00:00.000Z",
    "status": "PAID",
    "createdAt": "2026-02-07T13:20:31.317Z"
  }
}

#Get All Invoices

Return all invoices if no query param i.e status,invoiceNumber,customerName is given.

#GET
Requests:
/invoices
/invoices?search=gagan
/invoices?search=INV_1
/invoices?status=PAID
/invoices?search=gagan&status=PAID

Response:
{
  "success": true,
  "data": [list of invoices]
}


#Get Single Invoice

GET /invoices/INV_1

Response:
{
  "success": true,
  "data": {
    "invoiceNumber": "INV_1",
    "customerName": "Gagan",
    "amount": 500,
    "date": "2026-02-06T00:00:00.000Z",
    "status": "UNPAID",
    "createdAt": "2026-02-07T12:43:48.809Z"
  }
}

#Update Invoice

PUT /invoices/INV_1

Request:
{
  "customerName": "Gagan Updated",
  "amount": 700,
  "date": "2026-12-26",
  "status": "UNPAID"
}

Response:

{
  "success": true,
  "data": {updated invoice data}
}


#Delete Invoice

DELETE /invoices/INV_1
Response:

{
  "success": true,
}

