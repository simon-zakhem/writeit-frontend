import axios from 'axios';

const login = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:3001/api/auth/login', {
      username,
      password,
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

const signup = async (username, email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        username,
        email,
        password,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      return response.data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
};

const authService = {
  login,
  signup,
};

export default authService;