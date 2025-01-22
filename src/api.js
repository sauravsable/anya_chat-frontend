import axios from 'axios';

const API_URL = 'http://localhost:1337';

export const register = async (username, email, password) => {

  console.log(username,email,password);
  
  const response = await axios.post(`${API_URL}/api/auth/local/register`, {
    username,
    email,
    password,
  });
  return response.data;
};

export const login = async (identifier, password) => {
  const response = await axios.post(`${API_URL}/api/auth/local`, {
    identifier,
    password,
  });
  return response.data;
};
