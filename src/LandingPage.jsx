import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span>PrivateResult.com</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Your one-stop destination for Mock Tests, Job Alerts, and Resume Builder.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <button onClick={() => navigate("/mocktests")}>Start Mock Tests</button>
          <button onClick={() => navigate("/joblistings")}>Explore Jobs</button>
          <button onClick={() => navigate("/makeresume")}>Build Resume</button>
          <button onClick={() => navigate("/careerpages")}>Explore Career-Pages</button>
          <button onClick={() => navigate("/playlists")}>Playlists from YouTube</button>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          ↓ Scroll Down
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-grid">
          {[
            {
              icon: "🧠",
              title: "Mock Tests",
              desc: "Attempt realistic tests to sharpen your preparation."
            },
            {
              icon: "💼",
              title: "Job Updates",
              desc: "Get daily alerts about the latest private and government jobs."
            },
            {
              icon: "📄",
              title: "Resume Builder",
              desc: "Create a professional resume instantly with templates."
            },
            {
              icon: "🌐",
              title: "YouTube Playlists",
              desc: "Access curated playlists for exam prep and skill development."
            },
            {
              icon: "🏢",
              title: "Career-Pages",
              desc: "Explore dedicated Career-Pages for top companies / MNCs and their job openings."
            },
            {
              icon: "📄",
              title: "Important Updates",
              desc: "Also get an important updates related to jobs-openings, New Courses , Syllabus and many more."
            },
             {
              icon: "📄",
              title: "Roadmap",
              desc: "You can access a detailed roadmap for various career paths related to IT / Tech Field."
            },
            {
              icon: "⚡",
              title: "Instant Access",
              desc: "No sign-up required. Just visit and start using!"
            }
          ].map((f, i) => (
            <motion.div
              key={i}
              className="feature-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <motion.section
        className="about"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>About PrivateResult.com</h2>
        <p>
          We bring all essential career tools under one roof — from mock tests
          that boost your preparation, to the latest job openings and professional
          resume creation tools. Everything you need, right here.
        </p>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <h2>Ready to Start Your Journey?</h2>
        <button onClick={() => navigate("/home")}>Start Now 🚀</button>
      </motion.section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2025 PrivateResult.com | Made with ❤️ for learners</p>
      </footer>
    </div>
  );
}
