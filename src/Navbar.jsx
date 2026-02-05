import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import "./Navbar.css";

export default function Navbar({ user }) {

  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const searchRef = useRef(null);
  const navigate = useNavigate();

  /* SEARCH INDEX */
  const searchIndex = useMemo(() => [
    { title: "Playlists — YouTube Topic Wise Videos", type: "route", url: "/playlists" },
    { title: "Syllabus — IT Sector Job Syllabus", type: "route", url: "/syllabus" },
    { title: "Competitions — Coding & DSA Contests", type: "route", url: "/competitions" },
    { title: "Certifications — Top Free & Paid Certs", type: "route", url: "/certifications" },
    { title: "Career Pages — Explore Companies", type: "route", url: "/careerpages" },
    { title: "Roadmap.sh — Developer Roadmaps", type: "external", url: "https://roadmap.sh/" },
  ], []);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return searchIndex.filter(i => i.title.toLowerCase().includes(q));
  }, [query, searchIndex]);

  /* CLOSE ON OUTSIDE CLICK */
  useEffect(() => {
    const close = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setShowDropdown(false);

      if (!e.target.closest(".user-section"))
        setShowUserMenu(false);
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleSelect = (item) => {
    item.type === "route"
      ? navigate(item.url)
      : window.open(item.url, "_blank", "noopener,noreferrer");

    setShowDropdown(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <>
      {/* SEARCH */}
      <div className="nav-search glow-search" ref={searchRef}>
        <span className="nav-search-icon">🔍</span>

        <input
          className="nav-search-input"
          type="text"
          placeholder="Search playlists, syllabus…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
        />

        {showDropdown && filtered.length > 0 && (
          <div className="nav-search-dropdown">
            {filtered.map((item, idx) => (
              <button
                key={idx}
                className="nav-search-item"
                onClick={() => handleSelect(item)}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* NAVBAR */}
      <div className="navbar">

        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
        </button>

        <div className={`nav-links-container ${menuOpen ? "open" : ""}`}>
          <Link to="/home">Home</Link>

          <a href="https://roadmap.sh/" target="_blank" rel="noopener noreferrer">
            Roadmap
          </a>

          <Link to="/syllabus">Syllabus</Link>
          <Link to="/competitions">Competitions</Link>
          <Link to="/certifications">Certifications</Link>
          <Link to="/careerpages">CareerPages</Link>

          <a
            href="https://www.instagram.com/privateresult/"
            className="whatsapp-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/instagram.png" alt="Instagram" className="whatsapp-logo" />
            Follow Us On Instagram
          </a>

          {/* COMPACT USER ICON */}
          {user && (
            <div className="user-section nav-user-compact">

              <div
                className="user-avatar-placeholder compact-avatar"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {(user.displayName || user.email)[0].toUpperCase()}
              </div>

              {showUserMenu && (
                <div className="user-dropdown-menu">
                  <div
                    className="dropdown-item"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </div>

                  <div
                    className="dropdown-item logout-item"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </>
  );
}
