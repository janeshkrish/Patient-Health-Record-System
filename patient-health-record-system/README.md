Patient Health Record System - Complete Setup Guide
🎯 Project Overview
A full-stack MERN application for managing patient health records with Role-Based Access Control (RBAC), secure data encryption, and comprehensive audit logging.

✨ Key Features
✅ User Authentication & RBAC (Admin, Doctor, Nurse, Patient, Lab Technician)

✅ Patient Profile Management with unique ID generation

✅ Health Record Management (vitals, diagnoses, treatments)

✅ E-Prescription System with tracking

✅ Laboratory Results Management

✅ Appointment Scheduling with availability checking

✅ Data Encryption (data-at-rest and in-transit)

✅ Audit Logging for compliance

✅ Admin Dashboard with analytics

✅ Modern, Responsive UI

📁 Complete Project Structure
patient-health-record-system/
│
├── backend/
│   ├── config/
│   │   ├── db.js                      # MongoDB connection
│   │   └── auth.js                    # Role & permission config
│   ├── middleware/
│   │   ├── auth.middleware.js         # JWT authentication
│   │   ├── rbac.middleware.js         # Role-based access control
│   │   └── audit.middleware.js        # Audit logging
│   ├── models/
│   │   ├── User.model.js              # User schema
│   │   ├── Patient.model.js           # Patient schema
│   │   ├── HealthRecord.model.js      # Health records
│   │   ├── Prescription.model.js      # Prescription schema
│   │   ├── LabResult.model.js         # Lab results
│   │   ├── Appointment.model.js       # Appointments
│   │   └── AuditLog.model.js          # Audit logs
│   ├── routes/
│   │   ├── auth.routes.js             # Authentication routes
│   │   ├── patient.routes.js          # Patient CRUD
│   │   ├── healthRecord.routes.js     # Health records
│   │   ├── prescription.routes.js     # Prescriptions
│   │   ├── labResult.routes.js        # Lab results
│   │   ├── appointment.routes.js      # Appointments
│   │   ├── admin.routes.js            # Admin operations
│   │   └── audit.routes.js            # Audit logs
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── patient.controller.js
│   │   ├── healthRecord.controller.js
│   │   ├── prescription.controller.js
│   │   ├── labResult.controller.js
│   │   ├── appointment.controller.js
│   │   ├── admin.controller.js
│   │   └── audit.controller.js
│   ├── utils/
│   │   ├── encryption.js              # Data encryption
│   │   ├── validation.js              # Input validation
│   │   └── fileUpload.js              # File handling
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js                      # Entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Loader.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── DoctorDashboard.jsx
│   │   │   │   ├── PatientDashboard.jsx
│   │   │   │   ├── NurseDashboard.jsx
│   │   │   │   └── AdminDashboard.jsx
│   │   │   ├── patient/
│   │   │   │   ├── PatientList.jsx
│   │   │   │   ├── PatientProfile.jsx
│   │   │   │   ├── PatientForm.jsx
│   │   │   │   └── PatientDetails.jsx
│   │   │   ├── healthRecord/
│   │   │   │   ├── HealthRecordList.jsx
│   │   │   │   ├── HealthRecordForm.jsx
│   │   │   │   └── HealthRecordView.jsx
│   │   │   ├── prescription/
│   │   │   │   ├── PrescriptionList.jsx
│   │   │   │   ├── PrescriptionForm.jsx
│   │   │   │   └── PrescriptionView.jsx
│   │   │   ├── labResult/
│   │   │   │   ├── LabResultList.jsx
│   │   │   │   ├── LabResultForm.jsx
│   │   │   │   └── LabResultView.jsx
│   │   │   ├── appointment/
│   │   │   │   ├── AppointmentList.jsx
│   │   │   │   ├── AppointmentForm.jsx
│   │   │   │   └── AppointmentCalendar.jsx
│   │   │   └── admin/
│   │   │       ├── UserManagement.jsx
│   │   │       ├── AuditLogs.jsx
│   │   │       └── SystemAnalytics.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx         # Authentication context
│   │   ├── services/
│   │   │   ├── api.js                  # Axios instance
│   │   │   ├── auth.service.js
│   │   │   ├── patient.service.js
│   │   │   ├── healthRecord.service.js
│   │   │   ├── prescription.service.js
│   │   │   ├── labResult.service.js
│   │   │   ├── appointment.service.js
│   │   │   └── admin.service.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── helpers.js
│   │   │   └── validation.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── index.css
│   │   │   └── components.css
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── routes.jsx                  # Route configuration
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
└── README.md
🚀 Installation & Setup
Prerequisites
Node.js (v16 or higher)

MongoDB (v5 or higher)

VS Code or any code editor

