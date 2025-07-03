# ClubberTV
# Sports Entertainment Web Application

A modern full-stack web application designed to showcase sports match fixtures with features tailored for sports enthusiasts. Built using **.NET Core**, **Angular**, **SQL Server**, and following **Clean Architecture** principles with **RESTful APIs**, the app provides a dynamic and scalable platform for users and administrators.

---

## 🏗️ Tech Stack

- **Backend**: .NET Core (Web API)
- **Frontend**: Angular
- **Architecture**: Clean Architecture
- **Database**: Microsoft SQL Server
- **API Design**: RESTful

---

## 🎯 Features

### 👥 User Roles

1. **Superadmin**  
   - Manages all users and admins  
   - Has full access to all admin and content functionalities

2. **Admin**  
   - Can access the admin dashboard  
   - Can add, update, or delete match fixtures

3. **User**  
   - Can browse sports fixtures  
   - Can add matches to a personal **Favorites List**  
   - Can view match times and other details  

---

## 📦 Main Modules

- **Authentication & Authorization**
  - Role-based access control (Superadmin, Admin, User)
  - Secure login and registration endpoints

- **Match Fixtures**
  - Browse upcoming and past matches
  - Match detail views (teams, time, date, status)

- **Favorites List**
  - Users can add/remove matches from their personal favorites list

- **Admin Dashboard**
  - Manage match data (CRUD operations)
  - Access limited to Admins and Superadmins

- **Responsive UI**
  - Angular-based frontend with dynamic interaction
  - Optimized for desktop and mobile devices

---

## 🧱 Clean Architecture

The project follows the **Clean Architecture** approach, separating concerns into:

- **Domain Layer**: Business rules and entities
- **Application Layer**: Use cases and interfaces
- **Infrastructure Layer**: Database and external services
- **Presentation Layer**: API Controllers (for backend) and Angular UI (frontend)

---
