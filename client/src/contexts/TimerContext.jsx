// global timer context - persists across routes
import { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [selectedActivity, setSelectedActivity] = useState('');
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [notes, setNotes] = useState('');

  // timer counting logic - runs globally
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

  const startTimer = (activity) => {
    setSelectedActivity(activity);
    setStartTime(new Date());
    setIsTimerStarted(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const stopTimer = () => {
    // returns session data for saving
    return {
      activity: selectedActivity,
      startTime: startTime,
      duration: Math.floor(elapsedSeconds / 60),
      notes: notes
    };
  };

  const resetTimer = () => {
    setIsTimerStarted(false);
    setIsPaused(false);
    setSelectedActivity('');
    setStartTime(null);
    setElapsedSeconds(0);
    setNotes('');
  };

  const value = {
    // state
    selectedActivity,
    isTimerStarted,
    isPaused,
    startTime,
    elapsedSeconds,
    notes,
    // actions
    setSelectedActivity,
    setNotes,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    resetTimer
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within TimerProvider');
  }
  return context;
}