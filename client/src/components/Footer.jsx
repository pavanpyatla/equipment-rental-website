import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com"
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 dark:text-slate-400 pt-24 border-t border-transparent dark:border-slate-800 transition-colors duration-300">

      {/* TOP GRID */}
      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/" className="hover:text-amber-500 transition cursor-pointer">Home</Link></li>
            <li><Link to="/about" className="hover:text-amber-500 transition cursor-pointer">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-amber-500 transition cursor-pointer">Contact</Link></li>
            <li><a href="#faqs" className="hover:text-amber-500 transition cursor-pointer">FAQs</a></li>
            <li><a href="#support" className="hover:text-amber-500 transition cursor-pointer">Support</a></li>
          </ul>
        </div>

        {/* Rentals */}
        <div>
          <h4 className="text-white font-semibold mb-6">Rentals</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/equipment" className="hover:text-amber-500 transition cursor-pointer">Rent Equipment</Link></li>
            <li><Link to="/equipment" className="hover:text-amber-500 transition cursor-pointer">Post Rental Request</Link></li>
            <li><Link to="/services" className="hover:text-amber-500 transition cursor-pointer">Browse Equipment</Link></li>
            <li><Link to="/services" className="hover:text-amber-500 transition cursor-pointer">Hire Operator</Link></li>
          </ul>
        </div>

        {/* For Contractors */}
        <div>
          <h4 className="text-white font-semibold mb-6">For Contractors</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/equipment" className="hover:text-amber-500 transition cursor-pointer">Request Equipment</Link></li>
            <li><Link to="/compare-prices" className="hover:text-amber-500 transition cursor-pointer">Compare Prices</Link></li>
            <li><Link to="/track-orders" className="hover:text-amber-500 transition cursor-pointer">Track Orders</Link></li>
          </ul>
        </div>

        {/* For Vendors */}
        <div>
          <h4 className="text-white font-semibold mb-6">For Vendors</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#list-equipment" className="hover:text-amber-500 transition cursor-pointer">List Equipment</a></li>
            <li><a href="#rental-requests" className="hover:text-amber-500 transition cursor-pointer">Rental Requests</a></li>
            <li><Link to="/contact" className="hover:text-amber-500 transition cursor-pointer">Vendor Support</Link></li>
          </ul>
        </div>

      </div>

      {/* CENTER LOGO */}
      <div className="flex justify-center mt-24 mb-10">
        <Link to="/">
          <h2 className="text-white text-3xl font-bold tracking-wide hover:opacity-80 transition cursor-pointer">
            Rent<span className="text-amber-500">Equip</span>
          </h2>
        </Link>
      </div>

      {/* SOCIAL LINE */}
      <div className="flex items-center justify-center gap-8 text-slate-400 mb-10">
        <span className="h-px w-24 bg-slate-600"></span>
        <a
          href={socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber-500 transition cursor-pointer"
        >
          Facebook
        </a>
        <a
          href={socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber-500 transition cursor-pointer"
        >
          Instagram
        </a>
        <a
          href={socialLinks.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber-500 transition cursor-pointer"
        >
          YouTube
        </a>
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber-500 transition cursor-pointer"
        >
          LinkedIn
        </a>
        <span className="h-px w-24 bg-slate-600"></span>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-sm text-slate-400 pb-10">
        © {currentYear} Unknown Pvt. Ltd. &nbsp;|&nbsp;
        <a href="#privacy" className="hover:text-amber-500 transition cursor-pointer">Privacy Policy</a> &nbsp;|&nbsp;
        <a href="#terms" className="hover:text-amber-500 transition cursor-pointer">Terms & Conditions</a>
      </div>

    </footer>
  );
}
