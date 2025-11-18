// save completed sessions to mongodb
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/sessions';

export const createSession = async (sessionData) => {
  const response = await axios.post(API_URL, sessionData, {
    withCredentials: true
  });
  return response.data;
};

export const getAllSessions = async () => {
  const response = await axios.get(API_URL, {
    withCredentials: true
  });
  return response.data;
};

export const deleteSession = async (sessionId) => {
  const response = await axios.delete(`${API_URL}/${sessionId}`, {
    withCredentials: true
  });
  return response.data;
};