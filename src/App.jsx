import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion"; // 👈 for fade animation
import "./App.css";
import Header from "./Header.jsx";
import Syllabus from "./Syllabus.jsx";
import Playlists from "./Playlists.jsx";
import Certifications from "./Certifications.jsx";
import Competitions from "./Competitions.jsx";
import CareerPages from "./CareerPages.jsx";
import JobListings from "./JobListings.jsx";
import MockTests from "./MockTests.jsx";
import MockTestsBrief from "./MockTestsBrief";
import JobListingsBrief from "./JobListingsBrief";
import ExpiredJobs from "./ExpiredJobs.jsx";
import MakeCV from "./MakeCV.jsx";
import ImportantUpdates from "./ImportantUpdates.jsx";
import InterviewQuestions from "./InterviewQuestions.jsx";
import Navbar from "./Navbar.jsx";
import LandingPage from "./LandingPage.jsx";
import QuickLinks from "./QuickLinks.jsx";
import VideoPlayer from "./VideoPlayer.jsx";
import AuthPages from "./AuthPages.jsx";

function App() {
  const [query] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hasVisited, setHasVisited] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user has visited before (using sessionStorage for session-based, or localStorage for permanent)
  useEffect(() => {
    const visited = sessionStorage.getItem("hasVisitedBefore");
    if (visited) {
      setHasVisited(true);
    }
  }, []);

  const isLandingPage = location.pathname === "/"; // 👈 check route

  const searchIndex = useMemo(
    () => [
      { title: "Playlists — YouTube Topic Wise Videos", type: "route", url: "/playlists" },
      { title: "Syllabus — IT Sector Job Syllabus", type: "route", url: "/syllabus" },
      { title: "Competitions — Coding & DSA Contests", type: "route", url: "/competitions" },
      { title: "Certifications — Top Free & Paid Certs", type: "route", url: "/certifications" },
      { title: "Career Pages — Explore Companies", type: "route", url: "/careerpages" },
      { title: "HCL Tech — Senior Project Manager (Apply Now)", type: "external", url: "https://www.hcltech.com/jobs/senior-project-manager-2" },
      { title: "UPSC Civil Services Prelims Result 2025", type: "external", url: "#" },
      { title: "Railway Group D Admit Card 2025", type: "external", url: "#" },
      { title: "CTET July 2025 Registration Started", type: "external", url: "#" },
      { title: "IBPS PO 2025 Final Result Declared", type: "external", url: "#" },
      { title: "Roadmap.sh — Developer Roadmaps", type: "external", url: "https://roadmap.sh/" },
      { title: "Infosys Springboard Certification", type: "external", url: "https://infyspringboard.onwingspan.com/web/en/page/home" },
      { title: "HackerRank Competitions", type: "external", url: "https://www.hackerrank.com/contests" },
      { title: "LeetCode Weekly Contest", type: "external", url: "https://leetcode.com/contest/" },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return searchIndex.filter((i) => i.title.toLowerCase().includes(q)).slice(0, 8);
  }, [query, searchIndex]);

  const handleSelect = useCallback(
    (item) => {
      if (item.type === "route") {
        navigate(item.url);
      } else {
        window.open(item.url, "_blank", "noopener,noreferrer");
      }
      setShowDropdown(false);
      setActiveIndex(-1);
    },
    [navigate]
  );

  const onKeyDown = useCallback(
    (e) => {
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
    },
    [showDropdown, filtered, activeIndex, handleSelect]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  // If user has visited before and tries to access landing page, redirect to home
  if (hasVisited && location.pathname === "/") {
    return <Navigate to="/home" replace />;
  }

  return (
    <div>
      {/* Header visible only when NOT on LandingPage */}
      {!isLandingPage && (
        <div className="header">
          <Header />
        </div>
      )}

      {/* Navbar visible only when NOT on LandingPage */}
      {!isLandingPage && (
        <motion.div
          className="navbar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Navbar />
        </motion.div>
      )}

      {/* Page Transition Wrapper */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Routes location={location} key={location.pathname}>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Home Page */}
            <Route
              path="/home"
              element={
                <div className="content-container">
                  <MockTests />
                  <JobListings />
                  <QuickLinks />
                </div>
              }
            />

            <Route path="/syllabus" element={<Syllabus />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/competitions" element={<Competitions />} />
            <Route path="/careerpages" element={<CareerPages />} />
            <Route path="/joblistings" element={<JobListings />} />
            <Route path="/mocktests" element={<MockTests />} />
            <Route path="/mocktestsbrief" element={<MockTestsBrief />} />
            <Route path="/joblistingsbrief" element={<JobListingsBrief />} />
            <Route path="/expiredjobs" element={<ExpiredJobs />} />
            <Route path="/makecv" element={<MakeCV />} />
            <Route path="/importantupdates" element={<ImportantUpdates />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/interviewquestions" element={<InterviewQuestions />} />
            <Route path="/header" element={<Header />} />
            <Route path="/player" element={<VideoPlayer />} />
            <Route path="/authpages" element={<AuthPages />} /> 

          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}