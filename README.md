🚀 Task Tracker Pro

Task Tracker Pro is a full-stack productivity and task management application designed to help users organize tasks, manage priorities, monitor progress, and improve productivity.

The application is being developed using Java Spring Boot, Spring Security, JWT authentication, MySQL, and a responsive HTML/CSS/JavaScript frontend.

«Project Status: 🚧 In Active Development»

---

📋 Table of Contents

- "Overview" (#-overview)
- "Features" (#-features)
- "Tech Stack" (#-tech-stack)
- "System Architecture" (#-system-architecture)
- "Project Structure" (#-project-structure)
- "Authentication Flow" (#-authentication-flow)
- "Security" (#-security)
- "Database" (#-database)
- "API Documentation" (#-api-documentation)
- "Getting Started" (#-getting-started)
- "API Testing" (#-api-testing)
- "Development Roadmap" (#-development-roadmap)
- "Future Enhancements" (#-future-enhancements)
- "Learning Outcomes" (#-learning-outcomes)
- "Author" (#-author)

---

🎯 Overview

Task Tracker Pro provides a centralized platform for managing personal tasks and tracking productivity.

The application follows a layered backend architecture with separate Controller, Service, Repository, Entity, DTO, and Security components.

Core Objectives

- Create and manage personal tasks
- Prioritize important activities
- Assign due dates
- Track task completion
- Provide user-specific data
- Secure user accounts and APIs
- Build a foundation for productivity analytics

---

✨ Features

🔐 Authentication & Security

- User registration
- Email-based authentication
- Secure password hashing using BCrypt
- JWT-based authentication architecture
- Protected API endpoint support
- User-specific data isolation

✅ Task Management

Planned task-management functionality includes:

- Create tasks
- Update tasks
- Delete tasks
- Mark tasks as completed
- Assign priorities
- Set due dates
- Search and filter tasks
- Track task progress
- Calendar-based task organization

👤 User Profile & Activity

Planned functionality includes:

- Personal user profiles
- Profile editing
- Activity timeline
- Task completion history
- Productivity statistics
- Personalized dashboard

📊 Productivity

Future versions will provide:

- Productivity charts
- Completion-rate analysis
- Daily/weekly productivity summaries
- Achievement tracking
- Personalized productivity insights

---

🛠️ Tech Stack

Frontend

Technology| Purpose
HTML5| Application structure
CSS3| Styling and responsive design
JavaScript ES6+| Client-side functionality
REST API| Backend communication
Local Storage| Client-side data/token management

Backend

Technology| Purpose
Java 21| Backend development
Spring Boot 3.5| Application framework
Spring Web| REST API development
Spring Data JPA| Data persistence
Hibernate| ORM
Spring Security| Authentication & authorization
JWT| Token-based authentication
BCrypt| Password hashing

Database

Technology| Purpose
MySQL 8| Relational database
JPA/Hibernate| Database interaction and ORM

Development Tools

- Git
- GitHub
- VS Code
- IntelliJ IDEA / Eclipse
- Maven Wrapper
- Postman
- MySQL Workbench

---

🏗️ System Architecture

                         ┌─────────────────────┐
                         │       Client        │
                         │ HTML/CSS/JavaScript │
                         └──────────┬──────────┘
                                    │
                              HTTP / REST
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Spring Boot API   │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
              ┌──────────┐   ┌──────────┐   ┌──────────┐
              │Controller│   │ Service  │   │ Security │
              └────┬─────┘   └────┬─────┘   └────┬─────┘
                   │              │              │
                   └──────────────┼──────────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ Repository / JPA│
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │     MySQL 8     │
                         └─────────────────┘

---

📁 Project Structure

task-tracker-pro/
│
├── frontend/
│   ├── index.html
│   ├── css/
│   └── js/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── krishna/
│   │       │           └── tasktracker/
│   │       │               │
│   │       │               ├── config/
│   │       │               │   └── SecurityConfig.java
│   │       │               │
│   │       │               ├── controller/
│   │       │               │   └── AuthController.java
│   │       │               │
│   │       │               ├── dto/
│   │       │               │   ├── RegisterRequest.java
│   │       │               │   ├── LoginRequest.java
│   │       │               │   └── LoginResponse.java
│   │       │               │
│   │       │               ├── entity/
│   │       │               │   └── User.java
│   │       │               │
│   │       │               ├── repository/
│   │       │               │   └── UserRepository.java
│   │       │               │
│   │       │               └── service/
│   │       │                   ├── AuthService.java
│   │       │                   └── JwtService.java
│   │       │
│   │       └── resources/
│   │           └── application.properties
│   │
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
└── README.md

---

🔐 Authentication Architecture

Task Tracker Pro uses a layered authentication architecture based on Spring Security, BCrypt, and JWT.

Registration Flow

User
 │
 ▼
Registration Request
 │
 ▼
AuthController
 │
 ▼
AuthService
 │
 ├── Validate User
 │
 ├── Hash Password using BCrypt
 │
 ▼
UserRepository
 │
 ▼
MySQL Database

Passwords are never stored as plain text.

A password such as:

Password@123

is stored as a BCrypt hash similar to:

$2a$10$.................................................

---

Login Flow

User
 │
 ▼
Login Request
 │
 ▼
AuthController
 │
 ▼
AuthService
 │
 ├── Find User by Email
 │
 ├── Verify BCrypt Password
 │
 ▼
Generate JWT
 │
 ▼
Return Authentication Token

The client can subsequently send the JWT with authenticated API requests:

Authorization: Bearer <JWT_TOKEN>

---

🛡️ Security

The application is designed around the following security principles:

Password Protection

Passwords are hashed using:

BCryptPasswordEncoder

Plain-text passwords are not stored in the database.

JWT Authentication

After successful login, the server generates a signed JWT token.

The token can be used to authenticate subsequent API requests.

Protected Resources

Authenticated endpoints can be protected through Spring Security.

Client
   │
   │ Authorization: Bearer JWT
   ▼
Spring Security
   │
   ├── Validate Token
   │
   ├── Authenticate User
   │
   ▼
Protected Controller

«Note: Complete JWT filter integration and protected endpoint implementation are part of the current development roadmap.»

---

🗄️ Database

The application uses MySQL 8 with Hibernate/JPA for persistence.

Database Creation

CREATE DATABASE task_tracker;

Current User Model

users
│
├── id
├── full_name
├── email
├── password
└── created_at

JPA/Hibernate manages the database schema according to the configured application properties.

---

🔌 REST API

Authentication APIs

Register User

POST /api/auth/register

Request

{
  "fullName": "Krishna Kushwaha",
  "email": "user@example.com",
  "password": "Password@123"
}

Response

User registered successfully!

---

Login User

POST /api/auth/login

Request

{
  "email": "user@example.com",
  "password": "Password@123"
}

Response

A successful authentication returns a JWT token.

Example:

{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}

«The exact response structure depends on the current "LoginResponse" implementation.»

---

⚙️ Getting Started

Follow these steps to run the project locally.

Prerequisites

Make sure the following are installed:

- Java 21 or compatible JDK
- MySQL 8
- Git
- VS Code / IntelliJ IDEA / Eclipse

Maven does not need to be installed separately because the project includes the Maven Wrapper.

---

1. Clone the Repository

git clone https://github.com/KrishnaKushwaha-1/task-tracker-pro.git

Navigate to the project:

cd task-tracker-pro

---

2. Create the Database

Open MySQL and execute:

CREATE DATABASE task_tracker;

Optional:

USE task_tracker;

---

3. Configure MySQL

Open:

src/main/resources/application.properties

Configure your database connection:

spring.application.name=TaskTracker

spring.datasource.url=jdbc:mysql://localhost:3306/task_tracker
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

server.port=8080

Replace:

YOUR_MYSQL_PASSWORD

with your local MySQL password.

Security Recommendation

For production environments, avoid committing database credentials directly to "application.properties".

Use environment variables or a secure configuration system instead.

---

▶️ Running the Application

Windows

Clean the project:

.\mvnw.cmd clean

Compile:

.\mvnw.cmd compile

Run:

.\mvnw.cmd spring-boot:run

---

Linux / macOS

./mvnw clean

./mvnw compile

./mvnw spring-boot:run

The backend will be available at:

http://localhost:8080

---

🧪 API Testing

APIs can be tested using tools such as:

- Postman
- PowerShell
- cURL
- Frontend REST API integration

PowerShell Registration Example

Invoke-RestMethod `
  -Uri "http://localhost:8080/api/auth/register" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"fullName":"Krishna Kushwaha","email":"user@example.com","password":"Password@123"}'

Login Example

Invoke-RestMethod `
  -Uri "http://localhost:8080/api/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"user@example.com","password":"Password@123"}'

---

🗺️ Development Roadmap

Phase 1 — Authentication

- [x] Spring Boot project setup
- [x] MySQL integration
- [x] User entity
- [x] User repository
- [x] Registration API
- [x] BCrypt password hashing
- [x] JWT service
- [ ] Complete JWT login integration
- [ ] JWT authentication filter
- [ ] Protected API endpoints
- [ ] Authentication exception handling

---

Phase 2 — Task Management

- [ ] Task entity
- [ ] Task repository
- [ ] Task service
- [ ] Create task API
- [ ] Update task API
- [ ] Delete task API
- [ ] Complete task API
- [ ] User-specific tasks
- [ ] Task priorities
- [ ] Due dates
- [ ] Search and filtering
- [ ] Task status management

---

Phase 3 — Frontend Integration

- [ ] Login UI
- [ ] Registration UI
- [ ] Dashboard
- [ ] Task creation interface
- [ ] Task editing
- [ ] Task filtering
- [ ] Calendar interface
- [ ] JWT-based API integration
- [ ] Responsive mobile UI

---

Phase 4 — Profile & Analytics

- [ ] User profile
- [ ] Profile editing
- [ ] Activity timeline
- [ ] Productivity statistics
- [ ] Task completion history
- [ ] Productivity charts
- [ ] Personalized dashboard

---

Phase 5 — Advanced Features

- [ ] Interactive calendar
- [ ] Task reminders
- [ ] Notifications
- [ ] Recurring tasks
- [ ] Achievement system
- [ ] Dark/light theme
- [ ] Production deployment
- [ ] Docker containerization

---

🔮 Future Enhancements

The project can be extended with:

- Google OAuth
- GitHub OAuth
- Email verification
- Password reset
- Role-Based Access Control (RBAC)
- Recurring tasks
- Team collaboration
- Task sharing
- Real-time notifications
- Advanced productivity analytics
- Docker-based deployment
- CI/CD pipeline
- Cloud deployment
- Monitoring and logging

---

📚 Learning Outcomes

This project provides hands-on experience with:

Backend Development

- Java
- Object-Oriented Programming
- Spring Boot
- REST API development
- Spring Data JPA
- Hibernate
- Layered architecture

Database

- MySQL
- Relational database design
- Entity relationships
- JPA persistence

Security

- Spring Security
- BCrypt password hashing
- JWT authentication
- Authentication and authorization
- Protected REST APIs

Software Engineering

- MVC/layered architecture
- DTO-based API design
- API testing
- Git & GitHub
- Maven
- Full-stack development

---

📈 Planned Architecture Evolution

As the project grows, the architecture can evolve toward:

                    ┌─────────────────┐
                    │    Frontend     │
                    │ HTML/CSS/JS     │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   REST API      │
                    │  Spring Boot    │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        ┌───────────┐  ┌───────────┐  ┌───────────┐
        │   Auth    │  │   Tasks   │  │  Profile  │
        │  Module   │  │  Module   │  │  Module   │
        └───────────┘  └───────────┘  └───────────┘
              │              │              │
              └──────────────┼──────────────┘
                             ▼
                    ┌─────────────────┐
                    │     MySQL       │
                    └─────────────────┘

This modular structure will make it easier to introduce additional functionality without tightly coupling different parts of the application.

---

🤝 Contributing

Contributions, suggestions, and improvements are welcome.

Contribution Workflow

git clone <repository-url>

Create a feature branch:

git checkout -b feature/your-feature

Make your changes and commit:

git add .
git commit -m "Add: your feature"

Push the branch:

git push origin feature/your-feature

Then open a Pull Request.

---

👨‍💻 Author

Krishna Kushwaha

B.Tech — Computer Science Engineering

Interested in:

- Software Development
- Full-Stack Development
- Java & Spring Boot
- Data Structures & Algorithms
- Artificial Intelligence
- Modern Web Technologies

---

⭐ Support

If you find Task Tracker Pro useful or interesting, consider giving the repository a ⭐ on GitHub.

---

<div align="center">🚀 Task Tracker Pro

Plan. Track. Accomplish.

Built with Java • Spring Boot • MySQL • JavaScript

</div>