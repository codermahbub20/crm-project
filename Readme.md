# 📚 CRM Project

A **Customer Relationship Management (CRM)** system built to efficiently manage clients, projects, and interaction logs.  
Focus areas include **user authentication**, **client management**, **project tracking**, and **interaction reminders**.

---

## 🚀 Tech Stack

### Frontend

- **React.js** (with **Redux Toolkit** + **RTK Query**)
- **TypeScript**

### Backend

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB** (with **Mongoose**)
- **Bcrypt.js** (for password hashing)
- **JWT** (for user authentication)

### Others

- **ESLint** & **Prettier** (for code formatting)
- **Lucidchart** (for ERD design)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/crm-project.git
cd crm-project

/### 2. Install Backend Dependencies
cd backend
npm install
3. Set Up Environment Variables
Create a .env file inside the backend/ directory and add the following:

PORT=5000
DATABASE_URL=mongodb://localhost:27017/crm-db
JWT_SECRET=your_secret_key
BCRYPT_SALT_ROUNDS=10
```

4. Run the Backend Server

npm run dev

5. Install Frontend Dependencies

cd ../frontend
npm install

6. Run the Frontend Server

npm run dev

# Entity Relationship Diagram (ERD)

User

- id (PK)
- name
- email (unique)
- password (hashed)
- role (admin/user)
- isBlocked

Client

- id (PK)
- name
- email
- phone
- company
- notes
- userEmail (FK → User.email)

Project

- id (PK)
- title
- budget
- deadline
- status (Ongoing/Completed/Pending)
- clientId (FK → Client.id)

InteractionLog

- id (PK)
- date
- interactionType (Call/Meeting/Email)
- notes
- clientId (FK → Client.id)
- projectId (FK → Project.id)

# Folder Structure

crm-project/
├── backend/
│ ├── src/
│ │ ├── modules/
│ │ │ ├── user/
│ │ │ ├── client/
│ │ │ ├── project/
│ │ │ ├── interactionLog/
│ │ ├── app.ts
│ │ ├── server.ts
│ ├── package.json
│ ├── .env
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── hooks/
│ │ ├── redux/
│ ├── vite.config.ts
│ ├── package.json
│ ├── .env
├── README.md

# Summary of Approach and Decisions

# Separation of Concerns:

Models, routes, controllers, and interfaces are modularized for clean architecture.

# Authentication & Security:

Passwords are securely hashed using Bcrypt.js.

JWTs are used for secure user authentication.

Passwords are hidden in all response payloads.

# Relational Integrity:

Strong references (ObjectId) between Clients, Projects, and Interaction Logs ensure data consistency even in MongoDB.

# Modular Design:

Each entity (User, Client, Project, InteractionLog) is independently designed for scalability.

# Frontend Communication:

Used RTK Query for efficient, cached, and auto-refetched API communications.

# Code Quality:

Consistent code formatting and quality checks with ESLint and Prettier.

# Reminders & Notifications:

Automatic alerts for upcoming interactions within 7 days to boost client engagement.

# 🔥 Future Improvements

Implement Role-Based Access Control (RBAC) for better permission handling.

Integrate email services to send automated client interaction reminders.

Export reports (Clients/Projects) in PDF or Excel format.

# Deploy the project:

Frontend → Vercel

# Backend → Render or Heroku

🙌 Thank You!
Happy coding! 🚀
