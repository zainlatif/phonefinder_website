// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import AdminPanel from './pages/AdminPanel';
import SectionProducts from "./pages/SectionProducts";
import ComparePage from "./pages/ComparePage";
import News from './pages/News';
import Review from './pages/Review';
import FavorateProduct from './pages/FavorateProduct';
import Blockphone from './pages/Blockphone';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Careers from "./pages/Careers";
import TermCondition from "./pages/TermCondition";
import WarrantyCheck from './pages/WarrantyCheck'; // ✅ Fixed import path

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingChatbot from './components/FloatingChatbot';
import AboutUs from "./pages/AboutUs";

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
        <Route path="/favourites" element={<FavorateProduct />} />
        <Route path="/blockphone" element={<Blockphone />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/termcondition" element={<TermCondition />} />
        <Route path="/warrantycheck" element={<WarrantyCheck />} />
        <Route path="/aboutus" element={<AboutUs />} />
        
      </Routes>
      <Footer />
      <FloatingChatbot />
    </Router>
  );
}

export default App;
