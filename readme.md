# Project Architecture Document

## Overview
This project is designed with a focus on security, modularity, and maintainability. It leverages **JWT-based authentication**, password **hashing**, and **cookie-based authorization** to protect user data and ensure secure access to protected routes. The project also incorporates structured database schema design, middleware-driven data flow, and utilities to improve readability and maintainability.

---

## Security Design

### Authentication & Authorization
- **JWT (JSON Web Tokens)** are used for user authentication, ensuring stateless, secure verification of user sessions.
- **Password hashing** is implemented to safely store user credentials in the database using secure hashing algorithms.
- **Cookie-based authorization** is preferred over Bearer Tokens to enhance security and prevent token leakage in client-side scripts.

---

## Database Schema

### User Table
Stores basic user information with unique identification:
```javascript
{
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}
```

### Audit Logs Table
Tracks user actions and timestamps for auditing purposes:
```javascript
{
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}
```

---

## Data Flow

- **Middlewares**:  
  - `Error-handling middleware` ensures all exceptions are caught and handled consistently.  
  - `Route protection middleware` secures sensitive endpoints from unauthorized access.

- **Utilities & Types**:  
  - Utility functions and dedicated type files improve modularity and maintainability.  
  - These abstractions reduce code repetition and simplify debugging.

- **Database Access**:  
  - **Sequelize ORM** is used for database migrations and query management.  
  - A **dedicated slow SQL query** is implemented for filtering and retrieving audit logs efficiently.

---

## Data Flow Diagram

```text
+-------------+          +------------------+          +----------------+
|             |          |                  |          |                |
|   Client    |  ---->   |  Route Handler   |  ---->   |  Middleware    |
| (Browser)   |          |                  |          | (Auth / Error) |
+-------------+          +------------------+          +--------+-------+
                                                                 |
                                                                 v
                                                      +----------------+
                                                      |                |
                                                      |  Controllers   |
                                                      |                |
                                                      +--------+-------+
                                                               |
                                                               v
                                                      +----------------+
                                                      |                |
                                                      |  Services /    |
                                                      |  Utilities     |
                                                      +--------+-------+
                                                               |
                                                               v
                                                      +----------------+
                                                      |                |
                                                      | Sequelize ORM  |
                                                      | / DB Access    |
                                                      +--------+-------+
                                                               |
                                                               v
                                                      +----------------+
                                                      |                |
                                                      |  Database      |
                                                      | (Users, Logs)  |
                                                      +----------------+
```

---

## Development Environment

- **Docker**: A Dockerfile is provided to simplify local testing and deployment, ensuring consistent environments across machines.  
- **Sequelize Migrations**: Streamlines schema changes and ensures database integrity.

---

## Summary
This project architecture emphasizes **secure authentication**, **clean data flow**, and **modular code structure**. The use of JWT, hashing, cookie-based authorization, and middleware ensures that security and maintainability are prioritized. The database schema supports both user management and auditing, and the development environment is containerized with Docker for consistency and ease of use.

