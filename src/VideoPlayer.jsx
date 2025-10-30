import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./VideoPlayer.css";

export default function VideoPlayer() {
  const location = useLocation();
  const navigate = useNavigate();

  const { title, url, playlistVideos } = location.state || {};

  // handle no data
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
    const videoMatch = videoURL.match(/v=([^&]+)/);
    const listMatch = videoURL.match(/list=([^&]+)/);
    if (listMatch)
      return `https://www.youtube.com/embed/videoseries?list=${listMatch[1]}`;
    if (videoMatch)
      return `https://www.youtube.com/embed/${videoMatch[1]}`;
    return videoURL;
  };

  return (
    <div className="video-player-page">
      <div className="video-layout">
        {/* LEFT SIDE — Main Player */}
        <div className="video-section">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <div className="video-container">
            <iframe
              src={getEmbedURL(url)}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <h2 className="video-title">{title}</h2>
        </div>

        {/* RIGHT SIDE — Playlist */}
        {playlistVideos && playlistVideos.length > 0 && (
          <div className="playlist-sidebar">
            <h3 className="playlist-heading">Playlist</h3>
            <div className="playlist-list">
              {playlistVideos.map((v, i) => (
                <div
                  key={i}
                  className="playlist-item"
                  onClick={() =>
                    navigate("/player", {
                      state: {
                        title: v.VideoTitle,
                        url: v.VideoURL,
                        playlistVideos,
                      },
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
                    {v.Topic && <span>{v.Topic}</span>}
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
