"use client";

import Link from "next/link";

export function Footer() {
  const footerLinks = [
    {
      title: "Links",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="relative w-full">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-blue-900 opacity-95" />
      
      <div className="container relative mx-auto px-4 py-12 text-white">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tight hover:opacity-80 transition-all duration-300">
            TerraSynth
            </Link>
            <p className="mt-4 text-sm text-white/80 max-w-md">
              We&apos;re dedicated to creating innovative solutions that empower our users and transform their digital experiences. Join us on this journey.
            </p>
          </div>

          {/* Footer Links */}
          {footerLinks.map((group, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="text-sm text-white/80 hover:text-white transition-colors duration-200 flex items-center group"
                    >
                      <span className="relative group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        
        
        {/* Copyright */}
        
      </div>
    </footer>
  );
}

export default Footer;
