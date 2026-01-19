import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mark that user has visited the landing page
  const handleNavigate = (path) => {
    sessionStorage.setItem("hasVisitedBefore", "true");
    navigate(path, { replace: true }); // replace: true prevents going back to landing page
  };

  const features = [
    {
      icon: "🧠",
      title: "Mock Tests",
      desc: "Attempt realistic tests to sharpen your preparation with instant feedback.",
      gradient: "from-purple-400 to-pink-400"
    },
    {
      icon: "💼",
      title: "Job Updates",
      desc: "Get daily alerts about the latest private and government jobs.",
      gradient: "from-blue-400 to-cyan-400"
    },
    {
      icon: "📄",
      title: "Resume Builder",
      desc: "Create a professional resume instantly with ATS-optimized templates.",
      gradient: "from-green-400 to-emerald-400"
    },
    {
      icon: "🌐",
      title: "YouTube Playlists",
      desc: "Access curated playlists for exam prep and skill development.",
      gradient: "from-orange-400 to-red-400"
    },
    {
      icon: "🏢",
      title: "Career Pages",
      desc: "Explore dedicated pages for top companies, MNCs and their openings.",
      gradient: "from-indigo-400 to-purple-400"
    },
    {
      icon: "📢",
      title: "Important Updates",
      desc: "Stay informed about job openings, new courses, syllabus updates and more.",
      gradient: "from-pink-400 to-rose-400"
    },
    {
      icon: "🗺️",
      title: "Career Roadmap",
      desc: "Access detailed roadmaps for various IT and tech career paths.",
      gradient: "from-teal-400 to-blue-400"
    },
    {
      icon: "⚡",
      title: "Instant Access",
      desc: "No sign-up required. Just visit and start using all features!",
      gradient: "from-yellow-400 to-orange-400"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500+", label: "Mock Tests" },
    { number: "1000+", label: "Job Listings" },
    { number: "100%", label: "Free Access" }
  ];

  return (
    <div className="landing-container">
      {/* Animated Background */}
      <div className="bg-animation">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Floating Navbar */}
      <motion.nav
        className={`floating-nav ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="nav-container">
          <div className="nav-content">
            <motion.div
              className="logo-section"
              whileHover={{ scale: 1.05 }}
            >
              <div className="logo-icon">🎯</div>
              <span className="logo-text">PrivateResult</span>
            </motion.div>
            
            <motion.button
              onClick={() => handleNavigate("/home")}
              className="nav-explore-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Now 🚀
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="hero-section">
        <motion.div
          className="hero-content"
          style={{ opacity, scale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-badge-wrapper"
          >
            <span className="hero-badge">
              🚀 Your Career Success Platform
            </span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome to{" "}
            <span className="hero-title-gradient">
              PrivateResult.com
            </span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Your ultimate destination for Mock Tests, Job Alerts, Resume Building, and Career Growth
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.button
              onClick={() => handleNavigate("/mocktests")}
              className="hero-btn hero-btn-primary"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="btn-content">
                Start Mock Tests
                <svg className="btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.button>

            <motion.button
              onClick={() => handleNavigate("/makecv")}
              className="hero-btn hero-btn-secondary"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Build Resume
            </motion.button>
          </motion.div>

          <motion.div
            className="hero-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {[
              { path: "/careerpages", label: "Career Pages", icon: "🏢" },
              { path: "/playlists", label: "Playlists", icon: "🎥" },
              { path: "/joblistings", label: "Explore Jobs", icon: "💼" }
            ].map((item, i) => (
              <motion.button
                key={i}
                onClick={() => handleNavigate(item.path)}
                className="hero-link-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon} {item.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="scroll-content">
            <span className="scroll-text">Scroll to explore</span>
            <svg className="scroll-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <motion.div
            className="features-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="features-title">
              Why Choose{" "}
              <span className="features-title-gradient">
                PrivateResult?
              </span>
            </h2>
            <p className="features-subtitle">
              Everything you need to accelerate your career journey in one powerful platform
            </p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className={`feature-gradient bg-gradient-${feature.gradient}`}></div>
                
                <div className="feature-content">
                  <motion.div
                    className="feature-icon"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  <h3 className={`feature-title text-gradient-${feature.gradient}`}>
                    {feature.title}
                  </h3>
                  
                  <p className="feature-desc">
                    {feature.desc}
                  </p>
                </div>

                <div className="feature-line"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-container">
          <motion.div
            className="about-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="about-title">
              About{" "}
              <span className="about-title-gradient">
                PrivateResult.com
              </span>
            </h2>
            <p className="about-text">
              We bring all essential career tools under one roof — from mock tests that boost your preparation, 
              to the latest job openings and professional resume creation tools. Our platform is designed to 
              empower job seekers, students, and professionals with the resources they need to succeed. 
              Everything you need for your career journey, right here, completely free.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="cta-card"
          >
            <h2 className="cta-title">
              Ready to Start Your Journey?
            </h2>
            <p className="cta-subtitle">
              Join thousands of successful candidates who transformed their careers with PrivateResult
            </p>
            
            <div className="cta-buttons">
              <motion.button
                onClick={() => handleNavigate("/home")}
                className="cta-btn cta-btn-primary"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="cta-btn-content">
                  Start Now 🚀
                  <svg className="cta-btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </motion.button>

              <motion.button
                onClick={() => handleNavigate("/home")}
                className="cta-btn cta-btn-secondary"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Now 🚀
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">
              <div className="footer-logo-icon">🎯</div>
              <span className="footer-logo-text">PrivateResult.com</span>
            </div>
            <p className="footer-copyright">
              © 2025 PrivateResult.com | Made with ❤️ for learners and job seekers
            </p>
            <div className="footer-links">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Contact Us</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}