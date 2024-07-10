# E-Commerce App

This is a full-stack e-commerce application developed using Node.js, Express, TypeScript, and React. The application allows users to browse products, place orders, and make payments using the Paystack payment gateway.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)

## Features

- Product Management
- Order Processing
- Payment Integration with Paystack
- User-friendly Frontend with React

## Technologies Used

- Backend: Node.js, Express, TypeScript, Mongoose
- Frontend: React, TypeScript, Axios, React Router
- Database: MongoDB
- Payment Gateway: Paystack

## Project Structure

### Backend

```sh
backend/
├── src/
│ ├── config/
│ │ ├── connectDB.ts
│ ├── controllers/
│ │ ├── orderController.ts
│ │ └── productController.ts
│ ├── models/
│ │ ├── Order.ts
│ │ └── Product.ts
│ ├── routes/
│ │ ├── orderRoutes.ts
│ │ └── productRoutes.ts
│ ├── app.ts
│ └── server.ts
├── package.json
└── tsconfig.json
```

### Frontend

```sh
frontend/
├── public/
├── src/
│ ├── assets/
│ │ └── Icons/
│ │ │ └── ...
│ ├── components/
│ │ └── AddNewProduct.tsx
│ │ └── Center.tsx
│ │ └── DashboardOrders.tsx
│ │ └── DashboardProducts.tsx
│ │ └── EditProduct.tsx
│ │ └── Header.tsx
│ │ └── HeroSection.tsx
│ │ └── PriceFormat.tsx
│ │ └── ProductBox.tsx
│ │ └── ProductList.tsx
│ ├── features/
│ │ └── slices/
│ │ │ └── ...
│ ├── pages/
│ │ └── Cart.tsx
│ │ └── Dashboard.tsx
│ │ └── Home.tsx
│ ├── services/
│ │ └── api.ts
│ │ └── store.ts
│ ├── utilities/
│ │ └── Types.ts
│ ├── App.tsx
│ ├── index.tsx
│ └── ...
├── package.json
└── tsconfig.json
```

## Setup Instructions

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Backend Setup

1. Navigate to the backend directory:

   ```sh
   cd backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file for environment variables.

## All test api keys

Add the following variables to the `.env` file

```sh
MONGODB_URI=mongodb+srv://test_user:test_user@cluster0.ha88i.mongodb.net/ecommerceapp?retryWrites=true&w=majority&appName=Cluster0
CLOUDINARY_URL=cloudinary://584384793157694:3AoswXM9NH82qR47F3iMWFqiRKc@dlxovrmtr
PAYSTACK_SECRET_KEY=sk_test_69ffb16a5d23d053bd1a63c30dca989b85afa953
CLOUDINARY_SECRET_KEY=3AoswXM9NH82qR47F3iMWFqiRKc
CLOUDINARY_SECRET_API_KEY=584384793157694
```

4. Start the backend server:
   ```sh
   npx ts-node src/server.ts
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```sh
   cd frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the frontend development server:
   ```sh
   npm start
   ```

## Happy Coding! #GuruSys
