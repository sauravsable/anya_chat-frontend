import axios from 'axios';

const API_URL = 'https://anya-chat-backend.onrender.com';

export const login = async (identifier, password) => {
  const response = await axios.post(`${API_URL}/api/auth/local`, {
    identifier,
    password,
  });
  return response.data;
};
