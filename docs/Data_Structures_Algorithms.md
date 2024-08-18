[README](../README.md) | [Software Design & Engineering](Software_Design_Engineering.md) | [Data Structures & Algorithms](Data_Structures_Algorithms.md) | [Databases](Databases.md)

---

# Data Structures & Algorithms Enhancements

This document outlines the enhancements made in the area of data structures and algorithms during the migration of the Inventory Management System from an Android application to a MEAN stack web application.

## 1. Migration from SQLite to MongoDB

- **Transition from Relational to Document-Based Data Structures**: Migrated the database from SQLite's relational model to MongoDB's document-oriented model.
  - Replaced SQL tables with MongoDB collections, such as `Users`, `InventoryItems`, and `Notifications`.
  - Utilized MongoDB's flexible schema to accommodate varied data types and structures.

## 2. Improved Data Retrieval Algorithms

- **Optimized Query Performance**: Leveraged MongoDB's indexing capabilities to improve the efficiency of data retrieval operations.
  - Created indexes on commonly queried fields, such as `email` in the `Users` collection and `name` in the `InventoryItems` collection.
  - Improved search and filtering capabilities by designing efficient query algorithms.

## 3. Refined Data Manipulation Techniques

- **Enhanced CRUD Operations**: Implemented algorithms for Create, Read, Update, and Delete operations to work with MongoDB.

## 4. Notifications Management Algorithm

- **Efficient Notifications Handling**: Developed algorithms to manage notifications by directly interacting with the Notification model in MongoDB, ensuring they are created, updated, and deleted efficiently.
  - Implemented logic to conditionally trigger notifications based on user preferences stored in the database.
  - Used data structures for storing and retrieving notifications.

## 5. Asynchronous Operations

- **Implementation of Async/Await**: Refactored data handling algorithms to use `async/await` for non-blocking operations.
  - Ensured that database operations are handled asynchronously to improve application performance.
  - Reduced the risk of race conditions and data inconsistencies.

## Conclusion

These enhancements in data structures and algorithms were created with performance, scalability, and efficiency of the application in mind, aligning with modern software development practices.
