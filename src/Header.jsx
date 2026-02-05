import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const panelText = "Private Jobs & Career Guideance Portal";

  useEffect(() => {
    if (currentIndex < panelText.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + panelText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timer);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentIndex]);

  return (
    <div className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
            PRIVATE RESULT
          </h1>

          <div>Welcome to Our Platform</div>

          <div className="panel">
            {displayText}
            {!isTypingComplete && <span className="typing-cursor">|</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
