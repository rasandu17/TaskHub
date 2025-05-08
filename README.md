# TaskHub

A full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to create, manage, and track their tasks efficiently.

![TaskHub](https://via.placeholder.com/800x400?text=TaskHub+Screenshot)

## Features

- **User Authentication**: Secure registration and login system
- **Task Management**: Create, read, update, and delete tasks
- **Task Filtering**: Filter tasks by completion status (All, Active, Completed)
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

### Frontend
- React 19
- React Router 7
- Tailwind CSS
- Axios for API requests
- Context API for state management

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for authentication
- bcrypt.js for password hashing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/Task_Hub.git
   cd Task_Hub
   ```

2. Set up the backend
   ```bash
   cd backend
   npm install
   ```
   
3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/taskhub
   JWT_SECRET=yoursecretkey
   ```

4. Set up the frontend
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Log in an existing user

### Tasks
- `GET /api/tasks`: Get all tasks for the authenticated user
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/:id`: Update a task by ID
- `DELETE /api/tasks/:id`: Delete a task by ID

## Project Structure

```
Task_Hub/
├── backend/                # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── .env                # Environment variables
│   ├── package.json        # Backend dependencies
│   └── server.js           # Entry point
│
└── frontend/              # React frontend
    ├── public/             # Public assets
    ├── src/
    │   ├── api/            # API service functions
    │   ├── components/     # React components
    │   ├── context/        # React context providers
    │   ├── App.jsx         # Main App component
    │   └── main.jsx        # Entry point
    ├── .eslintrc.js        # ESLint configuration
    ├── package.json        # Frontend dependencies
    └── vite.config.js      # Vite configuration
```

