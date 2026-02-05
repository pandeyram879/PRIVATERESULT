import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./VideoPlayer.css";

export default function VideoPlayer() {
  const location = useLocation();
  const navigate = useNavigate();

  const { title, url, playlistVideos } = location.state || {};

  // Handle no data
  if (!url) {
    return (
      <div className="video-player-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <p>Video not found.</p>
      </div>
    );
  }

  const getEmbedURL = (videoURL) => {
    if (!videoURL) return "";

    // If already an embed URL, return it
    if (videoURL.includes("/embed/")) {
      return videoURL;
    }

    // Extract video ID from different YouTube URL formats
    let videoId = null;
    
    // Format 1: https://www.youtube.com/watch?v=VIDEO_ID
    let match = videoURL.match(/[?&]v=([^&]+)/);
    if (match) {
      videoId = match[1];
    }
    
    // Format 2: https://youtu.be/VIDEO_ID
    if (!videoId) {
      match = videoURL.match(/youtu\.be\/([^?&]+)/);
      if (match) {
        videoId = match[1];
      }
    }
    
    // Format 3: https://www.youtube.com/embed/VIDEO_ID
    if (!videoId) {
      match = videoURL.match(/\/embed\/([^?&]+)/);
      if (match) {
        videoId = match[1];
      }
    }

    // Check for playlist
    const listMatch = videoURL.match(/[?&]list=([^&]+)/);
    
    // If playlist exists, embed as playlist
    if (listMatch && !videoId) {
      return `https://www.youtube.com/embed/videoseries?list=${listMatch[1]}`;
    }
    
    // If video ID found, create embed URL
    if (videoId) {
      // Clean video ID (remove any extra parameters)
      videoId = videoId.split('&')[0].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`;
    }
    
    // If nothing matched, return original URL
    console.warn("Could not parse YouTube URL:", videoURL);
    return videoURL;
  };

  // Check if playlist exists and has videos
  const hasPlaylist = playlistVideos && playlistVideos.length > 0;

  // Get embed URL
  const embedUrl = getEmbedURL(url);

  return (
    <div className="video-player-page">
      <div className={`video-layout ${!hasPlaylist ? 'single-video' : ''}`}>
        {/* LEFT SIDE — Main Player */}
        <div className="video-section">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
          
          <div className="video-container">
            <iframe
              src={embedUrl}
              title={title || "Video Player"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
          <h2 className="video-title">{title || "Video"}</h2>
        </div>

        {/* RIGHT SIDE — Playlist (only if exists) */}
        {hasPlaylist && (
          <div className="playlist-sidebar">
            <h3 className="playlist-heading">Playlist ({playlistVideos.length} videos)</h3>
            <div className="playlist-list">
              {playlistVideos.map((v, i) => (
                <div
                  key={i}
                  className={`playlist-item ${url === v.VideoURL ? 'active' : ''}`}
                  onClick={() =>
                    navigate("/player", {
                      state: {
                        title: v.VideoTitle,
                        url: v.VideoURL,
                        playlistVideos, // Pass the same playlist
                      },
                      replace: true, // Replace current history entry
                    })
                  }
                >
                  {v.Thumbnail && (
                    <img
                      src={v.Thumbnail}
                      alt={v.VideoTitle}
                      className="playlist-thumb"
                    />
                  )}
                  <div className="playlist-info">
                    <p className="playlist-item-title">{v.VideoTitle}</p>
                    {v.Topic && <span className="playlist-topic">{v.Topic}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}