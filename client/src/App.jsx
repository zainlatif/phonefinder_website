// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import Header from './components/Header';
import AdminPanel from './pages/AdminPanel';
import SectionProducts from "./pages/SectionProducts";
import ComparePage from "./pages/ComparePage";
import News from './pages/News';
import Review from './pages/Review';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/section/:sectionKey" element={<SectionProducts />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/news" element={<News />} />
        <Route path="/reviews" element={<Review />} />
      </Routes>
    </Router>
  );
}

export default App;
