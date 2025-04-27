CRM Project
A Customer Relationship Management (CRM) system built to manage clients, projects, and interaction logs efficiently.
This project focuses on user authentication, client management, project tracking, and interaction reminders.

🚀 Tech Stack
Frontend

React.js (with Redux Toolkit + RTK Query)

TypeScript

Backend

Node.js

Express.js

TypeScript

MongoDB (Mongoose ORM)

Bcrypt.js (for password hashing)

JWT (for user authentication)

Others

ESLint & Prettier (code formatting)

Lucidchart (for ERD design)

⚙️ Setup Instructions
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/crm-project.git
cd crm-project
Install backend dependencies:

bash
Copy
Edit
cd backend
npm install
Set up environment variables:
Create a .env file inside backend/:

env
Copy
Edit
PORT=5000
DATABASE_URL=mongodb://localhost:27017/crm-db
JWT_SECRET=your_secret_key
BCRYPT_SALT_ROUNDS=10
Run the backend server:

bash
Copy
Edit
npm run dev
Install frontend dependencies:

bash
Copy
Edit
cd ../frontend
npm install
Run the frontend server:

bash
Copy
Edit
npm run dev
🛠️ ERD (Entity Relationship Diagram)
Here's the database structure:

diff
Copy
Edit
User

- id (PK)
- name
- email (unique)
- password
- role (admin/user)
- isBlocked

Client

- id (PK)
- name
- email
- phone
- company
- notes
- userEmail (FK to User.email)

Project

- id (PK)
- title
- budget
- deadline
- status (Ongoing/Completed/Pending)
- clientId (FK to Client.id)

InteractionLog

- id (PK)
- date
- interactionType (Call/Meeting/Email)
- notes
- clientId (FK to Client.id)
- projectId (FK to Project.id)
  Relationships:

One User ➡️ Many Clients

One Client ➡️ Many Projects

One Client ➡️ Many InteractionLogs

One Project ➡️ Many InteractionLogs

(You can attach the visual ERD image separately if you need to.)

📖 Summary of Approach and Decisions
Separation of Concerns: Models, routes, controllers, and interfaces are properly separated to maintain clean architecture.

Authentication & Security: Used Bcrypt.js for password hashing and JWT for authentication. Passwords are hidden after save operations.

Relational Integrity: Although MongoDB is a NoSQL database, we maintained strong references (ObjectId) between Clients, Projects, and Interaction Logs.

Modular Design: Each model (User, Client, Project, InteractionLog) is kept independent, which allows easy scaling.

Frontend Communication: Used Redux Toolkit Query (RTK Query) for efficient API communication with caching and automatic refetching.

Code Quality: Enforced linting with ESLint and consistent formatting with Prettier.

Reminders & Notifications: Implemented functionality to show upcoming interactions within the next 7 days for better client engagement.

🔥 Future Improvements (Optional)
Add role-based access control (RBAC) for admin users.

Integration with email services for automated client reminders.

Export client/project reports in PDF or Excel.

Deploy on cloud platforms (Vercel for frontend, Render/Heroku for backend).

Thank you! 🚀
