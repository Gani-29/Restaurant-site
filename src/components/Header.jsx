import React, { useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";

export default function Header({ setPage, page }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = ["Home", "Menu", "About", "Contact"];

  const NavLink = ({ children, targetPage }) => (
    <button
      onClick={() => {
        setPage(targetPage);
        setIsMobileMenuOpen(false);
      }}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
        page === targetPage
          ? "text-yellow-500"
          : "text-gray-300 hover:text-yellow-500"
      }`}
    >
      {children}
    </button>
  );

  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <span
            className="font-bold text-2xl text-white cursor-pointer"
            onClick={() => setPage("Home")}
          >
            Gusto
          </span>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {navLinks.map((link) => (
              <NavLink key={link} targetPage={link}>
                {link}
              </NavLink>
            ))}

            <button
              onClick={() => setPage("Contact")}
              className="ml-4 bg-transparent border border-yellow-500 text-yellow-500 px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-500 hover:text-gray-900 transition duration-300"
            >
              Book a Table
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 p-2 rounded-md hover:bg-gray-700"
            >
              {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 shadow-lg absolute top-16 left-0 right-0 z-40 px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <NavLink key={link} targetPage={link}>
              <span className="block px-3 py-2">{link}</span>
            </NavLink>
          ))}

          <button
            onClick={() => {
              setPage("Contact");
              setIsMobileMenuOpen(false);
            }}
            className="w-full bg-yellow-500 text-gray-900 px-4 py-2 rounded-md font-medium"
          >
            Book a Table
          </button>
        </div>
      )}
    </nav>
  );
}
