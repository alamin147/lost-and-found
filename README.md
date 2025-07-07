# 📌 Lost & Found Management System

A modern, comprehensive lost and found management platform built with React, TypeScript, and Node.js. The system enables users to report lost items, register found items, make claims, and efficiently reunite people with their belongings.

---

## 📖 Description

Lost & Found Management System is a full-stack web application designed to streamline the process of reporting, tracking, and claiming lost items. Users can report lost belongings, register found items, and make claims through an intuitive interface. The platform features role-based access control, real-time search capabilities, advanced filtering, and comprehensive admin management tools.

This project demonstrates a complete implementation of a community service platform with user authentication, item management, claim processing, and administrative oversight capabilities.

---

## 🌐 Live URL

[Lost & Found Frontend](https://lost-and-found-rust.vercel.app)

[Lost & Found Backend](https://lost-and-found-backend-lf.vercel.app)

---

## 🚀 Features

- ✅ User authentication (register/login) with JWT-based security
- 🔒 Role-based access control (User/Admin)
- 📝 Lost item reporting with detailed descriptions and images
- 🔍 Found item registration with location and date tracking
- 💬 Claim system for matching lost and found items
- ⭐ Advanced search and filtering capabilities
- 📊 Admin dashboard with comprehensive analytics
- 👥 User management and role assignment
- 📂 Category management for item organization
- 📱 Responsive design for mobile and desktop
- 🔐 Secure password management and account settings
- 📈 Real-time statistics and activity tracking
- 🏷️ Item categorization system
- 📍 Location-based item tracking
- 📅 Filtering and sorting
- 🔔 Status tracking for claims and items
- 🛡️ Soft delete functionality for data integrity
- 📊 Dashboard analytics for users and admins
- 🎨 Modern, intuitive user interface

---

## 🧑‍💻 Tech Stack

**Frontend:**
- React
- TypeScript
- Tailwind CSS
- Flowbite React
- Redux Toolkit
- React Hook Form
- React Router DOM
- React Icons
- React Star Ratings
- React Toastify



**Backend:**
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

**Authentication & Security:**
- JWT (JSON Web Tokens)
- Bcrypt (password hashing)
- CORS (Cross-Origin Resource Sharing)

**Development Tools:**
- ESLint
- PostCSS
- Autoprefixer
- ts-node-dev
- Prisma Studio

---

## 👥 User Roles

- 👤 **User:** Can register, login, report lost items, register found items, make claims, view item histories, and manage personal profile
- 👨‍💻 **Admin:** Can manage all users, moderate content, view comprehensive analytics, manage categories, process claims, and handle all administrative functions

---


## 🛠️ Installation & Usage (Local)

```bash
# Clone the repository
git clone https://github.com/alamin147/lost-and-found.git

# Navigate to the backend
cd lost-and-found/server
npm install

# Create .env file in the server directory with required environment variables
# Then start the server
npm start

# Navigate to the frontend
cd ../frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🗂️ Project Structure

```
lost-and-found/
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   │   ├── banner/      # Homepage banner
│   │   │   ├── navbar/      # Navigation bar
│   │   │   ├── footer/      # Footer component
│   │   │   ├── modal/       # Modal components
│   │   │   └── recentItem/  # Recent items display
│   │   ├── pages/           # Page components
│   │   │   ├── home/        # Homepage
│   │   │   ├── login/       # Login page
│   │   │   ├── register/    # Registration page
│   │   │   ├── foundItems/  # Found items listing
│   │   │   ├── lostItems/   # Lost items listing
│   │   │   └── reportFoundItem/ # Report found item
│   │   ├── dashboard/       # Dashboard components
│   │   │   ├── pages/       # Dashboard pages
│   │   │   ├── myFoundItems/ # User's found items
│   │   │   └── myLostItems/ # User's lost items
│   │   ├── redux/           # Redux store and API
│   │   ├── auth/            # Authentication utilities
│   │   └── types/           # TypeScript type definitions
│   └── ...
├── server/                  # Express backend
│   ├── src/
│   │   ├── app/
│   │   │   ├── modules/     # Feature modules
│   │   │   │   ├── user/    # User management
│   │   │   │   ├── foundItems/ # Found items
│   │   │   │   ├── lostItem/ # Lost items
│   │   │   │   └── claim/   # Claims management
│   │   │   ├── auth/        # Authentication
│   │   │   ├── middlewares/ # Custom middlewares
│   │   │   ├── routes/      # API routes
│   │   │   └── utils/       # Utility functions
│   │   └── server.ts        # Entry point
│   ├── prisma/              # Database schema and migrations
│   └── ...
├── README.md
└── ...
```

---

## 🔐 Environment Variables

Create a `.env` file in the `server` directory and add the following:

```
DATABASE_URL=
JWT_SECRET=
CLIENT_URL=
NODE_ENV=
```

For the frontend, create a `.env` file with:
```
VITE_SERVER_URL=
VITE_NODE_ENV=
```

---

## 📊 API Documentation

### Authentication Routes
```http
POST /api/register              - Register a new user
POST /api/login                 - Login user and get token
POST /api/change-password       - Change user password (with authentication)
POST /api/change-email          - Change user email (with authentication)
POST /api/change-username       - Change username (with authentication)
```

### User Management Routes
```http
GET /api/users                  - Get all users
PUT /api/block/user/:id         - Block/unblock user (admin only)
PUT /api/change-role/:id        - Change user role (admin only)
DELETE /api/delete-user/:id     - Soft delete user (admin only)
```

### Item Category Routes
```http
GET /api/item-categories        - Get all item categories
POST /api/item-categories       - Create new category (with authentication)
PUT /api/item-categories/:id    - Update category (with authentication)
DELETE /api/item-categories/:id - Delete category (with authentication)
```

### Found Items Routes
```http
GET /api/found-items            - Get all found items with filtering
POST /api/found-items           - Create new found item (with authentication)
GET /api/found-item/:id         - Get single found item details
GET /api/my/foundItem           - Get user's found items (with authentication)
PUT /api/my/foundItem           - Update user's found item (with authentication)
DELETE /api/my/foundItem/:id    - Delete user's found item (with authentication)
```

### Lost Items Routes
```http
GET /api/lostItem               - Get all lost items with filtering
POST /api/lostItem              - Create new lost item (with authentication)
GET /api/lostItem/:id           - Get single lost item details
GET /api/my/lostItem            - Get user's lost items (with authentication)
PUT /api/my/lostItem            - Update user's lost item (with authentication)
DELETE /api/my/lostItem/:id     - Delete user's lost item (with authentication)
PUT /api/found-lost             - Mark lost item as found (with authentication)
```

### Claims Management Routes
```http
GET /api/claims                 - Get all claims (admin only)
POST /api/claims                - Create new claim (with authentication)
GET /api/my/claims              - Get user's claims (with authentication)
PUT /api/claims/:claimId        - Update claim status (with authentication)
```

### Dashboard & Statistics
```http
GET /api/admin/stats            - Get admin dashboard statistics (admin only)
```

---

## 🏗️ Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

- **User**: User accounts with role-based access
- **ItemCategory**: Categories for organizing items
- **FoundItem**: Items that have been found
- **LostItem**: Items that have been reported as lost
- **Claim**: Claims made by users for found items

All models include soft delete functionality and proper timestamp tracking.

---

## 🎯 Key Features Detail

### User Authentication
- JWT-based authentication system
- Role-based access control (User/Admin)
- Secure password hashing with bcrypt
- Password change and account management

### Item Management
- Report lost items with detailed descriptions
- Register found items with location data
- Advanced search and filtering capabilities
- Category-based organization
- Image support for item identification

### Claims System
- Users can claim found items
- Detailed claim forms with verification
- Status tracking (Pending/Approved/Rejected)
- Admin moderation capabilities

### Admin Dashboard
- Comprehensive user management
- Item moderation and oversight
- Claims processing and approval
- System statistics and analytics
- Category management

### User Dashboard
- Personal item tracking
- Claim request management
- Account settings and preferences
- Activity history and statistics

---

## 🛡️ Security Features

- JWT token-based authentication
- Role-based route protection
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration for API security
- Soft delete for data integrity

---

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices

---


## 🚀 Deployment

The application can be deployed on various platforms:
- **Frontend**: Vercel hosting service
- **Backend**: Vercel hosting service
- **Database**: PostgreSQL on Prisma Cloud
