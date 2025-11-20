import { useState } from 'react';
import './Timer.css';
import { createSession } from '../services/sessionService';
import SessionCompleteModal from '../components/SessionCompleteModal';
import { useTimer } from '../contexts/TimerContext';

function Timer() {
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  
  // get timer state and actions from context
  const {
    selectedActivity,
    isTimerStarted,
    isPaused,
    startTime,
    elapsedSeconds,
    notes,
    setSelectedActivity,
    setNotes,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    resetTimer
  } = useTimer();

  const activities = [
    { value: 'work', label: 'work', emoji: '💼' },
    { value: 'study', label: 'study', emoji: '📚' },
    { value: 'read', label: 'read', emoji: '📖' },
    { value: 'code', label: 'code', emoji: '💻' },
    { value: 'write', label: 'write', emoji: '✍️' }
  ];

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
      return;
    }
    startTimer(selectedActivity);
  };

  const handlePause = () => {
    pauseTimer();
  };

  const handleResume = () => {
    resumeTimer();
  };

  const handleStop = () => {
    setShowCompleteModal(true);
  };

  const handleSaveSession = async ({ activity, notes: finalNotes }) => {
    const endTime = new Date();
    const durationMinutes = Math.floor(elapsedSeconds / 60);
    
    try {
      await createSession({
        activity: activity,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration: durationMinutes,
        notes: finalNotes
      });
      
      console.log('session saved to database');
      
      // close modal and reset timer
      setShowCompleteModal(false);
      resetTimer();
    } catch (error) {
      console.error('failed to save session:', error);
      alert('failed to save session. please try again.');
    }
  };

  return (
    <>
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
                  placeholder="add notes about this session... (optional)"
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

      <SessionCompleteModal
        isOpen={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        onSave={handleSaveSession}
        initialActivity={selectedActivity}
        initialNotes={notes}
        duration={Math.floor(elapsedSeconds / 60)}
      />
    </>
  );
}

export default Timer;