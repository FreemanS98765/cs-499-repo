[Home](https://freemans98765.github.io/cs-499-repo/)

---

# Inventory Management MEAN Application

This is a full-stack Inventory Management application built using the MEAN (MongoDB, Express.js, Angular, Node.js) stack.

## Prerequisites

Before you start, ensure you have the following installed on your machine:

- **Node.js and npm**: [Download Node.js](https://nodejs.org/en/download) (it includes npm). This guide is focused on deploying to a Windows 11 platform, but you can accomplish the same tasks with Window 10, MacOS, or Linux. The Node version used for this application is v22.5.1.
- **MongoDB**: [Download MongoDB](https://www.mongodb.com/try/download/community).

## Getting Started

### Clone the Repository

```
git clone https://github.com/FreemanS98765/cs-499-repo.git
cd inventory-management-app
```

## Backend Setup (Express.js and MongoDB)

### Navigate to the project root and install dependencies:
```
cd inventory-management-app
npm install
```

## Frontend Setup (Angular)

### Navigate to the Angular directory and install dependencies
```
cd ../app_public
npm install
```

## Connecting Frontend to Backend

### Update API Endpoints in Angular
Ensure that the Angular application is configured to communicate with the backend API at `http://localhost:3000/api`.

### CORS Configuration
The backend should allow requests from the frontend using the `cors` package in Express:
Found in app.js in project root.
```
const cors = require('cors');
app.use(
  cors({
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200,
  })
);
```

## Running the Application

### Start MongoDB:
```
mongod
```

### Start Backend Server:
```
cd inventory-management-app
npm start
```

### Start Frontend Server:
```
cd ../app_public
npm start
```

### Access the application:
Open your browser and navigate to `http://localhost:4200`. The MEAN stack application should be running, with the frontend served by Angular and the backend handled by Express.js with MongoDB.
