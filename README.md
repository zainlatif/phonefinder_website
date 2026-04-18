# Phone Finder Website

A comprehensive MERN stack mobile phone information and comparison platform tailored for users in Pakistan. This website integrates a machine learning model for enhanced phone recommendations and features.

## 🚀 Features

### User-Facing Functionalities
- **User Authentication**: Signup, login, and Google login (planned)
- **Phone Browsing**: Browse phones by price sections
- **Product Comparison**: Compare multiple phones side-by-side
- **News & Blog**: Professional news section with detailed pages
- **Reviews**: User reviews with detailed review pages
- **Favorites Management**: Save favorite products
- **Admin Panel**: Manage products, news, and reviews
- **Additional Pages**: Contact, About Us, Privacy Policy, Careers, Terms & Conditions, Warranty Check, Block Stolen Phone
- **Floating Chatbot**: AI-powered assistance for users
- **Machine Learning Integration**: AI model for personalized phone recommendations

### Technical Features
- Responsive design for mobile and desktop
- Real-time data updates
- Secure authentication and data handling
- Admin controls for content management

## 🛠️ Tech Stack

### Frontend
- **React** (functional components with hooks)
- **React Router** for client-side routing
- **Axios** for API communication
- **Context API** for state management (authentication)
- **CSS Modules** for styling
- **Vite** for development and build

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose for data modeling
- **JWT** for authentication
- **bcrypt** for password hashing

### Machine Learning Model
- **Python** with machine learning libraries
- **Waitress** API server for model serving
- Connected to MERN stack via REST API

## 📁 Project Structure

```
phonefinder_website/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Main page components
│   │   ├── context/        # React Context (Auth)
│   │   ├── assets/         # Static assets
│   │   └── ...
│   ├── public/             # Public static files
│   └── package.json
├── backend/                # Express backend
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── index.js            # Server entry point
│   └── package.json
└── README.md

phonefinderai-v6/           # Machine Learning Model (separate repo)
├── ...                     # Python ML code
└── ...                     # Waitress API server
```

## 🏗️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Python (v3.8 or higher)
- Git

### Installation

1. **Clone both repositories into the same parent folder:**
   ```bash
   mkdir phonefinder_project
   cd phonefinder_project
   git clone https://github.com/zainlatif/phonefinder_website.git
   git clone https://github.com/zainlatif/phonefinderai-v6.git
   ```

2. **Setup Backend:**
   ```bash
   cd phonefinder_website/backend
   npm install
   # Configure MongoDB connection in index.js
   npm start
   ```

3. **Setup Frontend:**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

4. **Setup Machine Learning Model:**
   ```bash
   cd ../../phonefinderai-v6
   # Follow setup instructions in phonefinderai-v6 README
   # Typically: pip install -r requirements.txt
   # python app.py  # or however the waitress server is started
   ```

### Environment Variables
Create `.env` files in backend and ML model directories as needed for database connections, API keys, etc.

## 🔗 API Integration

The MERN stack communicates with the machine learning model via REST API calls served by the Waitress server. The ML model provides personalized recommendations based on user preferences and phone data.

### Key Endpoints
- `/api/products` - Product management
- `/api/news` - News CRUD
- `/api/reviews` - Review management
- `/api/users` - User authentication and profiles
- `/api/recommendations` - ML-powered recommendations (from ML model)

## 🚀 Usage

1. Start the backend server
2. Start the frontend development server
3. Start the ML model API server
4. Access the website at `http://localhost:5173` (default Vite port)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For questions or support, please contact the development team.

**Developer:**
- **GitHub:** [zainlatif](https://github.com/zainlatif)
- **LinkedIn:** [zainlatif702](https://linkedin.com/in/zainlatif702)

---

**Note:** Keep both `phonefinder_website` and `phonefinderai-v6` repositories in the same parent folder for proper integration and API communication.
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