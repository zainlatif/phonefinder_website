import { FaYoutube, FaFacebookF, FaInstagram, FaTiktok, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="mt-auto w-full border-t border-orange-100 bg-white text-slate-600">
    <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <div className="mb-5">
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Phone<span className="text-orange-600">Finder</span><span className="text-slate-400">.pk</span>
          </span>
        </div>
        <p className="max-w-xs text-sm leading-6 text-slate-500">
          Your guide to phone specifications, prices, comparisons, news, and reviews.
        </p>
        <ul className="mt-6 space-y-3 text-sm">
          <li><Link className="transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" to="/news">News</Link></li>
          <li><Link className="transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" to="/reviews">Reviews</Link></li>
          <li><Link className="transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" to="/aboutus">About Us</Link></li>
          <li><Link className="transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" to="/contactus">Contact Us</Link></li>
          <li><Link className="transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" to="/termcondition">Terms & Conditions</Link></li>
        </ul>
      </div>

      <div>
        <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-slate-900">Customer Service</h3>
        <ul className="space-y-3 text-sm">
          <li><Link className="transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" to="/privacypolicy">Privacy Policy</Link></li>
          <li><Link className="transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" to="/careers">Careers</Link></li>
          <li><Link className="transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" to="/warrantycheck">E-Warranty Activation</Link></li>
          <li><Link className="transition-colors hover:text-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" to="/blockphone">Stolen Phone</Link></li>
        </ul>
      </div>
    </div>

    <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-5 border-t border-slate-200 px-5 py-6 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left lg:px-8">
      <div className="text-sm text-slate-500">
        Copyright © {new Date().getFullYear()} PhoneFinder.pk
      </div>
      <div className="flex gap-2">
        <a href="#" aria-label="YouTube" className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"><FaYoutube /></a>
        <a href="#" aria-label="Facebook" className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"><FaFacebookF /></a>
        <a href="#" aria-label="Instagram" className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"><FaInstagram /></a>
        <a href="#" aria-label="TikTok" className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"><FaTiktok /></a>
        <a href="#" aria-label="LinkedIn" className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-orange-500 hover:bg-orange-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"><FaLinkedinIn /></a>
      </div>
    </div>
  </footer>
);

export default Footer;
