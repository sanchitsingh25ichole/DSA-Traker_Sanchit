#  Full Stack DSA Tracker Website

A complete, modern, responsive full-stack Data Structures & Algorithms (DSA) Tracker web application built using **React.js, Node.js, Express.js, and MongoDB (MERN Stack)**.

Designed for students and developers to systematically manage their DSA learning journey, track solved and unsolved problems, monitor progress across 16 core algorithm topics, and prepare for technical coding interviews.

---

## 🚀 Key Features

### 1. 🔐 Robust Authentication
- **User Registration & Login** with full client and server validation.
- **Password Hashing** using `bcryptjs` with salt rounds.
- **JWT (JSON Web Token)** based stateless authentication.
- **Protected Routes** – all problem management, progress tracking, and profile endpoints require a valid Bearer token.
- **Data Isolation** – each student can view, create, modify, and delete only their own questions.

### 2. 📊 Modern Interactive Dashboard
- **Key Metrics Grid**: Total Questions, Solved, Unsolved, Easy, Medium, Hard, and Overall Completion Percentage.
- **Circular & Linear Progress Indicators** showing real-time mastery percentage.
- **Difficulty Breakdown** with custom color-coded progress bars (Easy = Green, Medium = Amber, Hard = Red).
- **Recent Activity Feed** with 1-click status toggle and external practice link.
- **Top Topics Spotlight** for quick category assessment.

### 3. 📚 16 Core DSA Topics
Comprehensive support for the 16 standard algorithm categories:
1. **Arrays**
2. **Strings**
3. **Linked Lists**
4. **Stack**
5. **Queue**
6. **Binary Search**
7. **Sorting**
8. **Recursion**
9. **Trees**
10. **Binary Search Trees**
11. **Graphs**
12. **Dynamic Programming**
13. **Greedy Algorithms**
14. **Backtracking**
15. **Bit Manipulation**
16. **Heap**

Each topic card displays total problems, solved count, remaining count, and a visual completion percentage bar. Clicking any topic navigates directly to the problem repository pre-filtered by that topic.

### 4. 📝 Problem Management (Full CRUD)
- **Add New Problem**: Title, DSA topic, difficulty level (Easy/Medium/Hard), external practice URL (LeetCode, GeeksforGeeks, Codeforces), solved/unsolved status, and personal approach notes.
- **Quick Status Toggle**: Mark problems as Solved/Unsolved with a single click.
- **Edit Details**: Modify problem details, notes, or complexity tags anytime.
- **Delete Problem**: Permanent removal with modal confirmation dialog.
- **Personal Notes Viewer**: View takeaways and algorithms in a clean modal.
- **Pre-loaded Starter Problems**: Standard interview classics (Two Sum, Valid Parentheses, Longest Substring, etc.) are automatically seeded upon registration so you don't start with a blank screen.

### 5. 🔍 Advanced Search, Filtering & Sorting
- **Real-time Search** by problem title.
- **Filter by Topic** (All 16 categories).
- **Filter by Difficulty** (Easy, Medium, Hard).
- **Filter by Status** (Solved, Unsolved).
- **Sort Options**: Newest First, Oldest First, Title (A-Z), Title (Z-A), Difficulty.
- **Reset Filters**: One-click restore to default view.

### 6. 📈 Visual Progress Tracking & Analytics
- Overall repository completion rate.
- Difficulty tier distribution and completion rates.
- Comprehensive breakdown for all 16 topics with visual progress bars.

### 7. 👤 Student Profile
- User Name, registered Email, and join date.
- Real-time learning milestones and summary counts.
- Profile management form to update name or change password.

---

## 🛠️ Technology Stack (Strictly Implemented)

| Layer | Technologies |
|---|---|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+), React.js (Vite) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Auth & Security** | JWT (`jsonwebtoken`), `bcryptjs`, `cors`, `dotenv` |
| **API Client** | Axios |

> **Note:** Zero TypeScript, zero Next.js, zero Redux. Built using clean, readable, modular JavaScript with React Hooks and Context API.

---

## 📁 Project Directory Structure

