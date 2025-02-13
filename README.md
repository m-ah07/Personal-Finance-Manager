# Personal Finance Manager

A comprehensive full-stack application that helps users track income, expenses, and financial goals. Built with a modern tech stack featuring a **Node.js/Express** backend, **MongoDB** database, **React** frontend, and **JWT** authentication for secured access. The application also supports **Docker** and `docker-compose` for easy containerized deployment.

---

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Project Structure](#project-structure)  
4. [Installation](#installation)  
5. [Usage](#usage)  
6. [Docker Deployment](#docker-deployment-optional)  
7. [License](#license)


## Features

- **User Authentication**  
  Register and log in with JWT-based authentication, providing secure access to personal finance data.

- **Transaction Management**  
  Record income or expense transactions, including amount, category, date, and a brief description.

- **Category Management**  
  Create custom categories (e.g., Rent, Groceries, Utilities, etc.) for better expense tracking.

- **User Profile**  
  View basic account information and manage personal details.

- **Responsive UI**  
  Built with React and Bootstrap for a seamless experience on both desktop and mobile devices.

- **Protected Endpoints**  
  Express routes secured with JWT tokens to ensure each user can only access their own data.

- **Docker Support** (Optional)  
  Easily run the application (frontend, backend, MongoDB) in separate containers using `docker-compose`.


## Tech Stack

- **Backend**  
  - [Node.js](https://nodejs.org/en/) + [Express.js](https://expressjs.com/)  
  - [MongoDB](https://www.mongodb.com/) (with [Mongoose](https://mongoosejs.com/))  
  - [JWT (jsonwebtoken)](https://www.npmjs.com/package/jsonwebtoken) for authentication  
  - [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing

- **Frontend**  
  - [React](https://reactjs.org/) + [React Router](https://reactrouter.com/)  
  - [Bootstrap](https://getbootstrap.com/) for responsive design  
  - [Axios](https://axios-http.com/) for API requests

- **Deployment**  
  - Optional [Docker](https://www.docker.com/) & [docker-compose](https://docs.docker.com/compose/)  
  - Can also be deployed on cloud providers (e.g., Heroku, Railway, AWS, etc.)


## Project Structure

```plaintext
Personal-Finance-Manager/
├── backend/
│   ├── src/
│   │   ├── app.js                       # Main Express server setup & MongoDB connection
│   │   ├── routes/
│   │   │   ├── users.js                 # Routes for user signup/login & profile
│   │   │   ├── transactions.js          # Routes for CRUD operations on transactions
│   │   │   └── categories.js            # Routes for CRUD operations on categories
│   │   ├── controllers/
│   │   │   ├── userController.js        # Business logic for user operations
│   │   │   ├── transactionController.js # Business logic for transaction operations
│   │   │   └── categoryController.js    # Business logic for category operations
│   │   ├── models/
│   │   │   ├── User.js                  # Mongoose model for User (name, email, password)
│   │   │   ├── Transaction.js           # Mongoose model for Transaction (type, amount, date, etc.)
│   │   │   └── Category.js              # Mongoose model for Category (name, user reference)
│   │   └── middleware/
│   │       └── auth.js                  # JWT auth middleware to protect routes
│   ├── package.json                     # Backend dependencies & npm scripts
│   └── Dockerfile (optional)            # Docker configuration for the backend
├── frontend/
│   ├── public/
│   │   └── index.html                   # Main HTML for the React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx            # Overview & quick access to transactions
│   │   │   ├── TransactionList.jsx      # Display list of user transactions
│   │   │   ├── TransactionForm.jsx      # Form to create or edit a transaction
│   │   │   ├── AuthForm.jsx             # Signup/Login form for user authentication
│   │   │   └── Profile.jsx              # Display and manage user profile info
│   │   ├── services/
│   │   │   └── api.js                   # Axios instance setup & request interceptors
│   │   ├── App.js                       # Main React component with routes
│   │   └── index.js                     # React DOM entry point
│   ├── package.json                     # Frontend dependencies & npm scripts
│   └── Dockerfile (optional)            # Docker configuration for the frontend
├── docker-compose.yml (optional)        # Multi-container setup for backend, frontend, and DB
├── LICENSE                              # License file (MIT or other)
└── README.md                            # Project documentation

```


## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/m-ah07/Personal-Finance-Manager.git
```

### 2. Install Backend Dependencies
```bash
cd Personal-Finance-Manager/backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 4. Configure Environment Variables
- Create a `.env` file in the `backend` folder (or use another configuration method) with variables like:
  ```plaintext
  DB_URI=mongodb://localhost:27017/personal_finance
  JWT_SECRET=your_jwt_secret
  PORT=5000
  ```
- Adjust these to match your local setup (e.g., different MongoDB URI, secret, port, etc.).


## Usage

### 1. Start the Backend
From the `backend` directory:
```bash
npm run dev
```
- By default, runs on `http://localhost:5000`

### 2. Start the Frontend
Open a new terminal in the `frontend` directory:
```bash
npm start
```
- By default, runs on `http://localhost:3000`

### 3. Access the Application
Open your browser at `http://localhost:3000`. You can sign up for a new account or log in if you already have one.


## Docker Deployment (Optional)

If you want to run everything via Docker containers, you can use the included `docker-compose.yml`.

1. **Build and run**:
   ```bash
   docker-compose up --build
   ```
2. **Services**:
   - **Backend**: Exposed on `http://localhost:5000`
   - **Frontend**: Exposed on `http://localhost:3000`
   - **MongoDB**: Running in the `mongo` container on port `27017`


## License

This project is licensed under the [MIT License](LICENSE).  
Feel free to modify, distribute, and use it as needed.

---

**Happy budgeting and financial tracking!** For any issues or contributions, please open an issue or create a pull request on GitHub.
