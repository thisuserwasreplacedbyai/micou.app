// profile page - shows user stats and session history
import { useState, useEffect } from 'react';
import { getAllSessions, deleteSession, getWeekStats, getAllTimeStats, getStreak } from '../services/sessionService';
import './Profile.css';

function Profile() {
  const [sessions, setSessions] = useState([]);
  const [weekStats, setWeekStats] = useState({});
  const [allTimeStats, setAllTimeStats] = useState({});
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  // fetch all data
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [sessionsData, weekData, allTimeData, streakData] = await Promise.all([
        getAllSessions(),
        getWeekStats(),
        getAllTimeStats(),
        getStreak()
      ]);

      setSessions(sessionsData);
      setWeekStats(weekData);
      setAllTimeStats(allTimeData);
      setStreak(streakData.streak);
      setLoading(false);
    } catch (error) {
      console.error('error fetching profile data:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (sessionId) => {
    if (!window.confirm('delete this session?')) return;

    try {
      await deleteSession(sessionId);
      // refresh all data after deletion
      fetchAllData();
    } catch (error) {
      console.error('error deleting session:', error);
    }
  };

  // format duration from minutes to readable string
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins}min`;
  };

  // format date to readable string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="profile-container">loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>your progress</h1>
      </div>

      {/* streak display */}
      <div className="streak-card">
        <div className="streak-display">
          <span className="flame-icon">🔥</span>
          <span className="streak-number">{streak}</span>
          <span className="streak-label">day streak</span>
        </div>
      </div>

      {/* stats grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>this week</h3>
          {Object.keys(weekStats).length === 0 ? (
            <p className="no-data">no sessions this week</p>
          ) : (
            <div className="activity-list">
              {Object.entries(weekStats).map(([activity, duration]) => (
                <div key={activity} className="activity-row">
                  <span className="activity-name">{activity}</span>
                  <span className="activity-time">{formatDuration(duration)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="stat-card">
          <h3>all time</h3>
          {Object.keys(allTimeStats).length === 0 ? (
            <p className="no-data">no sessions yet</p>
          ) : (
            <div className="activity-list">
              {Object.entries(allTimeStats).map(([activity, duration]) => (
                <div key={activity} className="activity-row">
                  <span className="activity-name">{activity}</span>
                  <span className="activity-time">{formatDuration(duration)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* recent sessions */}
      <div className="sessions-card">
        <h3>recent sessions</h3>
        {sessions.length === 0 ? (
          <p className="no-data">no sessions yet. start your first session!</p>
        ) : (
          <div className="sessions-list">
            {sessions.map(session => (
              <div key={session._id} className="session-row">
                <div className="session-info">
                  <span className="session-date">{formatDate(session.startTime)}</span>
                  <span className="session-activity">{session.activity}</span>
                  <span className="session-duration">{formatDuration(session.duration)}</span>
                </div>
                {session.notes && (
                  <div className="session-notes">"{session.notes}"</div>
                )}
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(session._id)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;