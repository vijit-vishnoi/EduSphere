# 📚 EduSphere – Classroom & Assignment Management Platform

EduSphere is a full-stack classroom management system that enables teachers and students to manage assignments, submissions, grading, and classroom interactions in a structured and secure way.

The project is designed to resemble a real-world Learning Management System (LMS) with proper authentication, authorization, file handling, and clean role-based workflows.

---

## 🚀 Features

### 👩‍🏫 Teacher Features
* Create and manage classrooms
* Generate unique classroom join codes
* Create assignments with:
    * Title, description, and due date
    * Points configuration
    * Text submission requirement
    * File upload requirement
* View all student submissions for an assignment
* Download submitted files
* Grade submissions with feedback
* Secure grading access (only the assignment’s teacher can grade)
* View grading status per submission

### 👨‍🎓 Student Features
* Join classrooms using classroom codes
* View classroom assignments
* Submit assignments with:
    * Text responses
    * File uploads
* Prevent multiple submissions for the same assignment
* See submission status immediately after submitting
* View grades and teacher feedback once graded

---

## 🧠 Core Concepts Implemented

* Role-based authentication (Student / Teacher)
* JWT-based login and protected routes
* RESTful API design
* File upload handling using Multer
* Database relationships using Sequelize ORM
* Assignment–Submission–User relational integrity
* Real-time communication setup using Socket.IO
* Clean backend architecture:
    * Controllers
    * Services
    * Repositories
* Frontend state-driven UI using React

---

## 🛠️ Tech Stack

### Frontend
* React (TypeScript)
* Vite
* Tailwind CSS
* Framer Motion
* Axios
* Lucide Icons

### Backend
* Node.js
* Express.js
* Sequelize ORM
* MySQL
* JWT Authentication
* Multer (file uploads)
* Socket.IO

---

## 🔐 Authentication & Authorization

* JWT-based authentication system
* Middleware-protected routes
* Strict role checks:
    * Only teachers can create assignments and grade submissions
    * Students can only submit and view their own submissions
* Unauthorized access is blocked at API level

---

## 📁 File Uploads

* Students can upload files as part of assignment submissions
* Files are stored securely on the server
* Teachers can download submitted files directly from the UI
* File URLs are stored and managed through the backend

---

## 🔔 Real-Time Communication

* Socket.IO integrated on backend and frontend
* User-specific socket rooms
* Enables instant event delivery such as submission and grading updates

---

## 🧪 Data Integrity & Safeguards

* One submission per student per assignment
* Assignment existence validation before submission
* Teacher ownership validation before grading
* Proper error handling and API responses
* UI state synced with backend responses

---

## ▶️ Running the Project Locally

### Backend

```bash
cd backend
npm install
npm run dev

---

```
Create a `.env` file:


```env
PORT=5000
DB_NAME=edusphere
DB_USER=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=your_secret

```

Backend runs on http://localhost:5000

### Frontend

```bash
cd frontend
npm install
npm run dev
```
Frontend runs on http://localhost:3000

## 🧑‍💻 Author

**Vijit Vishnoi**

EduSphere was built with a strong focus on:
* Clean architecture
* Real-world LMS workflows
* Secure backend design
* Interview and production readiness
