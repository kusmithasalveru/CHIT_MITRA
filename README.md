<<<<<<< HEAD
# Chit Mitra: Secure Digital Chit Fund Ecosystem

> A production-grade, full-stack fintech platform designed to modernize and secure traditional chit fund management through transparent bidding, automated payments, and comprehensive analytics.

## 🌟 Project Overview
Chit Mitra bridges the gap between traditional savings groups and modern financial technology. It provides a Zerodha-inspired, premium user experience for communities to manage group savings, participate in monthly reverse-auctions, and track dividends with real-time transparency.

### 💼 Placement & Resume Details
- **Role:** Full Stack Developer
- **Tech Stack:** React, Tailwind CSS, Framer Motion, Spring Boot, MySQL, Docker, GitHub Actions
- **Key Achievements:**
  - Architected a secure full-stack fintech application processing simulated monthly contributions and reverse auctions.
  - Implemented JWT-based authentication and Role-Based Access Control (RBAC) via Spring Security.
  - Designed and normalized a complex SQL schema for managing users, wallets, dynamic bidding, and financial transactions.
  - Built a responsive, high-performance UI featuring glassmorphism design, dark/light mode switching, and Framer Motion animations.
  - Established a CI/CD pipeline using GitHub Actions and containerized the application with Docker & Docker Compose for rapid deployment.

---

## 🛠️ Technology Stack

### Frontend (User Interface)
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS (Custom Dark/Light mode tokens)
- **Animations:** Framer Motion
- **Data Visualization:** Recharts
- **Icons & UI:** Lucide React, Custom Glassmorphism components

### Backend (Business Logic)
- **Framework:** Java 21 / Spring Boot 3
- **Security:** Spring Security & JSON Web Tokens (JWT)
- **Database:** MySQL 8.0 & Spring Data JPA (Hibernate)
- **API Documentation:** Swagger / OpenAPI 3

### DevOps & Infrastructure
- **Containerization:** Docker & Docker Compose
- **CI/CD:** GitHub Actions
- **Database Schema:** Version-controlled SQL initialization scripts

---

## 🏗️ System Architecture & Features

### 1. Advanced Authentication & RBAC
- Stateless JWT authentication.
- Strict role separation (Admin vs. User).
- Secure password hashing.

### 2. Digital Chit Group Management
- Automated duration and payout calculations.
- Member limit enforcement and status tracking (`OPEN`, `IN_PROGRESS`, `COMPLETED`).
- Trust scoring system for group eligibility.

### 3. Dynamic Bidding & Auctions
- Reverse-auction engine allowing members to bid for monthly pool.
- Automated dividend distribution calculation post-auction.

### 4. Automated Payment & Wallet System
- Wallet ledger tracking `DEPOSIT`, `WITHDRAWAL`, and `CONTRIBUTION_PAYMENT`.
- Late fee penalty system and automated due-date reminders.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- Java (v21+)
- Maven (v3.8+)
- Docker & Docker Compose

### Option 1: Docker (Recommended)
Spin up the entire stack (MySQL, Spring Boot Backend, React Frontend) with a single command:
```bash
docker-compose up --build
```
- **Frontend:** http://localhost:80
- **Backend API:** http://localhost:8080
- **Swagger Docs:** http://localhost:8080/swagger-ui.html

### Option 2: Manual Setup

**1. Database Setup**
- Run `database/schema.sql` in your local MySQL instance.
- Update credentials in `backend/src/main/resources/application.yml`.

**2. Start Backend**
```bash
cd backend
mvn spring-boot:run
```

**3. Start Frontend**
```bash
cd frontend
npm install
npm run dev
```
Navigate to `http://localhost:5173`.

---

## 📂 Project Structure

```text
chit-mitra/
├── frontend/                # React Vite Application
│   ├── src/
│   │   ├── components/      # Reusable UI elements
│   │   ├── pages/           # Landing, Auth, Dashboard
│   │   └── index.css        # Tailwind & Custom CSS variables
├── backend/                 # Spring Boot Application
│   ├── src/main/java/
│   │   ├── config/          # Spring Security, CORS, Swagger
│   │   ├── controller/      # REST API endpoints
│   │   ├── entity/          # JPA Models (User, ChitGroup, etc.)
│   │   └── repository/      # Database Access Layer
├── database/                # SQL Schema and initialization scripts
├── docker-compose.yml       # Multi-container orchestration
└── .github/workflows/       # CI/CD pipelines
```

---
*Built with ❤️ for secure community savings.*
=======
# CHIT_MITRA
>>>>>>> 8387d32fc4f15b3594d410981a8ed06d085972ac
