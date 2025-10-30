import { Link } from "react-router-dom";
import "./QuickLinks.css";

function QuickLinks() {
  return (
    <div>
      <h2 className="section-title">Quick Links</h2>
      <div className="quick-links">
        <Link to="/syllabus">📝 Syllabus</Link>
        <Link to="/makecv">👤 Make CV</Link>
        <Link to="/careerpages">💼 Career Pages</Link>
        <Link to="/expiredjobs">⛔ Expired Jobs</Link>
        <Link to="/playlists">🎬 YouTube Playlists</Link>
        <Link to="/interviewquestions">📖 Interview Questions</Link>
        <Link to="/importantupdates">📢 Important Updates</Link>
      </div>
    </div>
  );
}

export default QuickLinks;