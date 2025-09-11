import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className="bg-[#0d263b] text-white">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 h-[70px]">
        {/* Logo */}
        <div>
          <img src="../img/logo.png" alt="Logo" className="h-[40px]" />
        </div>

        {/* Desktop menu */}
        <nav className="hidden md:flex gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white underline"
                : "text-gray-400 hover:text-gray-200"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/properties"
            className={({ isActive }) =>
              isActive
                ? "text-white underline"
                : "text-gray-400 hover:text-gray-200"
            }
          >
            Properties
          </NavLink>

          {/* Token bo‘lsa Favorites */}
          {token && (
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive
                  ? "text-white underline"
                  : "text-gray-400 hover:text-gray-200"
              }
            >
              Favorites
            </NavLink>
          )}

          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              isActive
                ? "text-white underline"
                : "text-gray-400 hover:text-gray-200"
            }
          >
            Contacts
          </NavLink>
        </nav>

        {/* Profile / Login (hamma ekranda) */}
        <div className="relative flex items-center gap-3" ref={profileRef}>
          {token ? (
            <>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2"
              >
                <img
                  src="../img/Vector.png"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </button>
              {profileOpen && (
  <div className="absolute right-0 top-full mt-2 bg-white text-black rounded-lg shadow-lg w-48 z-50">
    <NavLink
      to="/profile"
      className="block px-4 py-2 hover:bg-gray-100"
    >
      My Profile
    </NavLink>
    <NavLink
      to="/my-properties"
      className="block px-4 py-2 hover:bg-gray-100"
    >
      My Properties
    </NavLink>
    <NavLink
      to="/favorites"
      className="block px-4 py-2 hover:bg-gray-100"
    >
      Favorites
    </NavLink>
  </div>
)}

            </>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium"
            >
              Login
            </button>
          )}

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar (off-canvas) */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Sidebar */}
          <div className="w-64 bg-[#0d263b] h-full p-6 space-y-6 shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={() => setMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block text-white underline"
                  : "block text-gray-400 hover:text-gray-200"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/properties"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block text-white underline"
                  : "block text-gray-400 hover:text-gray-200"
              }
            >
              Properties
            </NavLink>

            {/* Token bo‘lsa mobil menyuda ham Favorites chiqadi */}
            {token && (
              <NavLink
                to="/favorites"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "block text-white underline"
                    : "block text-gray-400 hover:text-gray-200"
                }
              >
                Favorites
              </NavLink>
            )}

            <NavLink
              to="/contacts"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block text-white underline"
                  : "block text-gray-400 hover:text-gray-200"
              }
            >
              Contacts
            </NavLink>

            {/* Mobile Login/Profile */}
            {token ? (
              <NavLink
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="block text-white font-medium mt-6"
              >
                My Profile
              </NavLink>
            ) : (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogin();
                }}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium mt-6 w-full"
              >
                Login
              </button>
            )}
          </div>

          {/* Overlay */}
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setMenuOpen(false)}
          />
        </div>
      )}
    </header>
  );
}

export default Header;
