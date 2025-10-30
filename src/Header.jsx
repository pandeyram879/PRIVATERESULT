import { useEffect, useState } from "react";
import "./Header.css"; // Import the CSS file for styles

function Header() {
  // Typing animation states
  const [displayText, setDisplayText] = useState('');
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
  }, [currentIndex, panelText]);

  return (
    <div className="header">
      <h1>PRIVATE RESULT</h1>
      <div>Welcome to Our Platform</div>
      <div className="panel">
        {displayText}
        {!isTypingComplete && <span className="typing-cursor">|</span>}
      </div>
    </div>
  );
}

export default Header;