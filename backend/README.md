# KidCapita Backend API

## 🎓 Money Smarts for the Next Generation

Backend API for KidCapita - A comprehensive financial literacy education platform for children ages 5-15.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/kidcapita
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
FRONTEND_URL=http://localhost:3000
```

4. Seed the database with curriculum:
```bash
npm run seed
```

5. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## 📚 API Documentation

### Public Routes

#### Health Check
```
GET /api/health
```

#### Curriculum
```
GET /api/levels/public
```
Returns all 3 levels with their 10 units each (for Curriculum page)

#### Programs
```
GET /api/programs/public
```
Returns optional add-on programs (KidVestor, KidVentor)

#### Pricing
```
GET /api/pricing
```
Returns pricing in INR and BHD for all levels and programs

#### Book a Demo
```
POST /api/bookings
Body: {
  parentName, parentEmail, parentPhone,
  childName, childAge, chosenLevel,
  chosenAddOns[], preferredMonth, message
}
```

#### Contact
```
POST /api/contact
Body: { name, email, phone, subject, message }
```

### Authentication Routes

#### Register
```
POST /api/auth/register
Body: { name, email, password, role }
```

#### Login
```
POST /api/auth/login
Body: { email, password }
```

#### Get Current User
```
GET /api/auth/me
Headers: Authorization: Bearer <token>
```

### Admin Routes (Protected)

All admin routes require authentication header:
```
Authorization: Bearer <jwt_token>
```

#### Students
```
GET    /api/students          - Get all students
POST   /api/students          - Create student
PUT    /api/students/:id      - Update student
```

#### Batches
```
GET    /api/batches                        - Get all batches
POST   /api/batches                        - Create batch
PUT    /api/batches/:id                    - Update batch
PUT    /api/batches/:id/assign-students    - Assign students to batch
```

#### Levels (Curriculum Management)
```
GET    /api/levels          - Get all levels
POST   /api/levels          - Create level
PUT    /api/levels/:id      - Update level
DELETE /api/levels/:id      - Delete level
```

#### Programs
```
GET    /api/programs        - Get all programs
POST   /api/programs        - Create program
PUT    /api/programs/:id    - Update program
```

#### Bookings & Messages
```
GET    /api/bookings        - Get all bookings
PUT    /api/bookings/:id    - Update booking status

GET    /api/contact         - Get all contact messages
PUT    /api/contact/:id     - Update message status
```

## 📊 Database Models

### Level
- 3 levels (Ages 5-8, 9-12, 13-15)
- Each level has 10 units
- Each unit includes: title, classFocus[], sampleActivity, keyOutcome
- Total of 50 classes per level

### Program
- Optional add-ons (KidVestor, KidVentor)
- Not part of core curriculum
- Separate pricing

### Student
- Auto-assigns level based on age (5-8→L1, 9-13→L2, 13-15→L3)
- Tracks enrollment month vs batch start month
- Status: pending → active → completed

### Batch
- Min 5, max 10 students
- Can combine students from different enrollment months
- Status: forming → active → completed

### Booking
- Demo requests from website
- Tracks interest before enrollment

### ContactMessage
- General inquiries from website

### Pricing
- Stores INR and BHD pricing
- Linked to levels and programs

### User
- Roles: admin, instructor, parent
- JWT authentication

## 🔐 Default Admin Credentials

After seeding the database:
- Email: `admin@kidcapita.com`
- Password: `admin123`

**⚠️ Change these credentials in production!**

## 🎨 Core Business Logic

### Batch-Based Enrollment
Students can join in January but start in March when minimum 5 students are enrolled for that level. This allows flexible enrollment while maintaining optimal class sizes.

### Age-Based Level Assignment
- Ages 5-8: Level 1 (Early Money Explorers)
- Ages 9-12/13: Level 2 (Smart Spenders)
- Ages 13-15: Level 3 (Teen Investors)

### Pricing Structure
- Level 1: ₹25,000 / 120 BHD (50 classes)
- Level 2: ₹28,000 / 135 BHD (50 classes)
- Level 3: ₹32,000 / 150 BHD (50 classes)
- KidVestor: ₹10,000 / 50 BHD (optional add-on)
- KidVentor: ₹10,000 / 50 BHD (optional add-on)

## 📝 Curriculum Content

The curriculum is **fixed and should not be modified** without authorization. It consists of:

- **Level 1**: Foundation money skills (saving, spending, needs vs wants)
- **Level 2**: Applied money skills (budgeting, digital money, small business)
- **Level 3**: Real-world finance (investing, taxes, entrepreneurship)

All curriculum data is stored in `/seed/curriculumData.js`

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs for password hashing
- **Logging**: Morgan
- **Environment**: dotenv
- **CORS**: cors middleware

## 📦 NPM Scripts

```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
npm run seed     # Seed database with curriculum
```

## 🌍 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment mode | development |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/kidcapita |
| JWT_SECRET | Secret for JWT tokens | (must set) |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:3000 |

## 🔄 Development Workflow

1. Make changes to models/routes
2. Test endpoints with Postman/Thunder Client
3. Update seed data if needed
4. Re-run `npm run seed` to refresh database
5. Test with frontend

## 📞 Support

For questions or issues, contact the KidCapita team.

---

**KidCapita** - Money Smarts for the Next Generation 🎓✨