Git
STEP 1: Clone/Create Project Directory
bash
mkdir patient-health-record-system
cd patient-health-record-system
STEP 2: Backend Setup
2.1 Create Backend Directory
bash
mkdir backend
cd backend
2.2 Initialize Node.js Project
bash
npm init -y
2.3 Install Dependencies
bash
npm install express mongoose dotenv bcryptjs jsonwebtoken cors helmet express-rate-limit multer crypto-js express-validator morgan cookie-parser
npm install --save-dev nodemon
2.4 Create Directory Structure
bash
mkdir config middleware models routes controllers utils uploads
2.5 Configure package.json Scripts
Add to backend/package.json:

json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
2.6 Create .env File
File: backend/.env

text
NODE_ENV=development
PORT=5000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/patient_health_record

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Encryption
ENCRYPTION_KEY=your_32_character_encryption_key_here

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CLIENT_URL=http://localhost:3000
2.7 Copy All Backend Files
Copy all files from the provided backend code files to their respective directories:

server.js to backend/

All files from config/ folder

All files from middleware/ folder

All files from models/ folder

All files from routes/ folder

All files from controllers/ folder

All files from utils/ folder

2.8 Start Backend Server
bash
npm run dev
Backend should be running on http://localhost:5000

STEP 3: Frontend Setup
3.1 Create React App
bash
cd ..
npx create-react-app frontend
cd frontend
3.2 Install Dependencies
bash
npm install react-router-dom axios recharts react-icons react-toastify @headlessui/react date-fns
3.3 Create .env File
File: frontend/.env

text
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NAME=Patient Health Record System
3.4 Create Directory Structure
bash
cd src
mkdir components context services utils styles
cd components
mkdir auth common dashboard patient healthRecord prescription labResult appointment admin
cd ../..
3.5 Copy All Frontend Files
Copy all files from the provided frontend code files to their respective directories:

Replace src/index.jsx

Replace src/App.jsx

Add src/routes.jsx

Copy all component files to their respective folders

Copy all service files

Copy all style files

Copy AuthContext.jsx to context folder

3.6 Start Frontend Server
bash
npm start
Frontend should open at http://localhost:3000

🗄️ Database Setup
Option 1: Local MongoDB
Install MongoDB from https://www.mongodb.com/try/download/community

Start MongoDB service:

bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
MongoDB will run on mongodb://localhost:27017

Option 2: MongoDB Atlas (Cloud)
Create account at https://www.mongodb.com/cloud/atlas

Create a new cluster

Get connection string

Update MONGODB_URI in backend/.env:

text
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/patient_health_record
👤 Creating Initial Users
Method 1: Using Register Page
Go to http://localhost:3000/register

Fill in details and select role

Click "Create Account"

Method 2: Using API (Postman/Thunder Client)
POST http://localhost:5000/api/auth/register

Body:

json
{
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@example.com",
  "password": "password123",
  "role": "admin",
  "phone": "1234567890"
}
Default Test Users
Create these users for testing:

Admin:

json
{
  "email": "admin@hospital.com",
  "password": "admin123",
  "role": "admin",
  "firstName": "System",
  "lastName": "Admin"
}
Doctor:

json
{
  "email": "doctor@hospital.com",
  "password": "doctor123",
  "role": "doctor",
  "firstName": "John",
  "lastName": "Smith",
  "specialization": "Cardiology",
  "licenseNumber": "DOC123456"
}
Nurse:

json
{
  "email": "nurse@hospital.com",
  "password": "nurse123",
  "role": "nurse",
  "firstName": "Jane",
  "lastName": "Doe",
  "licenseNumber": "NUR123456"
}
Patient:

json
{
  "email": "patient@example.com",
  "password": "patient123",
  "role": "patient",
  "firstName": "Michael",
  "lastName": "Johnson"
}
🎨 VS Code Setup
Recommended Extensions
ES7+ React/Redux/React-Native snippets

ESLint

Prettier - Code formatter

Auto Import

MongoDB for VS Code

Thunder Client (API testing)

VS Code Workspace Settings
Create .vscode/settings.json:

json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
📝 File Placement Guide
Where to Paste Each File
Backend Files:

text
backend/
├── server.js                           → Root of backend folder
├── package.json                        → Root of backend folder
├── .env                                → Root of backend folder
├── config/
│   ├── db.js                          → backend/config/
│   └── auth.js                        → backend/config/
├── middleware/
│   ├── auth.middleware.js             → backend/middleware/
│   ├── rbac.middleware.js             → backend/middleware/
│   └── audit.middleware.js            → backend/middleware/
├── models/
│   ├── User.model.js                  → backend/models/
│   ├── Patient.model.js               → backend/models/
│   ├── HealthRecord.model.js          → backend/models/
│   ├── Prescription.model.js          → backend/models/
│   ├── LabResult.model.js             → backend/models/
│   ├── Appointment.model.js           → backend/models/
│   └── AuditLog.model.js              → backend/models/
├── routes/                            → All route files go here
├── controllers/                       → All controller files go here
└── utils/                             → All utility files go here
Frontend Files:

