# 📝 BLOG-MERN

A full-stack blogging platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with **JWT Authentication**, **RTK Query API integration**, and a beautiful UI.

## 📌 Features

### 🚀 Frontend (React + Redux Toolkit)
- User authentication (Login / Register)
- Protected routes for authenticated users
- RTK Query-based API calls for efficient state management
- Create, Read, Update, Delete (CRUD) operations for blog posts
- Responsive design with reusable components (Navbar, Footer, Cards)
- Profile page with update functionality

### 🔐 Backend (Node.js + Express + MongoDB)
- RESTful API with authentication using JWT
- Password hashing using bcrypt
- User model and Blog Post model with MongoDB + Mongoose
- Routes: `/api/auth`, `/api/posts`, `/api/users`

---

## 🏗️ Project Structure


---

## 🧪 Technologies Used

### Frontend
- React.js
- Redux Toolkit + RTK Query
- React Router
- CSS Modules / Custom styles

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing

---

## 🔧 Getting Started

### ✅ Prerequisites
- Node.js and npm installed
- MongoDB running locally or MongoDB Atlas account

### ⚙️ Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/BLOG-MERN.git
cd BLOG-MERN


#### 2. Install Backend Dependencies

```bash
cd server
npm install
```

#### 3. Setup `.env` in `server/`

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
PORT=5000
```

#### 4. Start Backend Server

```bash
npm start
```

#### 5. Install Frontend Dependencies

```bash
cd ../client
npm install
```

#### 6. Start Frontend Server

```bash
npm start
```

> Your frontend will be available at `http://localhost:3000`

---

## ✍️ API Routes

### Authentication

* `POST /api/auth/register` – Register a user
* `POST /api/auth/login` – Login and get token
* `GET /api/auth/profile` – Get user profile (protected)
* `PUT /api/auth/profile` – Update user profile (protected)

### Posts

* `GET /api/posts` – Get all posts
* `GET /api/posts/:id` – Get a specific post
* `GET /api/posts/user/:userId` – Posts by a specific user
* `POST /api/posts` – Create new post (protected)
* `PUT /api/posts/:id` – Update a post (protected)
* `DELETE /api/posts/:id` – Delete a post (protected)

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/4e914085-bac1-4132-800b-fc375df15ce4)

![image](https://github.com/user-attachments/assets/6af63b29-1a70-487c-a23b-8a3340096a62)


![image](https://github.com/user-attachments/assets/45539174-7899-4c63-beb0-066b24eeb34d)

