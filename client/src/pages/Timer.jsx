import { useState } from 'react';
import './Timer.css';

function Timer() {
  const [selectedActivity, setSelectedActivity] = useState('');
  const [isTimerStarted, setIsTimerStarted] = useState(false);

  const activities = [
    { value: 'work', label: 'work', emoji: '💼' },
    { value: 'study', label: 'study', emoji: '📚' },
    { value: 'read', label: 'read', emoji: '📖' },
    { value: 'code', label: 'code', emoji: '💻' },
    { value: 'write', label: 'write', emoji: '✍️' }
  ];

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
  };

  const handleStart = () => {
    if (!selectedActivity) {
      alert('please select an activity first');
      return;
    }
    setIsTimerStarted(true);
  };

  const handleStop = () => {
    setIsTimerStarted(false);
    // handle session saving later
  };

  return (
    <div className="timer-page">
      {!isTimerStarted ? (
        <div className="activity-selector">
          <h1>what are you working on?</h1>
          <div className="activities-grid">
            {activities.map((activity) => (
              <button
                key={activity.value}
                className={`activity-button ${selectedActivity === activity.value ? 'selected' : ''}`}
                onClick={() => handleActivitySelect(activity.value)}
              >
                <span className="activity-emoji">{activity.emoji}</span>
                <span className="activity-label">{activity.label}</span>
              </button>
            ))}
          </div>
          <button 
            className="btn-primary start-button" 
            onClick={handleStart}
            disabled={!selectedActivity}
          >
            start session
          </button>
        </div>
      ) : (
        <div className="timer-active">
          <div className="timer-overlay">
            <div className="timer-activity">
              <span className="activity-label-active">
                {activities.find(a => a.value === selectedActivity)?.emoji} {selectedActivity}
              </span>
            </div>
            <div className="timer-display">00:00:00</div>
            <div className="timer-controls">
              <button className="btn-primary" onClick={handleStop}>
                finish session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Timer;