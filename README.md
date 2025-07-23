
---

## 3. 💻 Frontend Stack

- **React** + **Vite**
- **React Router** (`react-router-dom`)
- **Axios** for HTTP calls
- **Context API** for auth state
- **CSS Files / Modules** for styling

---

## 4. 🔒 Authentication

- **Login/Signup:** via email & password
- **Planned:** Google OAuth
- User role-based access (admin/user)
- Auth token and user info stored in `localStorage` + React Context

---

## 5. 🧠 AI Chatbot Integration

- Uses a separate **Flask backend** with a trained ML model
- Handles natural language queries like:
  - “Best gaming phone under 1 lakh”
  - “Top camera phone under 80k”
- Frontend sends queries to `/predict` endpoint and shows results inside the chatbot

---

## 6. 📡 Backend API

- REST API built with **Express.js**
- **MongoDB + Mongoose**
- **Endpoints:**
  - `/api/products` – Phone data
  - `/api/news` – News CRUD
  - `/api/reviews` – Reviews CRUD
  - `/api/users` – Auth, user info, favorites

---

## 7. 🧾 Key Pages & Components

- `Home`, `Login`, `Signup`, `Account`
- `ComparePage`, `SectionProducts`
- `News`, `NewsDetail`, `Review`, `ReviewDetail`
- `Favorites`, `AdminPanel`, `ContactUs`, `AboutUs`, `Careers`, etc.
- UI Components: `Header`, `Footer`, `Card`, `Banner`, `FloatingChatbot`

---

## 8. 🚀 How to Run Locally

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/your-repo-name.git