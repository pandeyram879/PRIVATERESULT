import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState, useCallback } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
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
import Dashboard from "./Dashboard.jsx";

function App() {
  const [query] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hasVisitedLanding, setHasVisitedLanding] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Check if user has visited landing page
  useEffect(() => {
    const visited = sessionStorage.getItem("hasVisitedLanding");
    if (visited) {
      setHasVisitedLanding(true);
    }
  }, []);

  // Mark landing page as visited when user visits it
  useEffect(() => {
    if (location.pathname === "/") {
      sessionStorage.setItem("hasVisitedLanding", "true");
      setHasVisitedLanding(true);
    }
  }, [location.pathname]);

  const isLandingPage = location.pathname === "/";
  const isAuthPage = location.pathname === "/login" || location.pathname === "/authpages";

  const searchIndex = useMemo(
    () => [
      { title: "Playlists — YouTube Topic Wise Videos", type: "route", url: "/playlists" },
      { title: "Syllabus — IT Sector Job Syllabus", type: "route", url: "/syllabus" },
      { title: "Competitions — Coding & DSA Contests", type: "route", url: "/competitions" },
      { title: "Certifications — Top Free & Paid Certs", type: "route", url: "/certifications" },
      { title: "Career Pages — Explore Companies", type: "route", url: "/careerpages" },
      { title: "Dashboard — Your Profile", type: "route", url: "/dashboard" },
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

  // Show loading screen while checking auth
  if (authLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #38bdf8, #7dd3fc, #3b82f6)'
      }}>
        <h2 style={{ color: 'white', fontSize: '1.5rem' }}>Loading...</h2>
      </div>
    );
  }

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    // If user not logged in and hasn't visited landing page, go to landing
    if (!user && !hasVisitedLanding) {
      return <Navigate to="/" replace />;
    }
    // If user not logged in but has visited landing, go to login
    if (!user && hasVisitedLanding) {
      return <Navigate to="/login" replace />;
    }
    // User is logged in, show the page
    return children;
  };

  return (
    <div>
      {/* Header visible only when NOT on LandingPage or AuthPages */}
      {!isLandingPage && !isAuthPage && (
        <div className="header">
          <Header user={user} />
        </div>
      )}

      {/* Navbar visible only when NOT on LandingPage or AuthPages */}
      {!isLandingPage && !isAuthPage && (
        <motion.div
          className="navbar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Navbar user={user} />
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
            {/* Landing Page - Always accessible */}
            <Route path="/" element={<LandingPage />} />

            {/* Auth Pages - Redirect to home if already logged in */}
            <Route 
              path="/login" 
              element={user ? <Navigate to="/home" replace /> : <AuthPages />} 
            />
            <Route 
              path="/authpages" 
              element={user ? <Navigate to="/home" replace /> : <AuthPages />} 
            />

            {/* All Other Routes - PROTECTED (Login Required) */}
            <Route 
              path="/home"
              element={
                <ProtectedRoute>
                  <div className="content-container">
                    <MockTests />
                    <JobListings />
                    <QuickLinks />
                  </div>
                </ProtectedRoute>
              }
            />

            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/syllabus" 
              element={
                <ProtectedRoute>
                  <Syllabus />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/playlists" 
              element={
                <ProtectedRoute>
                  <Playlists />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/certifications" 
              element={
                <ProtectedRoute>
                  <Certifications />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/competitions" 
              element={
                <ProtectedRoute>
                  <Competitions />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/careerpages" 
              element={
                <ProtectedRoute>
                  <CareerPages />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/joblistings" 
              element={
                <ProtectedRoute>
                  <JobListings />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/mocktests" 
              element={
                <ProtectedRoute>
                  <MockTests />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/mocktestsbrief" 
              element={
                <ProtectedRoute>
                  <MockTestsBrief />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/joblistingsbrief" 
              element={
                <ProtectedRoute>
                  <JobListingsBrief />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/expiredjobs" 
              element={
                <ProtectedRoute>
                  <ExpiredJobs />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/makecv" 
              element={
                <ProtectedRoute>
                  <MakeCV />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/importantupdates" 
              element={
                <ProtectedRoute>
                  <ImportantUpdates />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/navbar" 
              element={
                <ProtectedRoute>
                  <Navbar />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/interviewquestions" 
              element={
                <ProtectedRoute>
                  <InterviewQuestions />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/header" 
              element={
                <ProtectedRoute>
                  <Header user={user} />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/player" 
              element={
                <ProtectedRoute>
                  <VideoPlayer />
                </ProtectedRoute>
              } 
            />

            {/* 404 - Redirect based on auth status */}
            <Route 
              path="*" 
              element={
                !hasVisitedLanding ? <Navigate to="/" replace /> : 
                !user ? <Navigate to="/login" replace /> : 
                <Navigate to="/home" replace />
              } 
            />
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