import './Footer.css';
import { FaYoutube, FaFacebookF, FaInstagram, FaTiktok, FaLinkedinIn } from "react-icons/fa";

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <div className="brand">
          
          <span className="brand-name">Phone<span className="highlight">Finder</span>.pk</span>
        </div>
        <ul className="links">
          <li><a href="#">About Us</a></li>
          <li><a href="#">FAQs</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Press & Blog</a></li>
          <li><a href="#">Terms & Conditions</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h3 className="section-title">Customer Service</h3>
        <ul className="links">
          <li><a href="#">Help Center</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Installment Plans</a></li>
          <li><a href="#">E-Warranty Activation</a></li>
          <li><a href="#">Sell on PhoneFinder</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h3 className="section-title">Secure Payment Methods</h3>
        <div className="payments">
          <img src="https://seeklogo.com/images/1link-logo-6B8B2B9A2C-seeklogo.com.png" alt="1Link" className="payment-img" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="payment-img" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/HBL_logo.png" alt="HBL" className="payment-img" />
          <img src="https://cdn-icons-png.flaticon.com/512/1042/1042330.png" alt="Cash on Delivery" className="payment-img" />
        </div>
        <div className="app-download">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="app-badge" />
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <div className="copyright">
        Copyright © {new Date().getFullYear()} PhoneFinder.pk
      </div>
      <div className="social">
        <a href="#" className="social-link"><FaYoutube /></a>
        <a href="#" className="social-link"><FaFacebookF /></a>
        <a href="#" className="social-link"><FaInstagram /></a>
        <a href="#" className="social-link"><FaTiktok /></a>
        <a href="#" className="social-link"><FaLinkedinIn /></a>
      </div>
    </div>
  </footer>
);

export default Footer;