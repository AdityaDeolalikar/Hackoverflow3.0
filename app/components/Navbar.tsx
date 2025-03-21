"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
  isScroll?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#impact", isScroll: true },
  { label: "Contact", href: "#testimonials", isScroll: true },
  { label: "Login", href: "/login" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scroll
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // If on homepage, scroll to section
    if (window.location.pathname === '/') {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, navigate to home and then scroll
      window.location.href = `/${href}`;
    }
    
    // Close menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white shadow-sm border-b"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "text-2xl font-bold tracking-tight hover:opacity-80 transition-all duration-300 hover:scale-105",
              isScrolled ? "text-gray-900" : "text-white"
            )}
          >
            Van Rakshak
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => item.isScroll ? handleScrollToSection(e, item.href) : null}
                className={cn(
                  "text-sm font-medium relative group transition-colors",
                  isScrolled ? "text-gray-900 hover:text-gray-600" : "text-white hover:text-white/80"
                )}
              >
                {item.label}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                  isScrolled ? "bg-gray-900" : "bg-white"
                )} />
              </Link>
            ))}
            <Button className={cn(
              "shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105",
              isScrolled ? "bg-green-600 text-white hover:bg-green-700" : "bg-white text-black hover:bg-white/90"
            )}>
              <Link href="/signup">Signup</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden p-2 rounded-full transition-colors",
              isScrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden shadow-lg transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "max-h-[400px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden",
          isScrolled ? "bg-white" : "bg-black/50 backdrop-blur-md"
        )}
      >
        <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-base font-medium py-3 transition-colors rounded-lg px-4",
                isScrolled 
                  ? "text-gray-900 hover:text-gray-600 hover:bg-gray-50"
                  : "text-white hover:text-white/80 hover:bg-white/10"
              )}
              onClick={(e) => {
                if (item.isScroll) {
                  handleScrollToSection(e, item.href);
                } else {
                  setIsMenuOpen(false);
                }
              }}
            >
              {item.label}
            </Link>
          ))}
          <Button className={cn(
            "mt-4 w-full shadow-lg hover:shadow-xl transition-all duration-300",
            isScrolled ? "bg-green-600 text-white hover:bg-green-700" : "bg-white text-black hover:bg-white/90"
          )}>
            <Link href="/signup">Signup</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
