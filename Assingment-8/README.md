# Assignment 8 - Building Secure RESTful APIs with Node.js, Express, and MongoDB

## Objective
This project implements secure RESTful APIs using **Node.js**, **Express**, and **MongoDB** to manage user information and handle image uploads. It includes CRUD operations for users, secure password hashing with **bcrypt**, image upload validation, Swagger documentation, and Postman testing.

## Assignment Goals
- Implement user-related API endpoints using Node.js, Express, and MongoDB
- Securely store passwords using bcrypt hashing
- Enable image uploading with validation for JPEG, PNG, and GIF formats
- Allow only one image upload per user
- Implement user authentication-related validation using email and password rules
- Test all endpoints using Postman
- Document all endpoints using Swagger / OpenAPI

---

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- multer
- Swagger UI Express
- YAMLJS
- Postman

---

## Project Structure
```bash
Assingment-8/
├── config/
│   └── db.js
├── controllers/
│   └── userController.js
├── images/
├── middleware/
│   └── uploadMiddleware.js
├── models/
│   └── User.js
├── routes/
│   └── userRoutes.js
├── swagger/
│   └── swagger.yaml
├── .env.example
├── .gitignore
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── Assignment8_Postman_Collection.json