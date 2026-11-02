# Qbook

# Turn – Smart Shop & Online Ticket Booking System

Turn is a web-based shop management and online ticket booking platform that allows users to discover shops, book tickets online, and track their booking status. Shop owners can manage their shops, control opening hours, manage tickets, and monitor customer activity through a dedicated dashboard.

## 🚀 Features

### 👤 User Features
- User Registration and Login
- Secure Authentication using JWT
- Browse Available Shops
- Search Shops using Algolia
- View Shop Details and Information
- Book Tickets Online
- Check Shop Opening and Closing Status
- View Booking History
- Receive Notifications
- Manage User Profile

### 🏪 Shop Owner Features
- Create and Manage Shops
- Upload Shop Images using Cloudinary
- Shop Dashboard
- Manage Shop Opening and Closing Times
- Manage Customer Tickets
- View Booking Information
- Manage Shop Notifications
- Track Shop Activity

### 🔐 Security Features
- JWT Authentication
- HTTP-Only Cookies
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Access Control
- Secure API Requests

## 🛠️ Tech Stack

### Frontend
- Next.js
- React.js
- JavaScript
- Tailwind CSS
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Multer

### Cloud & Services
- Cloudinary – Image Storage
- Algolia – Search Functionality
- MongoDB Atlas – Database

## 📁 Project Structure

```text
Turn/
│
├── Frontend/
│   ├── app/
│   ├── components/
│   ├── context/
│   ├── services/
│   ├── public/
│   └── package.json
│
└── Backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── services/
    ├── config/
    ├── uploads/
    ├── server.js
    └── package.json

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside the Backend folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

ALGOLIA_APP_ID=your_algolia_app_id
ALGOLIA_ADMIN_API_KEY=your_algolia_admin_key
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd Frontend
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open your browser:

```text
http://localhost:3000
```

## 🔄 Application Workflow

1. Users register and log in.
2. Users browse available shops.
3. Users select a shop and check its availability.
4. Users book tickets when the shop is open.
5. Shop owners manage bookings through their dashboard.
6. Users receive notifications and track their tickets.

## 🌐 Environment Variables

Never upload your `.env` or `.env.local` files to GitHub.

Make sure to add them to `.gitignore`.

```gitignore
node_modules/
.env
.env.local
.next/
dist/
```

## 🔮 Future Improvements

- Online Payment Integration
- Real-Time Ticket Updates
- Advanced Analytics Dashboard
- Email and SMS Notifications
- QR Code-Based Ticket Verification
- Customer Feedback and Reviews

## 👨‍💻 Developer

Developed as a full-stack web development project using Next.js, Node.js, Express.js, and MongoDB.

---

**Turn – Making Shop Visits Smarter and Queue Management Easier.**
