# KidCapita - Money Smarts for the Next Generation

![KidCapita](https://img.shields.io/badge/Education-Financial%20Literacy-gold)
![Stack](https://img.shields.io/badge/Stack-MERN-blue)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green)

A comprehensive educational platform for teaching financial literacy to children ages 5-15 through a progressive 3-level curriculum.

## 🎯 Project Overview

**KidCapita** is a complete web application (frontend + backend + database) designed to deliver financial education to kids through:
- **3 Progressive Levels**: Ages 5-8, 9-12, and 13-15
- **150 Total Classes**: 50 classes per level, organized in 10 units each
- **Batch-Based Learning**: Small class sizes (5-10 students) for optimal engagement
- **Global Online Platform**: Accessible from anywhere in the world

### Key Features
✅ Complete 3-level financial literacy curriculum (pre-loaded)  
✅ Parent-friendly website with clear CTAs  
✅ Book a Demo and Contact forms with backend integration  
✅ Pricing in INR and BHD  
✅ Optional add-on programs (KidVestor, KidVentor)  
✅ Admin dashboard for batch management  
✅ Batch-based enrollment system  
✅ Mobile-responsive design  
✅ RESTful API with JWT authentication  

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

### Installation

1. **Clone the repository**
```bash
cd /Users/prarthanpaarth/Downloads/kidcapita/kidcapita
```

2. **Install all dependencies**
```bash
npm run install-all
```
This installs dependencies for both root and backend.

3. **Configure Environment**
```bash
# Create .env file in backend directory
cd backend
cp .env.example .env
cd ..

# Edit backend/.env with your settings if needed
```

Required `.env` variables (backend/.env):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/kidcapita
JWT_SECRET=your_super_secret_jwt_key_change_this
FRONTEND_URL=http://localhost:3000
```

4. **Seed the Database**
```bash
# This creates the 3-level curriculum, add-on programs, pricing, and admin user
npm run seed
```

5. **Start Everything with One Command!**
```bash
npm run dev
```

This single command starts:
- ✅ Backend API on `http://localhost:5000`
- ✅ Frontend website on `http://localhost:3000`

Both servers run concurrently with auto-reload!

### Alternative: Run Servers Separately

If you need to run them separately:
```bash
# Backend only
npm run backend-only

# Frontend only (in new terminal)
npm run frontend-only
```

---

## 📁 Project Structure

```
kidcapita/
├── backend/                    # Node.js + Express API
│   ├── config/
│   │   └── database.js        # MongoDB connection
│   ├── models/                # Mongoose models
│   │   ├── Level.js           # Curriculum levels
│   │   ├── Program.js         # Add-on programs
│   │   ├── Student.js         # Student records
│   │   ├── Batch.js           # Batch management
│   │   ├── Booking.js         # Demo bookings
│   │   ├── Pricing.js         # Pricing data
│   │   ├── ContactMessage.js  # Contact form submissions
│   │   └── User.js            # Admin/instructor users
│   ├── routes/                # API routes
│   │   ├── auth.js            # Authentication
│   │   ├── levels.js          # Curriculum endpoints
│   │   ├── programs.js        # Add-on programs
│   │   ├── pricing.js         # Pricing info
│   │   ├── bookings.js        # Demo bookings
│   │   ├── contact.js         # Contact messages
│   │   ├── students.js        # Student management
│   │   └── batches.js         # Batch management
│   ├── middleware/
│   │   └── auth.js            # JWT authentication
│   ├── seed/
│   │   ├── curriculumData.js  # EXACT 3-level curriculum
│   │   └── seedDatabase.js    # Database seeding script
│   ├── .env.example           # Environment template
│   ├── .gitignore
│   ├── package.json
│   ├── server.js              # Main server file
│   └── README.md              # Backend documentation
│
├── frontend/                   # Static website
│   ├── css/
│   │   └── style.css          # Brand colors & responsive design
│   ├── js/
│   │   └── main.js            # Frontend logic & API calls
│   ├── admin/
│   │   └── index.html         # Admin dashboard
│   ├── index.html             # Home page
│   ├── about.html             # About Us
│   ├── curriculum.html        # 3-level curriculum display
│   ├── pricing.html           # Pricing (INR & BHD)
│   ├── book-demo.html         # Demo booking form
│   ├── contact.html           # Contact form
│   └── programs.html          # Extra programs (KidVestor, KidVentor)
│
└── README.md                   # This file
```

---

## 🎨 Brand Guidelines

### Colors
- **Black** (`#000000`) - Base color, navbar, headers
- **Gold** (`#D4AF37`) - CTAs, highlights, accents
- **Silver** (`#C0C0C0`) - Borders, icons, secondary elements
- **Off-White** (`#F8F8F5`) - Section backgrounds

### Typography
- Font Family: System fonts (Apple, Segoe UI, Roboto, etc.)
- Playful yet professional tone
- Clear hierarchy with generous spacing

### Design Principles
- **Mobile-First**: Responsive on all devices
- **Sticky Navbar**: Always accessible navigation
- **Rounded Cards**: Modern, friendly appearance
- **Clear CTAs**: "Book a Demo" prominently featured

---

## 📚 Curriculum Structure

### Level 1 – Early Money Explorers (Ages 5-8)
**Goal**: Understand money basics and build saving/budgeting habits

**10 Units**:
1. What is Money?
2. Needs vs Wants
3. Saving & Spending
4. Earning Basics
5. Sharing & Kindness
6. Smart Shopping
7. Budgeting Fun
8. The World of Banks
9. My First Mini Business
10. Showcase & Reflection

### Level 2 – Smart Spenders (Ages 9-12)
**Goal**: Deepen budgeting, learn digital money, and explore entrepreneurship

**10 Units**:
1. Money Matters
2. Art of Budgeting
3. Value of Work
4. Power of Saving
5. Smart Shopping
6. Small Business Basics
7. Banking & Digital Money
8. Charity & Giving Back
9. Entrepreneurship & Ideas
10. Showcase & Reflection

### Level 3 – Teen Investors (Ages 13-15)
**Goal**: Real-world finance, investing, digital economy, leadership

**10 Units**:
1. Financial Foundations
2. Budgeting for Life
3. Banking Deep Dive
4. Intro to Investments
5. Entrepreneurship 101
6. Digital Economy
7. Taxes & Responsibility
8. Social Impact Finance
9. Leadership & Teamwork
10. Showcase & Graduation

> **Note**: This curriculum is FIXED and should not be modified without authorization. All data is stored in `backend/seed/curriculumData.js`.

---

## 💰 Pricing

### Core Levels
| Level | Age Group | Classes | Price (INR) | Price (BHD) |
|-------|-----------|---------|-------------|-------------|
| Level 1 | Ages 5-8 | 50 | ₹25,000 | 120 BHD |
| Level 2 | Ages 9-12 | 50 | ₹28,000 | 135 BHD |
| Level 3 | Ages 13-15 | 50 | ₹32,000 | 150 BHD |

### Optional Add-Ons
| Program | Description | Price (INR) | Price (BHD) |
|---------|-------------|-------------|-------------|
| KidVestor | Advanced investing concepts | ₹10,000 | 50 BHD |
| KidVentor | Entrepreneurship & maker | ₹10,000 | 50 BHD |

> **Important**: Add-ons are **optional** and **NOT part of** the core curriculum.

---

## 🔐 Admin Access

After seeding the database, use these credentials:

**Email**: `admin@kidcapita.com`  
**Password**: `admin123`

**Admin Dashboard**: `http://localhost:3000/admin/`

### Admin Features
- View all demo bookings
- Manage enrolled students
- Create and manage batches
- Assign students to batches
- View contact messages
- Track statistics

⚠️ **Change these credentials in production!**

---

## 🌐 API Endpoints

### Public Endpoints

```
GET  /api/health                 - Health check
GET  /api/levels/public          - Get all 3 levels with curriculum
GET  /api/programs/public        - Get optional add-on programs
GET  /api/pricing                - Get pricing (INR + BHD)
POST /api/bookings               - Submit demo booking
POST /api/contact                - Submit contact message
```

### Authentication

```
POST /api/auth/register          - Register new user
POST /api/auth/login             - Login (returns JWT token)
GET  /api/auth/me                - Get current user (requires token)
```

### Admin Endpoints (Requires JWT Token)

```
# Students
GET  /api/students               - Get all students
POST /api/students               - Create student

# Batches
GET  /api/batches                - Get all batches
POST /api/batches                - Create batch
PUT  /api/batches/:id/assign-students  - Assign students to batch

# Bookings & Messages
GET  /api/bookings               - Get all bookings
PUT  /api/bookings/:id           - Update booking status
GET  /api/contact                - Get all messages
PUT  /api/contact/:id            - Update message status
```

**Authentication Header**:
```
Authorization: Bearer <jwt_token>
```

---

## 🎯 Business Logic

### Batch-Based Enrollment

**Key Concept**: Students enroll in a month, but start when a batch forms.

**Example Flow**:
1. **January**: Student A enrolls in Level 2 (status: `pending`)
2. **February**: Students B, C, D, E enroll in Level 2
3. **March**: Admin creates batch with 5 students, all start together (status: `active`)

**Benefits**:
- Ensures optimal class sizes (5-10 students)
- Peer learning with similar-aged students
- Flexible enrollment year-round
- Parents know when classes actually begin

### Age-Based Level Assignment

The system automatically recommends levels based on age:
- **5-8 years** → Level 1
- **9-12 years** → Level 2  
- **13-15 years** → Level 3

---

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs for password hashing
- **Logging**: Morgan
- **Environment**: dotenv
- **CORS**: cors middleware

### Frontend
- **HTML5** with semantic markup
- **CSS3** with CSS Grid, Flexbox, custom properties
- **Vanilla JavaScript** (ES6+)
- **Fetch API** for backend communication
- **Mobile-First** responsive design

---

## 📊 Database Models

### Level
```javascript
{
  name: String,
  slug: String,
  ageRange: String,
  description: String,
  totalClasses: Number (50),
  units: [{
    title: String,
    classFocus: [String],
    sampleActivity: String,
    keyOutcome: String
  }],
  active: Boolean
}
```

### Student
```javascript
{
  firstName, lastName, age,
  parentEmail, parentPhone,
  level: ObjectId → Level,
  extraPrograms: [ObjectId → Program],
  batch: ObjectId → Batch,
  joinedMonth, joinedYear,
  status: 'pending' | 'active' | 'completed'
}
```

### Batch
```javascript
{
  level: ObjectId → Level,
  month, year, startDate,
  dayOfWeek, timeSlot,
  minStudents: 5,
  maxStudents: 10,
  students: [ObjectId → Student],
  status: 'forming' | 'active' | 'completed'
}
```

---

## 🔧 Development

### Running in Development Mode

**Backend**:
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

**Frontend**:
Use any local server (Python, http-server, Live Server, etc.)

### Testing API Endpoints

Use tools like:
- **Postman**
- **Thunder Client** (VS Code extension)
- **curl** command line

Example:
```bash
# Get curriculum
curl http://localhost:5000/api/levels/public

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@kidcapita.com","password":"admin123"}'
```

### Re-seeding Database

If you need to reset data:
```bash
cd backend
npm run seed
```

This will:
1. Clear existing data
2. Re-create 3 levels with exact curriculum
3. Create KidVestor and KidVentor programs
4. Set up pricing
5. Create admin user

---

## 📱 Pages Overview

### Public Pages

1. **Home** (`index.html`)
   - Hero section with tagline
   - Why KidCapita features
   - 3-level overview cards
   - How It Works steps
   - CTA sections

2. **About Us** (`about.html`)
   - Mission statement
   - Why financial literacy matters
   - What makes KidCapita different
   - Core values

3. **Curriculum** (`curriculum.html`)
   - 3 accordion sections (one per level)
   - Dynamic content loaded from API
   - 10 units per level with full details
   - Class focus, activities, outcomes

4. **Pricing** (`pricing.html`)
   - 3 pricing cards for levels
   - 2 add-on program cards
   - INR and BHD pricing
   - What's included section
   - Batch system explanation

5. **Book a Demo** (`book-demo.html`)
   - Comprehensive booking form
   - Parent and child information
   - Level selection (auto-suggested by age)
   - Optional add-ons checkboxes
   - Backend integration

6. **Contact** (`contact.html`)
   - Contact form with subject dropdown
   - Contact information display
   - FAQ section
   - Backend integration

7. **Extra Programs** (`programs.html`)
   - KidVestor and KidVentor details
   - Clear labeling as optional add-ons
   - Core vs Add-ons comparison
   - Who should consider add-ons

### Admin Pages

8. **Admin Dashboard** (`admin/index.html`)
   - Login with JWT authentication
   - Statistics dashboard
   - Bookings management
   - Students list
   - Batches overview
   - Contact messages

---

## 🌍 Deployment

### Backend Deployment (e.g., Heroku, Railway, Render)

1. Set environment variables in hosting platform
2. Ensure MongoDB connection string is set
3. Run seed script after first deployment
4. Deploy from `backend` directory

### Frontend Deployment (e.g., Netlify, Vercel, GitHub Pages)

1. Update `API_URL` in `frontend/js/main.js` to production backend URL
2. Deploy `frontend` directory
3. Configure redirects if needed

### MongoDB

**Options**:
- **MongoDB Atlas** (recommended for cloud)
- Self-hosted MongoDB
- MongoDB on VPS

---

## 📝 Customization Guide

### Updating Curriculum

The curriculum is in `backend/seed/curriculumData.js`. To update:

1. Edit the file with new content
2. Run `npm run seed` to update database
3. Curriculum appears automatically on frontend

### Changing Brand Colors

Update CSS variables in `frontend/css/style.css`:
```css
:root {
  --black: #000000;
  --gold: #D4AF37;
  --silver: #C0C0C0;
  --offwhite: #F8F8F5;
}
```

### Adding New Pages

1. Create HTML file in `frontend/`
2. Include navbar and footer from existing pages
3. Link in navigation menu
4. Add corresponding backend routes if needed

---

## 🤝 Contributing

This is a custom educational platform. For modifications:

1. **Curriculum Changes**: Require authorization
2. **Bug Fixes**: Test thoroughly before deploying
3. **New Features**: Maintain brand consistency
4. **Code Style**: Follow existing patterns

---

## 📄 License

Copyright © 2025 KidCapita. All rights reserved.

This is a proprietary educational platform. Unauthorized use, reproduction, or distribution is prohibited.

---

## 🆘 Support & Contact

- **Email**: info@kidcapita.com
- **Support**: support@kidcapita.com
- **Partnerships**: partnerships@kidcapita.com

---

## 🎉 Features Checklist

- [x] Complete backend API with Node.js + Express + MongoDB
- [x] 8 Mongoose models (Level, Program, Student, Batch, etc.)
- [x] JWT authentication with protected routes
- [x] 3-level curriculum with exact content (30 units, 150 classes)
- [x] Database seeding with curriculum data
- [x] Public API endpoints for curriculum, pricing, programs
- [x] Home page with hero section and CTAs
- [x] About Us page
- [x] Curriculum page with accordion display
- [x] Pricing page with INR and BHD
- [x] Book a Demo page with backend integration
- [x] Contact page with backend integration
- [x] Extra Programs page (KidVestor, KidVentor)
- [x] Admin dashboard for batch management
- [x] Mobile-responsive design
- [x] Sticky navigation bar
- [x] Brand colors throughout
- [x] Batch-based enrollment system
- [x] Age-based level recommendations
- [x] Form validation and error handling
- [x] Success/error messages on forms
- [x] Clear separation of core curriculum and add-ons

---

## 🚀 Next Steps

1. **Set up MongoDB** (local or Atlas)
2. **Run `npm install`** in backend directory
3. **Create `.env`** file with your configuration
4. **Run `npm run seed`** to populate database
5. **Start backend** with `npm run dev`
6. **Open frontend** with local server
7. **Visit** `http://localhost:3000`
8. **Test booking** and contact forms
9. **Login to admin** at `/admin/` with default credentials
10. **Explore** all pages and functionality

---

**KidCapita** - Building financial confidence in the next generation! 🎓✨

For questions or support, refer to the documentation in each directory or contact the development team.
