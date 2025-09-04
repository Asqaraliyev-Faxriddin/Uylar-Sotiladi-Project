import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <footer className="bg-[#0d263b] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="font-semibold text-lg mb-4 text-white">Contact Us</h2>
          <p className="flex items-center mb-2 text-gray-400">
            <span className="mr-2">
              <img src="./img/pin.png" alt="" />
            </span>
            329 Queensberry Street, North Melbourne VIC 3051, Australia.
          </p>
          <p className="flex items-center mb-2 text-gray-400">
            <span className="mr-2">
              <img src="./img/Group.png" alt="" />
            </span>
            123 456 7890
          </p>
          <p className="flex items-center mb-4 text-gray-400">
            <span className="mr-2">
              <img src="./img/email 1.png" alt="" />
            </span>
            support@houzing.com
          </p>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-blue-400">
              <FacebookIcon />
            </a>
            <a href="#" className="hover:text-blue-400">
              <TwitterIcon />
            </a>
            <a href="#" className="hover:text-blue-400">
              <InstagramIcon />
            </a>
            <a href="#" className="hover:text-blue-400">
              <LinkedInIcon />
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-4 text-white">Discover</h2>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-blue-400">
                Chicago
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Los Angeles
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Miami
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                New York
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-4 text-white">Lists by Category</h2>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-blue-400">
                Apartments
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Condos
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Houses
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Offices
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Retail
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Villas
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-4 text-white">Lists by Category</h2>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-blue-400">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Support Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-[#0b2336] py-4 px-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">
            <img src="./img/logo.png" alt="" />
          </span>
        </div>
        <p className="text-sm text-gray-400 mt-2 sm:mt-0">
          Copyright © 2021 CreativeLayers. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
