
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Hospital, 
  Users, 
  Pill, 
  Droplet, 
  ShoppingCart, 
  Menu, 
  X,
  LogIn,
  User,
  LogOut,
  MessageCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { items } = useCart();
  const { currentUser, logout } = useAuth();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  
  const navItems = [
    { 
      name: "Home", 
      path: "/", 
      icon: <Hospital className="h-4 w-4 mr-2" /> 
    },
    { 
      name: "Doctors", 
      path: "/doctors", 
      icon: <Users className="h-4 w-4 mr-2" /> 
    },
    { 
      name: "Pharmacy", 
      path: "/pharmacy", 
      icon: <Pill className="h-4 w-4 mr-2" /> 
    },
    { 
      name: "Blood Donation", 
      path: "/blood-donation", 
      icon: <Droplet className="h-4 w-4 mr-2" /> 
    },
    { 
      name: "Chat Support", 
      path: "/chat", 
      icon: <MessageCircle className="h-4 w-4 mr-2" /> 
    },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Hospital className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary">MediCare</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                onClick={closeMenu}
              >
                <Button
                  variant={location.pathname === item.path ? "secondary" : "ghost"}
                  className="flex items-center"
                >
                  {item.icon}
                  {item.name}
                </Button>
              </Link>
            ))}
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" className="flex items-center">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {totalItems > 0 && (
                  <Badge className="ml-2 bg-primary">{totalItems}</Badge>
                )}
              </Button>
            </Link>

            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      {currentUser.email?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {currentUser.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer w-full">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="default">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="mr-2 relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-primary" variant="destructive">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {currentUser ? (
              <Button variant="ghost" size="icon" className="mr-2">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  {currentUser.email?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                </div>
              </Button>
            ) : (
              <Link to="/login" className="mr-2">
                <Button size="sm" variant="default">
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Button>
              </Link>
            )}
            
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path 
                    ? "bg-primary text-white" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={closeMenu}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            
            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={closeMenu}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
