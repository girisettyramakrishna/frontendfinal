// src/components/Navbar.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const  userInfo  = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClass = (path) =>
    `${location.pathname === path ? "underline font-semibold" : ""} hover:text-gray-200`;

  return (
    <nav className="bg-blue-600 text-white shadow-md relative">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">

        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="text-xl font-bold">
          JobPortal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/jobs" className={linkClass("/jobs")}>Jobs</Link>

          {/* Role-based Links */}
          {role === "jobseeker" && (
            <Link to="/my-applications" className={linkClass("/my-applications")}>
              My Applications
            </Link>
          )}

          

          {role === "recruiter" && (
            <Link to="/post-job" className={linkClass("/post-job")}>Post Job</Link>
          )}

          {role === "admin" && (
            <>
              <Link to="/manage-users" className={linkClass("/manage-users")}>Manage Users</Link>
              <Link to="/manage-jobs" className={linkClass("/manage-jobs")}>Manage Jobs</Link>
            </>
          )}

          {/* Guest */}
          {!userInfo ? (
            <>
              <Link to="/login" className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100">
                Login
              </Link>
              <Link to="/register" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-400">
                Register
              </Link>
            </>
          ) : (
            // Profile Dropdown
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo.name)}&background=0D8ABC&color=fff`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded shadow-md z-50">
                  <Link to="/profile" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-100">
                    My Profile
                  </Link>
                  {role === "jobseeker" && (
                    <Link to="/my-applications" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-100">
                      My Applications
                    </Link>
                  )}
                  {(role === "recruiter" || userInfo.role === "admin") && (
                    <>
                     
                      {role === "recruiter" && (
                        <Link to="/jobs/post-job" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-100">
                          Post Job
                        </Link>
                      )}
                      {role === "admin" && (
                        <>
                          <Link to="/manage-users" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-100">
                            Manage Users
                          </Link>
                          <Link to="/manage-jobs" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-100">
                            Manage Jobs
                          </Link>
                        </>
                      )}
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2 bg-blue-700">
          <Link to="/" onClick={closeMenu} className={linkClass("/")}>Home</Link>
          <Link to="/jobs" onClick={closeMenu} className={linkClass("/jobs")}>Jobs</Link>

          {role === "jobseeker" && (
            <Link to="/my-applications" onClick={closeMenu} className={linkClass("/my-applications")}>My Applications</Link>
          )}

         

          {role === "recruiter" && (
            <Link to="/post-job" onClick={closeMenu} className="block hover:text-gray-200">Post Job</Link>
          )}

          {role === "admin" && (
            <>
              <Link to="/manage-users" onClick={closeMenu} className="block hover:text-gray-200">Manage Users</Link>
              <Link to="/manage-jobs" onClick={closeMenu} className="block hover:text-gray-200">Manage Jobs</Link>
            </>
          )}

          {!userInfo ? (
            <>
              <Link to="/login" onClick={closeMenu} className="block bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100">
                Login
              </Link>
              <Link to="/register" onClick={closeMenu} className="block bg-green-500 text-white px-3 py-1 rounded hover:bg-green-400">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" onClick={closeMenu} className="block hover:text-gray-200">My Profile</Link>
              <button onClick={handleLogout} className="block w-full text-left bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