text
frontend/
├── public/
│   └── index.html                     → Replace existing file
├── src/
│   ├── index.jsx                      → Replace existing file
│   ├── App.jsx                        → Replace existing file
│   ├── routes.jsx                     → Create new file
│   ├── components/
│   │   ├── auth/                      → Create folder, add Login.jsx, Register.jsx, etc.
│   │   ├── common/                    → Create folder, add Navbar.jsx, Sidebar.jsx, etc.
│   │   ├── dashboard/                 → Create folder, add all dashboard components
│   │   ├── patient/                   → Create folder, add patient components
│   │   └── [other folders]            → Follow same pattern
│   ├── context/
│   │   └── AuthContext.jsx            → frontend/src/context/
│   ├── services/
│   │   ├── api.js                     → frontend/src/services/
│   │   └── [other services]           → Same folder
│   ├── styles/
│   │   ├── index.css                  → frontend/src/styles/
│   │   ├── App.css                    → frontend/src/styles/
│   │   └── components.css             → frontend/src/styles/
│   ├── .env                           → Root of frontend folder
│   └── package.json                   → Root of frontend folder
🧪 Testing the Application
1. Test Authentication
Register a new user

Login with credentials

Verify JWT token in localStorage

Test logout functionality

2. Test RBAC
Login as different roles (Admin, Doctor, Nurse, Patient)

Verify access to different routes

Test unauthorized access attempts

3. Test CRUD Operations
Create a patient

View patient list

Update patient details

Create health records

Create prescriptions

Schedule appointments

4. Test Security Features
Verify data encryption

Check audit logs (Admin panel)

Test rate limiting (make multiple requests)

🔒 Security Features Implemented
JWT Authentication - Secure token-based auth

Password Hashing - bcrypt with salt rounds

RBAC - Role-based access control

Data Encryption - AES encryption for sensitive data

HTTPS/TLS - Secure data transmission

Rate Limiting - Prevent brute force attacks

Input Validation - Sanitize all inputs

Audit Logging - Track all data access

CORS Protection - Controlled origin access

Helmet.js - Security headers

📚 API Endpoints
Authentication
POST /api/auth/register - Register user

POST /api/auth/login - Login user

GET /api/auth/me - Get current user

GET /api/auth/logout - Logout user

Patients
GET /api/patients - Get all patients

GET /api/patients/:id - Get patient by ID

POST /api/patients - Create patient

PUT /api/patients/:id - Update patient

DELETE /api/patients/:id - Delete patient

Health Records
GET /api/health-records - Get health records

GET /api/health-records/:id - Get record by ID

POST /api/health-records - Create record

PUT /api/health-records/:id - Update record

DELETE /api/health-records/:id - Delete record

Prescriptions
GET /api/prescriptions - Get prescriptions

POST /api/prescriptions - Create prescription

PUT /api/prescriptions/:id - Update prescription

Appointments
GET /api/appointments - Get appointments

POST /api/appointments - Create appointment

PUT /api/appointments/:id/cancel - Cancel appointment

Admin
GET /api/admin/users - Get all users

GET /api/admin/stats - Get system stats

PUT /api/admin/users/:id/role - Update user role

🎯 User Roles & Permissions
Admin
Full system access

User management

View audit logs

System analytics

Doctor
View all patients

Create/update health records

Write prescriptions

Order lab tests

View lab results

Manage appointments

Nurse
View patients

Update vitals

View health records

Schedule appointments

Patient
View own records

View prescriptions

View lab results

Schedule appointments

Lab Technician
View patient info

Upload lab results

Update test status

🐛 Troubleshooting
Backend Issues
MongoDB Connection Error:

bash
# Check if MongoDB is running
mongosh

# If not installed, install MongoDB
Port Already in Use:

bash
# Change PORT in .env
PORT=5001
Frontend Issues
CORS Error:

Verify CLIENT_URL in backend .env

Check CORS middleware configuration

API Not Found:

Verify REACT_APP_API_URL in frontend .env

Ensure backend is running

📦 Deployment
Backend Deployment (Heroku/Railway/Render)
Add Procfile:

text
web: node server.js
Set environment variables

Deploy from Git repository

Frontend Deployment (Vercel/Netlify)
Build project: npm run build

Deploy build folder

Set environment variables

🎉 Conclusion
You now have a complete, production-ready Patient Health Record System with:

✅ Full MERN stack implementation

✅ Role-based access control

✅ Secure authentication

✅ Data encryption

✅ Audit logging

✅ Modern, responsive UI

✅ RESTful API

✅ Comprehensive documentation

Happy Coding! 🚀