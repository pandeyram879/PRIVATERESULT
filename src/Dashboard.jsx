import { useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';

import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const navigate = useNavigate();

  /* ================= AUTH ================= */

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  /* ================= THEME ================= */

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  /* ================= ACTIONS ================= */

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleEditProfile = async () => {
    const name = prompt("Enter new display name:");
    if (!name) return;

    try {
      await updateProfile(auth.currentUser, { displayName: name });
      setUser({ ...auth.currentUser });
      alert("Profile updated ✅");
    } catch {
      alert("Update failed ❌");
    }
  };

  const handleChangePassword = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      alert("Password reset email sent 📧");
    } catch {
      alert("Error sending email");
    }
  };

  /* ================= STATES ================= */

  if (loading) return <div className="loading">Loading...</div>;
  if (!user) return <div>Please login first</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">

        {/* HEADER */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>

        {/* USER CARD */}
        <div className="user-card">
          <div className="user-avatar">
            {user.photoURL ? (
              <img src={user.photoURL} alt="" className="avatar-img" />
            ) : (
              <div className="avatar-placeholder">
                {(user.displayName || user.email)[0].toUpperCase()}
              </div>
            )}
          </div>

          <div className="user-info">
            <h2>{user.displayName || "User"}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        {/* ✅ ACCOUNT INFO RESTORED */}
        <div className="details-card">
          <h3 className="details-title">Account Information</h3>

          <div className="detail-item">
            <span className="detail-label">Display Name:</span>
            <span className="detail-value">{user.displayName || "Not set"}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{user.email}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Email Verified:</span>
            <span className="detail-value">
              {user.emailVerified ? "✓ Verified" : "✗ Not Verified"}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">User ID:</span>
            <span className="detail-value">{user.uid}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Created:</span>
            <span className="detail-value">
              {new Date(user.metadata.creationTime).toLocaleString()}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Last Login:</span>
            <span className="detail-value">
              {new Date(user.metadata.lastSignInTime).toLocaleString()}
            </span>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="actions-card">
          <h3 className="details-title">Quick Actions</h3>

          <div className="actions-grid">

            <button
              className="action-btn"
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>

            <button
              className="action-btn"
              onClick={handleChangePassword}
            >
              Change Password
            </button>

            {/* 🌙 DARK / LIGHT SWITCH */}
            <button
              className="action-btn"
              onClick={toggleTheme}
            >
              {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
