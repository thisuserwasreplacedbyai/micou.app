// save completed sessions to mongodb
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/sessions';

export const createSession = async (sessionData) => {
  const response = await axios.post(API_URL, sessionData, {
    withCredentials: true
  });
  return response.data;
};

// get all user sessions
export const getAllSessions = async () => {
  const response = await axios.get('http://localhost:5000/api/sessions', {
    withCredentials: true
  });
  return response.data;
};

// delete a session
export const deleteSession = async (sessionId) => {
  const response = await axios.delete(`http://localhost:5000/api/sessions/${sessionId}`, {
    withCredentials: true
  });
  return response.data;
};

// get week stats
export const getWeekStats = async () => {
  const response = await axios.get('http://localhost:5000/api/stats/week', {
    withCredentials: true
  });
  return response.data;
};

// get alltime stats
export const getAllTimeStats = async () => {
  const response = await axios.get('http://localhost:5000/api/stats/alltime', {
    withCredentials: true
  });
  return response.data;
};

// get streak
export const getStreak = async () => {
  const response = await axios.get('http://localhost:5000/api/stats/streak', {
    withCredentials: true
  });
  return response.data;
};