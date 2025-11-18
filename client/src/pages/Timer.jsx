import { useState, useEffect } from 'react';
import './Timer.css';

function Timer() {
  const [selectedActivity, setSelectedActivity] = useState('');
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const activities = [
    { value: 'work', label: 'work', emoji: '💼' },
    { value: 'study', label: 'study', emoji: '📚' },
    { value: 'read', label: 'read', emoji: '📖' },
    { value: 'code', label: 'code', emoji: '💻' },
    { value: 'write', label: 'write', emoji: '✍️' }
  ];

  // timer counting logic
  useEffect(() => {
    let interval = null;
    
    if (isTimerStarted && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now - startTime) / 1000);
        setElapsedSeconds(elapsed);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerStarted, startTime]);

  // format seconds into HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
  };

  const handleStart = () => {
    if (!selectedActivity) {
      alert('please select an activity first');
      return;
    }
    setStartTime(new Date());
    setIsTimerStarted(true);
  };

  const handleStop = () => {
    // calculate duration in minutes
    const durationMinutes = Math.floor(elapsedSeconds / 60);
    
    console.log('session completed:', {
      activity: selectedActivity,
      startTime: startTime,
      endTime: new Date(),
      duration: durationMinutes,
      elapsedSeconds: elapsedSeconds
    });

    // reset everything
    setIsTimerStarted(false);
    setSelectedActivity('');
    setStartTime(null);
    setElapsedSeconds(0);
    
    alert(`session saved! ${durationMinutes} minutes of ${selectedActivity}`);
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
            <div className="timer-display">{formatTime(elapsedSeconds)}</div>
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