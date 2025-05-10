import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* -- Logo & Description --> */}
        <div className="flex flex-col items-start">
          <p className="font-bold text-4xl mb-20">
            Fury Mart <span className="text-rose-500">.</span>
          </p>
        </div>

        {/* -- Navigation Links --> */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <a href="#" className="text-gray-400 hover:text-white transition">
            About Us
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            Contact
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            Privacy Policy
          </a>
        </div>

        {/* -- Social Media --> */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <div className="flex space-x-4">
            <Link
              href="#"
              aria-label="Facebook"
              className="hover:text-blue-500"
            >
              <FaFacebook />
            </Link>
            <Link href="#" aria-label="Twitter" className="hover:text-blue-400">
              <FaXTwitter />
            </Link>
            <Link
              href="#"
              aria-label="Instagram"
              className="hover:text-pink-400"
            >
              <FaInstagram />
            </Link>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-600">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        © 2025 Fury Mart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
