import './Footer.css';
import { FaYoutube, FaFacebookF, FaInstagram, FaTiktok, FaLinkedinIn } from "react-icons/fa";

const Footer = () => (
  <footer className="footer">
    <div className="footer-top">
      <div className="footer-col">
        <div className="footer-logo">
          <img src="/logo192.png" alt="Priceoye" style={{ height: 38, marginBottom: 8 }} />
          <span className="footer-brand">Price<span style={{ color: "#fff" }}>oye</span></span>
        </div>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">FAQs</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Press & Blog</a></li>
          <li><a href="#">Terms & Condition</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <div className="footer-heading">Customer Service</div>
        <ul>
          <li><a href="#">Help Center</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Installments Plan</a></li>
          <li><a href="#">E-Warranty Activation</a></li>
          <li><a href="#">Sell on Priceoye</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <div className="footer-heading">Secure Payments Methods</div>
        <div className="footer-payments">
          <img src="https://seeklogo.com/images/1link-logo-6B8B2B9A2C-seeklogo.com.png" alt="1Link" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/HBL_logo.png" alt="HBL" />
          <img src="https://cdn-icons-png.flaticon.com/512/1042/1042330.png" alt="Cash on Delivery" />
        </div>
        <div className="footer-app">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="footer-copyright">
        Copyright © {new Date().getFullYear()} Priceoye.pk
      </div>
      <div className="footer-social">
        <a href="#"><FaYoutube /></a>
        <a href="#"><FaFacebookF /></a>
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaTiktok /></a>
        <a href="#"><FaLinkedinIn /></a>
      </div>
    </div>
    <div className="footer-desc">
      <p><strong>Infinix</strong> is one of the newer smartphone brands to be launched in Pakistan. They were absolutely unheard of before. They entered the local market in 2015 with the Hot Note, which was hyped for being priced at just Rs. 12,000 and having an outlandish octa-core processor. It was sold exclusively on Daraz. Since then, Infinix has grown to be one of the <a href="https://phoneprices.pk/">best Android mobile phone </a>brands for people on a budget. They offer decently powerful phones in a good looking package for a market-best price, usually under Rs. 20,000.</p>
      <p>Here at PriceOye, we believe Infinix should be on top of your list for phones priced under Rs. 20,000. As always, you’ll find the lowest Infinix phone prices on this page, and nowhere else, so keep visiting us to find the best deals like <a href="https://priceoye.pk/mobiles/infinix/infinix-note-30">Infinix Note 30</a> and Infinix Note 30 Pro</p>
    </div>
  </footer>
);

export default Footer;