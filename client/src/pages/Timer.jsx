import { useState, useEffect } from 'react';
import './Timer.css';
import { createSession } from '../services/sessionService';

function Timer() {
  const [selectedActivity, setSelectedActivity] = useState('');
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [notes, setNotes] = useState('');

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
    
    if (isTimerStarted && !isPaused) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerStarted, isPaused]);

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
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleStop = async () => {
    // calculate duration in minutes
    const durationMinutes = Math.floor(elapsedSeconds / 60);
    const endTime = new Date();
    
    try {
      // save session to database
      await createSession({
        activity: selectedActivity,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration: durationMinutes,
        notes: notes
      });
      
      console.log('session saved to database');
      
      // reset everything
      setIsTimerStarted(false);
      setIsPaused(false);
      setSelectedActivity('');
      setStartTime(null);
      setElapsedSeconds(0);
      setNotes('');
      
      alert(`session saved! ${durationMinutes} minutes of ${selectedActivity}`);
    } catch (error) {
      console.error('failed to save session:', error);
      alert('failed to save session. please try again.');
    }
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
              {isPaused && <span className="pause-indicator"> (paused)</span>}
            </div>
            <div className="timer-display">{formatTime(elapsedSeconds)}</div>
            
            {/* notes field */}
            <div className="timer-notes">
              <textarea
                placeholder="notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="3"
                maxLength="500"
              />
            </div>

            <div className="timer-controls">
              {!isPaused ? (
                <button className="btn-secondary" onClick={handlePause}>
                  pause
                </button>
              ) : (
                <button className="btn-secondary" onClick={handleResume}>
                  resume
                </button>
              )}
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