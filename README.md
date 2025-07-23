## 1. 📌 Project Overview

**Purpose:**  
This MERN website is a comprehensive mobile phone information and comparison platform for users in Pakistan. It allows users to browse, compare, and review mobile phones, read news, manage favorites, and interact with the site through features like login/signup, admin panel, and chatbot.

**Key Features & User-Facing Functionalities:**
- User authentication (signup, login, Google login planned)
- Browse phones by price sections
- Product comparison
- News/blog section with professional detail pages
- Reviews section with professional detail pages
- Favorites management
- Admin panel for managing products, news, and reviews
- Contact, About, Privacy Policy, Careers, Terms, Warranty Check, Block Stolen Phone, etc.
- Floating chatbot for user assistance

---

## 2. 📁 Folder Structure

**Top-Level:**
```
/client      # React frontend
/backend     # Express/MongoDB backend
```

**Frontend (client):**
- `src/pages/` – All main page components (e.g., Home, Login, Signup, News, Review, etc.)
- `src/components/` – Reusable UI components (e.g., Header, Footer, Card, Banner, FloatingChatbot, etc.)
- `src/context/` – React Context for authentication (AuthContext.jsx)
- `src/assets/` – Static assets (images, icons, etc.)
- `public/` – Public static files

**Backend (backend):**
- `controllers/` – Express route controllers (news, review, user, product)
- `models/` – Mongoose models (User, Product, News, Review)
- `routes/` – Express route definitions (newsRoutes, reviewRoutes, userRoutes, etc.)
- index.js – Main Express server entry point

---

## 3. 📦 Frontend Stack

- **React** (functional components, hooks)
- **React Router** (`react-router-dom`) for client-side routing
- **Axios** for HTTP requests to backend API
- **Context API** (AuthContext.jsx) for authentication state
- **CSS Modules/Files** for styling (e.g., `News.css`, `Review.css`)
- **Vite** for fast development/build

**Routing Setup:**
- All routes defined in App.jsx using `<Routes>` and `<Route>`.
- Dynamic routes for product sections, news details, review details, etc.

**State Management:**
- Mostly via `useState` and `useEffect`
- Authentication state via React Context (`AuthContext`)

---

## 4. 🔒 Authentication

- **Login/Signup system:** Yes (email/password, with Google login planned)
- **How handled:**  
  - User data stored in MongoDB
  - On login/signup, user info is stored in `localStorage` and React Context
  - Auth state managed via AuthContext.jsx
- **Protected pages:**  
  - Admin-only actions (add/update/delete news/reviews/products) are protected on the frontend (based on user role) and should be protected on the backend as well.
  - Account management, favorites, etc., require login.

---

## 5. 📡 API Integration

- **Backend endpoints:**  
  - `/api/products` – Product data
  - `/api/news` – News CRUD and detail
  - `/api/reviews` – Review CRUD and detail
  - `/api/users` – Signup, login, user info, favorites, etc.
- **Data sent/received:**  
  - JSON payloads for all requests/responses
  - Error handling via try/catch and error messages in responses
- **Error Handling:**  
  - Errors are caught and returned as JSON with status codes
  - Frontend displays error messages as needed

---

## 6. 🧾 Pages and Components

**Pages (`src/pages/`):**
- **Home:** Landing page
- **Login:** User login form
- **Signup:** User registration form
- **Account:** User profile and settings
- **AdminPanel:** Admin dashboard for managing content
- **SectionProducts:** Browse products by price section (dynamic route)
- **ComparePage:** Compare selected products
- **News:** Blog/news listing with pagination and admin controls
- **NewsDetail:** Full news article view (dynamic route)
- **Review:** Reviews listing with pagination and admin controls
- **ReviewDetail:** Full review view (dynamic route)
- **FavorateProduct:** User's favorite products
- **Blockphone:** Instructions for blocking a stolen phone
- **ContactUs:** Contact form/info
- **PrivacyPolicy:** Privacy policy page
- **Careers:** Careers/jobs page
- **TermCondition:** Terms and conditions
- **WarrantyCheck:** Warranty check tool
- **AboutUs:** About the website/company

**Components (`src/components/`):**
- **Header/Footer:** Site navigation and footer
- **Card:** Product card
- **Banner:** Promotional or informational banner
- **FloatingChatbot:** Chatbot for user help
- **NewsCard/ReviewCard:** (Recommended) For professional card display in News/Review sections

**Dynamic Pages/Props:**
- `SectionProducts` uses `sectionKey` param for filtering
- `NewsDetail` and `ReviewDetail` use `:id` param for fetching single item

---

## 7. 📁 Backend Summary

- **Express server** (index.js)
- **MongoDB** via Mongoose for all data (users, products, news, reviews)
- **Routes:**
  - `/api/products` – Product CRUD
  - `/api/news` – News CRUD, get all, get by ID
  - `/api/reviews` – Review CRUD, get all, get by ID
  - `/api/users` – Signup, login, get/update/delete user, manage favorites
- **Connection:**  
  - MongoDB URI from `.env`
  - Server starts after successful DB connection

---

## 8. 🛠️ Local Setup and Running

**1. Clone the repository**

**2. Install dependencies:**
```sh
cd backend
npm install
cd ../client
npm install
```

**3. Setup environment variables:**
- Create `.env` in backend with at least:
  ```
  MONGO_URI=your_mongodb_connection_string
  PORT=5000
  ```

**4. Start backend:**
```sh
cd backend
npm start
```

**5. Start frontend:**
```sh
cd client
npm run dev
```

**6. Open in browser:**  
Visit [http://localhost:5173](http://localhost:5173) (or the port Vite shows) for the frontend.  
Backend runs on [http://localhost:5000](http://localhost:5000) by default.

---

**Note:**  
- For Google login, further setup is required (see earlier instructions).
- Admin features are visible only to users with the `admin` role.
- All API endpoints are prefixed with `/api/`.

---

**This documentation provides a full technical summary for developers and maintainers of your MERN stack website.**