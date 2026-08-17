# Task Tracker Pro

A modern productivity and task management web application designed to help users organize tasks, manage priorities, track progress, and build productive habits.

The project is being developed as a **full-stack application** with a Java Spring Boot backend, MySQL database, secure user authentication, and a responsive frontend.

---

## 🚀 Features

### Task Management

* Create and manage personal tasks
* Set task priorities
* Assign due dates
* Track pending and completed tasks
* Search and filter tasks
* Calendar-based task organization
* Task progress tracking

### User Authentication

* User registration
* Email-based user accounts
* Secure password hashing using BCrypt
* User login
* JWT-based authentication
* Protected API endpoints

### User Profile & Activity

* Individual user profiles
* User-specific task data
* Activity tracking
* Productivity statistics
* Task completion history
* Personalized dashboard

> Profile analytics and advanced activity features are planned for the next development phase.

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6+)
* Responsive Web Design
* Local Storage / REST API integration

### Backend

* Java
* Spring Boot 3.5
* Spring Web
* Spring Data JPA
* Spring Security
* REST APIs
* JWT

### Database

* MySQL 8
* Hibernate ORM

### Development Tools

* VS Code
* Maven Wrapper
* Git
* GitHub
* Postman
* MySQL Workbench

---

## 🏗️ Project Architecture

```text
Task Tracker Pro
│
├── Frontend
│   ├── HTML
│   ├── CSS
│   └── JavaScript
│
└── Backend
    ├── Controller
    ├── Service
    ├── Repository
    ├── Entity
    ├── DTO
    ├── Security
    └── Configuration
            │
            ▼
        MySQL Database
```

---

## 📁 Backend Structure

```text
src/
└── main/
    ├── java/
    │   └── com/
    │       └── krishna/
    │           └── tasktracker/
    │               │
    │               ├── config/
    │               │   └── SecurityConfig.java
    │               │
    │               ├── controller/
    │               │   └── AuthController.java
    │               │
    │               ├── dto/
    │               │   ├── RegisterRequest.java
    │               │   ├── LoginRequest.java
    │               │   └── LoginResponse.java
    │               │
    │               ├── entity/
    │               │   └── User.java
    │               │
    │               ├── repository/
    │               │   └── UserRepository.java
    │               │
    │               └── service/
    │                   ├── AuthService.java
    │                   └── JwtService.java
    │
    └── resources/
        └── application.properties
```

---

## 🔐 Authentication Flow

The authentication system follows a secure registration and login architecture:

```text
                    ┌──────────────┐
                    │    Client    │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ AuthController│
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ AuthService  │
                    └──────┬───────┘
                           │
                  ┌────────┴────────┐
                  ▼                 ▼
             Password           UserRepository
              BCrypt                 │
                                    ▼
                               MySQL Database
```

For login:

```text
User Login
    │
    ▼
Verify Email
    │
    ▼
Verify BCrypt Password
    │
    ▼
Generate JWT
    │
    ▼
Return Authentication Token
```

---

## 🔒 Password Security

User passwords are **never stored as plain text**.

During registration, the password is encrypted using:

```text
BCryptPasswordEncoder
```

Example database value:

```text
$2a$10$...
```

This protects user credentials even if the database is accessed directly.

---

## 🗄️ Database

The application uses MySQL with the database:

```sql
CREATE DATABASE task_tracker;
```

The current user table contains:

```text
users
├── id
├── full_name
├── email
├── password
└── created_at
```

Hibernate/JPA manages the database schema through the application's JPA configuration.

---

## 🔌 Authentication API

### Register User

```http
POST /api/auth/register
```

Request:

```json
{
  "fullName": "Krishna Kushwaha",
  "email": "user@example.com",
  "password": "Password@123"
}
```

Successful response:

```text
User registered successfully!
```

### Login User

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "user@example.com",
  "password": "Password@123"
}
```

Successful authentication returns a JWT token.

---

## ⚙️ Local Setup

### Prerequisites

Install the following:

* Java 21 or compatible JDK
* MySQL 8
* Git
* VS Code or another Java IDE

The project includes the **Maven Wrapper**, so a separate Maven installation is not required.

---

### 1. Clone the Repository

```bash
git clone https://github.com/KrishnaKushwaha-1/task-tracker-pro.git
```

```bash
cd task-tracker-pro
```

---

### 2. Create MySQL Database

Open MySQL and run:

```sql
CREATE DATABASE task_tracker;
```

Then select it:

```sql
USE task_tracker;
```

---

### 3. Configure Database Connection

Update:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.application.name=TaskTracker

spring.datasource.url=jdbc:mysql://localhost:3306/task_tracker
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

server.port=8080
```

Replace:

```text
YOUR_MYSQL_PASSWORD
```

with your local MySQL password.

---

### 4. Compile the Project

On Windows:

```powershell
.\mvnw.cmd clean
```

Then:

```powershell
.\mvnw.cmd compile
```

---

### 5. Run the Application

```powershell
.\mvnw.cmd spring-boot:run
```

The backend will run at:

```text
http://localhost:8080
```

---

## 🧪 API Testing

The authentication APIs can be tested using **Postman** or PowerShell.

Example PowerShell registration request:

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:8080/api/auth/register" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"fullName":"Krishna Kushwaha","email":"user@example.com","password":"Password@123"}'
```

---

## 🔄 Development Roadmap

### Phase 1 — Authentication

* [x] Spring Boot setup
* [x] MySQL integration
* [x] User entity
* [x] User repository
* [x] Registration API
* [x] BCrypt password hashing
* [x] JWT service
* [ ] Complete JWT login integration
* [ ] JWT authentication filter
* [ ] Protected API endpoints

### Phase 2 — Task Management

* [ ] Task entity
* [ ] Task repository
* [ ] Create task API
* [ ] Update task API
* [ ] Delete task API
* [ ] Complete task API
* [ ] User-specific tasks
* [ ] Search and filtering

### Phase 3 — Profile & Activity

* [ ] User profile
* [ ] Profile editing
* [ ] Activity timeline
* [ ] Productivity statistics
* [ ] Task completion analytics
* [ ] User dashboard

### Phase 4 — Advanced Features

* [ ] Interactive calendar
* [ ] Productivity charts
* [ ] Achievement system
* [ ] Task reminders
* [ ] Notifications
* [ ] Dark/light theme
* [ ] Production deployment

---

## 🎯 Project Objectives

Task Tracker Pro aims to provide a centralized productivity platform where users can:

1. Organize their daily tasks.
2. Prioritize important work.
3. Track task completion.
4. Monitor productivity.
5. Manage personal activity.
6. Secure their data through user authentication.

---

## 💡 Key Learning Outcomes

This project demonstrates practical experience with:

* Object-Oriented Programming
* Java and Spring Boot
* REST API development
* Spring Data JPA
* Hibernate ORM
* MySQL database integration
* Authentication and authorization
* BCrypt password hashing
* JWT-based security
* MVC-style application architecture
* API testing
* Git and GitHub
* Full-stack application development

---

## 📌 Future Enhancements

Future versions can include:

* Google/GitHub OAuth login
* Email verification
* Password reset
* Role-based access control
* Real-time notifications
* Recurring tasks
* Team collaboration
* Task sharing
* Advanced productivity analytics
* Cloud deployment
* Docker containerization

---

## 👨‍💻 Author

**Krishna Kushwaha**

B.Tech — Computer Science Engineering

Interested in Software Development, Full-Stack Development, Java, and modern web technologies.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

**Task Tracker Pro — Plan. Track. Accomplish.**
