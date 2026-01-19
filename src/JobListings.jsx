import React, { useEffect, useState, useCallback } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import "./JobListings.css";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1Cfm8Sn2dkJZ8kMJJ4oHCRTbkW-XCZkRG7fxxza59ORZm0EaEZkJbSLePgWPONWY84j9VSH5qs4Qc/pub?gid=0&single=true&output=csv";

  // ✅ Helper to parse DD/MM/YYYY or normal date
  const parseDate = (str) => {
    if (!str) return null;
    const trimmed = str.trim();
    let d = new Date(trimmed);
    if (!isNaN(d)) return d;
    // handle DD/MM/YYYY
    const parts = trimmed.split("/");
    if (parts.length === 3) {
      const [dd, mm, yyyy] = parts;
      return new Date(`${yyyy}-${mm}-${dd}T23:59:59`);
    }
    return null;
  };

  const fetchJobs = useCallback(() => {
    setLoading(true);
    setError(null);

    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      complete: (result) => {
        if (result.errors.length) {
          console.error("CSV Parse Error:", result.errors);
          setError("Failed to load jobs. Please try again.");
        } else {
          const now = new Date();
          // ✅ Filter jobs whose LastDate is still valid
          const validJobs = result.data.filter((job) => {
            const d = parseDate(job.LastDate);
            return d && d >= now;
          });
          setJobs(validJobs.slice(0, 3)); // पहले 3 दिखाओ
        }
        setLoading(false);
      },
      error: (err) => {
        console.error("CSV Fetch Error:", err);
        setError("Error fetching jobs. Please try again.");
        setLoading(false);
      },
    });
  }, [CSV_URL]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="job-listings">
      <h2 className="section-title">💼 Job Listings</h2>
      <div className="job-listings-box">
        {loading && (
          <div style={{ 
            minHeight: '380px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <p className="loading">⏳ Loading Jobs…</p>
          </div>
        )}

        {error && (
          <div className="error-container" style={{ 
            minHeight: '380px', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <p className="error">{error}</p>
            <button className="retry-btn" onClick={fetchJobs}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && jobs.length > 0 && (
          <>
            <table className="job-table">
              <thead>
                <tr>
                  <th>Post Name</th>
                  <th>Department</th>
                  <th>Last Date</th>
                  <th>Apply Link</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <tr key={index}>
                    <td>{job.Post}</td>
                    <td>{job.Department}</td>
                    <td>{job.LastDate}</td>
                    <td>
                      <a
                        href={job.ApplyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Apply Now
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="view-more-wrapper">
              <button
                className="view-more-btn"
                onClick={() => navigate("/joblistingsbrief")}
              >
                View More
              </button>
            </div>
          </>
        )}

        {!loading && !error && jobs.length === 0 && (
          <div style={{ 
            minHeight: '380px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <p className="error">No jobs available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListings;