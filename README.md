StaffSync HRM — Human Resource Management System

StaffSync HRM is a web-based Human Resource Management application designed to organize employee information and support essential HR operations through a centralized dashboard.

Features

- HR Dashboard: A centralized interface for accessing HR-related information.
- Employee Management: Employee-related data organization.
- Attendance Management: Dedicated attendance-related models and routes.
- Leave Management: Dedicated leave-related models and routes.
- Modular Backend: Organized configuration, models, and routes.

Technology Stack

Backend

- Node.js
- Express.js

Database

- MongoDB
- Mongoose

Frontend

- HTML
- CSS
- JavaScript

Additional Dependencies

- CORS
- dotenv

Project Structure

StaffSync-HRM/
├── config/
├── models/
│   ├── attendance.js
│   ├── Employee.js
│   └── Leave.js
├── routes/
│   ├── attendanceRoutes.js
│   ├── employeeRoutes.js
│   └── leaveRoutes.js
├── .env
├── .gitignore
├── server.js
├── index.html
├── StaffSync HRM Dashboard.html
├── package.json
└── package-lock.json

Getting Started

Prerequisites

- Node.js and npm
- MongoDB database access

Installation

1. Clone the repository:
   
   git clone https://github.com/Akankshash666-rgb/StaffSync-HRM.git

2. Navigate to the backend directory if the project is organized as shown in the repository:
   
   cd StaffSync-HRM/server

3. Install dependencies:
   
   npm install

4. Configure the required environment variables in ".env", including the database connection details expected by the application.

5. Start the backend:
   
   node server.js
   
   Ensure that the server configuration and required environment variables are set correctly before starting the application.

Security

- Keep environment variables and database credentials private.
- Never commit ".env" files containing secrets.
- Validate user input and handle errors appropriately.

Future Enhancements

- Improve dashboard responsiveness and usability.
- Add automated tests.
- Expand validation and error handling.
- Deploy the application for online access.

Author

Developed as a practical web development project focused on Human Resource Management.
