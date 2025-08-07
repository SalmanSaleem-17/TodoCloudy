"use client";

import React from "react";
import Link from "next/link";
import {
  Cloud,
  Twitter,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Heart,
} from "lucide-react";
import Newsletter from "./Newsletter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "FAQs", href: "/faqs" },
      { name: "About Us", href: "/about" },
      { name: "Status", href: "/status" },
      { name: "Community", href: "/community" },
      { name: "Documentation", href: "/docs" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  const socialLinks = [
    { name: "Twitter", icon: <Twitter className="w-5 h-5" />, href: "#" },
    { name: "GitHub", icon: <Github className="w-5 h-5" />, href: "#" },
    { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, href: "#" },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:hello@todocloudy.com",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-48 sm:w-80 h-48 sm:h-80 bg-cyan-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 sm:w-60 h-40 sm:h-60 bg-blue-300 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1 text-center lg:text-left">
              <Link
                href="/"
                className="inline-flex items-center space-x-3 mb-6 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center group-hover:scale-105">
                  <Cloud className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    TodoCloudy
                  </h3>
                  <p className="text-sm text-blue-500 font-medium">
                    Task Management
                  </p>
                </div>
              </Link>

              <p className="text-gray-600 mb-6 leading-relaxed max-w-md mx-auto lg:mx-0">
                Simplifying task management for teams worldwide. Build better
                habits, achieve more together, and stay organized with our
                powerful platform.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center lg:justify-start space-x-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>San Francisco, CA 94105</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>hello@todocloudy.com</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center lg:justify-start space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-blue-50 hover:bg-blue-500 border border-blue-100 hover:border-blue-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                    aria-label={social.name}
                  >
                    <div className="text-blue-500 group-hover:text-white transition-colors duration-300">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Support Links - Split into multiple columns on larger screens */}
                <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-3">
                  <h4 className="text-lg font-semibold mb-6 text-gray-900 text-center lg:text-left">
                    Quick Links
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {footerLinks.support.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm flex items-center justify-center lg:justify-start group py-1"
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Newsletter />

        {/* Bottom Bar */}
        <div className="border-t border-blue-100 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex justify-center text-center">
              <span className="text-xs sm:text-sm text-gray-500">
                &copy; {currentYear} TodoCloudy. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// export default function Footer() {
//   return (
//     <footer className="bg-white">
//       <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//         <p className="text-center text-sm text-gray-500">
//           &copy; {new Date().getFullYear()} TodoCloudy. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }
