import React, { useEffect, useState } from "react";
import axios from "axios";

const LiveClassesList = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/liveclasses")
      .then((res) => setClasses(res.data))
      .catch((err) => console.error("Error fetching live classes:", err));
  }, []);

  return (
    <div className="live-classes-container">
      <h2>🎥 Upcoming Live Art Classes</h2>
      <div className="live-class-grid">
        {classes.length === 0 ? (
          <p>No live classes available yet.</p>
        ) : (
          classes.map((cls) => (
            <div key={cls.id} className="live-class-card">
              <h3>{cls.title}</h3>
              <p>{cls.description}</p>
              <p>📅 {cls.date}</p>
              <a
                href={cls.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="join-btn"
              >
                Join Class
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LiveClassesList;
