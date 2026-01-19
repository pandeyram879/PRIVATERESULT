import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const searchIndex = useMemo(
    () => [
      { title: "Playlists — YouTube Topic Wise Videos", type: "route", url: "/playlists" },
      { title: "Syllabus — IT Sector Job Syllabus", type: "route", url: "/syllabus" },
      { title: "Competitions — Coding & DSA Contests", type: "route", url: "/competitions" },
      { title: "Certifications — Top Free & Paid Certs", type: "route", url: "/certifications" },
      { title: "Career Pages — Explore Companies", type: "route", url: "/careerpages" },
      { title: "Roadmap.sh — Developer Roadmaps", type: "external", url: "https://roadmap.sh/" },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return searchIndex.filter((i) => i.title.toLowerCase().includes(q)).slice(0, 8);
  }, [query, searchIndex]);

  const handleSelect = (item) => {
    if (item.type === "route") {
      navigate(item.url);
    } else {
      window.open(item.url, "_blank", "noopener,noreferrer");
    }
    setShowDropdown(false);
    setActiveIndex(-1);
  };

  const onKeyDown = (e) => {
    if (!showDropdown || filtered.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) handleSelect(filtered[activeIndex]);
    } else if (e.key === "Escape") {
      setShowDropdown(false);
      setActiveIndex(-1);
    }
  };

  useEffect(() => {
    const onClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Search Bar - OUTSIDE container, always visible */}
      <div className="nav-search glow-search" ref={searchRef}>
        <span className="nav-search-icon">🔍</span>
        <input
          className="nav-search-input"
          type="text"
          placeholder="Search playlists, syllabus…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(e.target.value.trim().length > 0);
            setActiveIndex(0);
          }}
          onFocus={() => setShowDropdown(query.trim().length > 0)}
          onKeyDown={onKeyDown}
          aria-label="Search"
        />

        {showDropdown && filtered.length > 0 && (
          <div className="nav-search-dropdown">
            {filtered.map((item, idx) => (
              <button
                key={item.title + idx}
                type="button"
                className={`nav-search-item ${idx === activeIndex ? "active" : ""}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => handleSelect(item)}
              >
                <span className="nav-search-item-title">{item.title}</span>
                <span className={`nav-search-badge ${item.type === "route" ? "badge-internal" : "badge-external"}`}>
                  {item.type === "route" ? "Page" : "Link"}
                </span>
              </button>
            ))}
          </div>
        )}

        {showDropdown && filtered.length === 0 && (
          <div className="nav-search-dropdown empty">No results found</div>
        )}
      </div>

      {/* Hamburger Button */}
      <button 
        className="hamburger-btn" 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={menuOpen ? "open" : ""}></span>
        <span className={menuOpen ? "open" : ""}></span>
        <span className={menuOpen ? "open" : ""}></span>
      </button>

      {/* Navigation Links Container - WITHOUT search inside */}
      <div className={`nav-links-container ${menuOpen ? "open" : ""}`}>
        <Link to="/home" onClick={handleLinkClick}>Home</Link>
        <a href="https://roadmap.sh/" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
          Roadmap
        </a>
        <Link to="/syllabus" onClick={handleLinkClick}>Syllabus</Link>
        <Link to="/competitions" onClick={handleLinkClick}>Competitions</Link>
        <Link to="/certifications" onClick={handleLinkClick}>Certifications</Link>
        <Link to="/careerpages" onClick={handleLinkClick}>CareerPages</Link>
        <Link to="/authpages" onClick={handleLinkClick}>AuthPages</Link>
        
        <a
          href="https://www.instagram.com/privateresult/"
          className="whatsapp-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLinkClick}
        >
          <img src="/instagram.png" alt="Instagram logo" className="whatsapp-logo" />
          Follow Us On Instagram
        </a>
      </div>

      {/* Overlay when menu open */}
      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>}
    </>
  );
}