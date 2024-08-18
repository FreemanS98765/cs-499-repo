[Home](https://freemans98765.github.io/cs-499-repo/) | [Database Narrative](https://github.com/FreemanS98765/cs-499-repo/tree/master/docs/Freeman%20Sands%20CS%20499%20Databases%20Narrative.docx)

---

# Databases Enhancements

This document outlines the enhancements made in the area of databases during the migration of the Inventory Management System from an Android application to a MEAN stack web application.

## Database Narrative
You can read the Database narrative [here](https://github.com/FreemanS98765/cs-499-repo/tree/master/docs/Freeman%20Sands%20CS%20499%20Databases%20Narrative.docx)

---

## 1. Migration to MongoDB

- **Migration from SQLite to MongoDB**: Transitioned the database from a relational model (SQLite) to a NoSQL document-based model (MongoDB).
  - Designed new MongoDB schemas for `Users`, `InventoryItems`, and `Notifications` collections.
  - Leveraged MongoDB's flexibility to handle unstructured and semi-structured data.

## 2. Database Connection Setup

- **Robust Connection Management**: Implemented a robust connection management system in the `db.js` file to handle MongoDB connections.
  - Set up event listeners for various connection states (connected, error, disconnected).
  - Implemented a graceful shutdown process to ensure data integrity during application termination.

## 3. Data Validation and Indexing

- **Schema Validation and Indexing**: Enhanced data integrity and query performance by implementing schema validation and indexing in MongoDB.
  - Defined data types and validation rules in Mongoose schemas.
  - Created indexes on fields frequently queried, such as `email` in the `Users` collection.

## 4. Integration with Backend Services

- **Seamless Integration with Node.js**: Integrated MongoDB with Node.js backend services for efficient data handling.
  - Used Mongoose ODM to manage data models and interactions with MongoDB.
  - Developed RESTful APIs to interface with the database, ensuring data consistency and reliability.

## 5. Scalable Data Architecture

- **Design for Scalability**: Structured the database and application architecture to support future scalability.
  - Allowed for horizontal scaling by leveraging MongoDB’s distributed database capabilities.
  - Ensured that the database design can easily accommodate additional features and data growth.

## Conclusion

The migration to MongoDB and the subsequent enhancements to the database setup significantly improved the application's scalability, performance, and data management capabilities.
