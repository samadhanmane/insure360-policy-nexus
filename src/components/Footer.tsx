
import { Shield, Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-insure-navy text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-insure-teal" />
              <span className="ml-2 text-xl font-semibold">Insure360</span>
            </div>
            <p className="text-gray-300 mb-4">
              Simplifying insurance management with AI-powered tools and insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-insure-teal">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-insure-teal">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-insure-teal">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-insure-teal">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-insure-teal">Home</Link></li>
              <li><Link to="/dashboard" className="text-gray-300 hover:text-insure-teal">Dashboard</Link></li>
              <li><Link to="/policies" className="text-gray-300 hover:text-insure-teal">Policies</Link></li>
              <li><Link to="/advisor" className="text-gray-300 hover:text-insure-teal">AI Advisor</Link></li>
              <li><Link to="/compare" className="text-gray-300 hover:text-insure-teal">Compare</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Insurance Types</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-insure-teal">Home Insurance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-insure-teal">Auto Insurance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-insure-teal">Health Insurance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-insure-teal">Life Insurance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-insure-teal">Business Insurance</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-insure-teal mr-2" />
                <a href="mailto:support@insure360.com" className="text-gray-300 hover:text-insure-teal">
                  support@insure360.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-insure-teal mr-2" />
                <a href="tel:+18001234567" className="text-gray-300 hover:text-insure-teal">
                  +1 (800) 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Insure360. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-insure-teal text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-insure-teal text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-insure-teal text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
