import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">PC</span>
            </div>
            <span className="text-xl font-bold text-white">Pledge Card</span>
          </div>
          <p className="text-sm text-gray-400">
            A platform for fundraising with flexible donation options including
            pledges for future contributions.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Explore</h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/campaigns"
                className="hover:text-white transition-colors"
              >
                Browse Campaigns
              </Link>
            </li>
            <li>
              <Link
                to="/campaigns/create"
                className="hover:text-white transition-colors"
              >
                Start a Campaign
              </Link>
            </li>
            <li>
              <Link
                to="/success-stories"
                className="hover:text-white transition-colors"
              >
                Success Stories
              </Link>
            </li>
            <li>
              <Link
                to="/how-it-works"
                className="hover:text-white transition-colors"
              >
                How It Works
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/help" className="hover:text-white transition-colors">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/guidelines"
                className="hover:text-white transition-colors"
              >
                Fundraising Guidelines
              </Link>
            </li>
            <li>
              <Link to="/fees" className="hover:text-white transition-colors">
                Fees & Pricing
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/cookies"
                className="hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link
                to="/accessibility"
                className="hover:text-white transition-colors"
              >
                Accessibility
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-800 text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Pledge Card. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