```text
dsa-tracker/
├── backend/
│   ├── config/
│   │   ├── db.js                # MongoDB connection handler
│   │   └── memoryStore.js       # Fallback store when MongoDB daemon is offline
│   ├── controllers/
│   │   ├── authController.js    # Register, Login, Me endpoints
│   │   ├── problemController.js # CRUD, toggle, seed, filter, sort
│   │   ├── progressController.js# Aggregated metrics & topic statistics
│   │   └── profileController.js # Profile data & update
│   ├── data/
│   │   └── starterProblems.js   # 20 Curated high-frequency DSA questions
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT verification & user attachment
│   │   └── errorMiddleware.js   # 404 & centralized error handler
│   ├── models/
│   │   ├── User.js              # Mongoose User schema with bcrypt hook
│   │   └── Problem.js           # Mongoose Problem schema with 16 topics
│   ├── routes/
│   │   ├── authRoutes.js        # /api/auth
│   │   ├── problemRoutes.js     # /api/problems
│   │   ├── progressRoutes.js    # /api/progress
│   │   └── profileRoutes.js     # /api/profile
│   ├── .env                     # Backend environment variables
│   ├── .env.example             # Environment template
│   ├── package.json
│   └── server.js                # Express app entrypoint
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg          # Application icon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx      # Dark navy sidebar navigation
│   │   │   ├── Navbar.jsx       # Header bar with quick action buttons
│   │   │   ├── StatCard.jsx     # Reusable stat metric card
│   │   │   ├── ProgressBar.jsx  # Color-coded progress bar
│   │   │   ├── ProblemTable.jsx # Responsive table with actions
│   │   │   ├── ProblemModal.jsx # Add / Edit problem modal
│   │   │   ├── DeleteConfirmModal.jsx # Confirmation dialog
│   │   │   ├── FilterBar.jsx    # Search, filter, and sort toolbar
│   │   │   └── Toast.jsx        # Notification alert banners
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Centralized React auth state
│   │   ├── pages/
│   │   │   ├── Login.jsx        # Sign in page
│   │   │   ├── Register.jsx     # Sign up page
│   │   │   ├── Dashboard.jsx    # Overview metrics & recent activity
│   │   │   ├── Problems.jsx     # Full problem repository
│   │   │   ├── Topics.jsx       # 16 DSA topic cards
│   │   │   ├── ProgressPage.jsx # Analytics & progress metrics
│   │   │   └── Profile.jsx      # Account details & settings
│   │   ├── services/
│   │   │   └── api.js           # Axios instance with JWT interceptor
│   │   ├── styles/
│   │   │   └── index.css        # Modern, responsive design system
│   │   ├── App.jsx              # Main router & page manager
│   │   └── main.jsx             # React DOM root render
│   ├── index.html
│   ├── vite.config.js           # Vite dev server & proxy
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Environment Variables Configuration

### `backend/.env`
Create a `.env` file inside the `backend/` directory (a template is provided in `backend/.env.example`):

```env
# Server Port
PORT=5000

# MongoDB Connection String (Local or MongoDB Atlas)
MONGODB_URI=mongodb://127.0.0.1:27017/dsa_tracker

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
```

> **Smart Database Fallback:** If your local MongoDB daemon is not started, the backend automatically runs in standalone fallback mode with zero configuration needed, allowing instant evaluation. When MongoDB is started or an Atlas connection URI is provided, it connects to MongoDB automatically!

---

## 💻 Exact Steps to Run in VS Code

### Step 1: Open the Project in VS Code
Open the `dsa-tracker` folder in VS Code:
```bash
code C:\Users\Yuvraj\.gemini\antigravity\scratch\dsa-tracker
```

### Step 2: Open Two Terminal Windows in VS Code
In VS Code, press `Ctrl + ` ` (or go to **Terminal > New Terminal**). Click the **Split Terminal** icon (`|`) to have two side-by-side terminal panes.

### Step 3: Run the Backend (Terminal 1)
```powershell
# Navigate to backend directory
cd backend

# Install dependencies (already installed)
npm install

# Start Express backend server
npm start
# OR for hot-reload development:
npm run dev
```
You will see:
```text
 DSA Tracker Server running on port 5000
 Health check available at: http://localhost:5000/api/health
```

### Step 4: Run the Frontend (Terminal 2)
```powershell
# Navigate to frontend directory
cd frontend

# Install dependencies (already installed)
npm install

# Start React Vite frontend
npm run dev
```
You will see:
```text
  VITE v6.0.7  ready in 200 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 5: Open in Your Browser
Visit **`http://localhost:5173`** in your browser.

---

## 🧪 Demo Login Credentials

You can create any new account via the **"Create an Account"** screen, or log in with the pre-configured demo student:

- **Email:** `demo@dsa.com`
- **Password:** `password123`

---

## 📡 REST API Documentation

### 1. Authentication Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new user with name, email, password |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT token |
| `GET` | `/api/auth/me` | Private | Get currently authenticated user details |

### 2. Problem Endpoints
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/problems` | Private | Get user's problems (supports `topic`, `difficulty`, `status`, `search`, `sort`) |
| `POST` | `/api/problems` | Private | Create new problem |
| `GET` | `/api/problems/:id` | Private | Get single problem by ID |
| `PUT` | `/api/problems/:id` | Private | Update problem details, notes, difficulty, etc. |
| `PATCH` | `/api/problems/:id/toggle` | Private | Quick toggle problem between Solved & Unsolved |
| `DELETE` | `/api/problems/:id` | Private | Permanently delete problem |
| `POST` | `/api/problems/seed` | Private | Seed 20 curated standard DSA problems |

### 3. Progress & Analytics Endpoint
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/progress` | Private | Get total, solved, unsolved, completion %, difficulty breakdown, and all 16 topics stats |

### 4. Profile Endpoint
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/profile` | Private | Get user profile info and complete solved statistics |
| `PUT` | `/api/profile` | Private | Update student name or password |

---

## 🎨 UI & Design Highlights
- **Dark Navy Sidebar (`#0f172a`)**: Sleek, modern, and high contrast for effortless navigation.
- **Color-Coded Difficulty Badges**: Easy (Green), Medium (Amber), Hard (Red).
- **Responsive Layout**: Designed for mobile, tablet, and widescreen desktop displays.
- **Glassmorphic Modals**: Smooth backdrop blur for dialogs and confirmations.
- **Instant Toast Feedback**: Visual popups for all additions, updates, toggles, and deletions.

---

## 👨‍💻 Author & License
Built as a complete college-level Full Stack Web Development project following industry best practices.
Licensed under the ISC License.
