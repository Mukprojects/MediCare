
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-medical-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">MediCare</h3>
            <p className="text-sm text-gray-300">
              Providing quality healthcare services and products to improve your wellbeing.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:text-primary hover:bg-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:text-primary hover:bg-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:text-primary hover:bg-white">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-300 hover:text-white">
                  Find a Doctor
                </Link>
              </li>
              <li>
                <Link to="/pharmacy" className="text-gray-300 hover:text-white">
                  Pharmacy
                </Link>
              </li>
              <li>
                <Link to="/blood-donation" className="text-gray-300 hover:text-white">
                  Blood Donation
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-white">Emergency Care</li>
              <li className="text-gray-300 hover:text-white">Laboratory Tests</li>
              <li className="text-gray-300 hover:text-white">Medical Consultations</li>
              <li className="text-gray-300 hover:text-white">Health Checkups</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@medicare.com</span>
              </li>
              <li className="text-gray-300">
                123 Medical Center Dr,<br />
                Healthcare City, HC 12345
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} MediCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
