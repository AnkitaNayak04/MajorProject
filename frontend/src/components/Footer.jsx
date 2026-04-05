
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-red-800 text-white pt-12">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl px-6">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* ABOUT */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                GIET DeptConnect
              </h3>
              <p className="text-sm text-red-100">
                Department platform for notices, events & PYQs.
              </p>
            </div>

            {/* ACADEMICS */}
            <div>
              <h4 className="text-lg font-semibold mb-4">
                Academics
              </h4>
              <ul className="space-y-2 text-red-100 text-sm">
                <li>BCA</li>
                <li>MCA</li>
        

                {/* 🔥 PYQ LINK */}
                <li>
                  <Link to="/pyq" className="hover:text-white">
                    PYQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="text-lg font-semibold mb-4">
                Contact Us
              </h4>
              <p>GIET University</p>
              <p>Email: csa@giet.edu</p>
            </div>

          </div>

          <div className="border-t border-red-600 mt-10"></div>

          <div className="text-center text-sm py-6">
            © 2026 GIET DeptConnect
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;