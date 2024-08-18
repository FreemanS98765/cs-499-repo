[README](../README.md) | [Software Design & Engineering](Software_Design_Engineering.md) | [Data Structures & Algorithms](Data_Structures_Algorithms.md) | [Databases](Databases.md)

---

# Software Design & Engineering Enhancements

This document outlines the enhancements made in the area of software design and engineering during the migration of the Inventory Management System from an Android application to a MEAN stack web application.

## 1. Separation of Concerns

- **Backend-Frontend Separation**: The application was restructured to separate backend and frontend logic, ensuring a clear division of responsibilities.
  - Created `app_api` for backend API logic.
  - Created `app_server` for server-related configurations and middlewares.
  - Created `app_public` for the Angular frontend.

## 2. MVC Architecture

- **Adoption of MVC Architecture**: The application was restructured to follow the Model-View-Controller (MVC) design pattern.
  - **Models**: Defined the data structure using Mongoose schemas for `User`, `InventoryItem`, and `Notification`.
  - **Controllers**: Developed controllers to handle business logic for user authentication, inventory management, and notifications.
  - **Views**: The Angular frontend serves as the view layer, interacting with the backend through RESTful APIs.

## 3. RESTful API Development

- **Development of RESTful APIs**: Implemented RESTful API endpoints to facilitate CRUD operations on `Users`, `InventoryItems`, and `Notifications`.
  - Created endpoints for registering, logging in, updating, and deleting users.
  - Developed endpoints for adding, retrieving, updating, and deleting inventory items.
  - Implemented notification management endpoints.

## 4. Enhanced User Interface

- **Responsive and Intuitive Frontend**: Rebuilt the user interface using Angular, focusing on a responsive and intuitive design.
  - Integrated Angular Material for a modern UI/UX.
  - Improved user interaction flows and error handling.

## 5. Security Enhancements

- **JWT Authentication**: Implemented JSON Web Token (JWT) authentication to secure API endpoints.
  - Encrypted user passwords using `bcryptjs` before storing them in the database.
  - Set up token-based authentication for secure user sessions.

## 6. Improved Error Handling

- **Comprehensive Error Handling**: Enhanced error handling across the application.
  - Added detailed error messages and logging in the backend.
  - Implemented user-friendly error messages in the frontend.

## Conclusion

These enhancements significantly improved the software design and engineering aspects of the application, making it more modular, secure, and scalable.
