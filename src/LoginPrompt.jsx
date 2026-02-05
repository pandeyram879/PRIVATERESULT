// src/LoginPrompt.jsx - NEW FILE
// Copy-paste this entire file

import { useNavigate } from 'react-router-dom';
import './LoginPrompt.css';

export default function LoginPrompt({ isOpen, onClose, feature = "this feature" }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    onClose();
    navigate('/login');
  };

  return (
    <div className="login-prompt-overlay" onClick={onClose}>
      <div className="login-prompt-modal" onClick={(e) => e.stopPropagation()}>
        <button className="login-prompt-close" onClick={onClose}>
          ✕
        </button>
        
        <div className="login-prompt-icon">
          🔐
        </div>
        
        <h2 className="login-prompt-title">
          Login Required
        </h2>
        
        <p className="login-prompt-message">
          Please login to access <strong>{feature}</strong>
        </p>
        
        <div className="login-prompt-benefits">
          <div className="benefit-item">
            ✅ Free forever
          </div>
          <div className="benefit-item">
            ✅ Takes only 30 seconds
          </div>
          <div className="benefit-item">
            ✅ Access all premium features
          </div>
        </div>
        
        <div className="login-prompt-buttons">
          <button className="login-prompt-btn-primary" onClick={handleLogin}>
            Login / Sign Up
          </button>
          <button className="login-prompt-btn-secondary" onClick={onClose}>
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}