import axios from 'axios';

const API_URL = 'http://localhost:3001/api/profile';

const getProfile = async (username) => {
  const response = await axios.get(`${API_URL}/${username}`);
  return response.data;
};

const followUser = async (username) => {
  const response = await axios.post(`${API_URL}/${username}/follow`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

const unfollowUser = async (username) => {
  const response = await axios.post(`${API_URL}/${username}/unfollow`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

const updateProfile = async (formData) => {
  const response = await axios.put(`${API_URL}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export default {
  getProfile,
  followUser,
  unfollowUser,
  updateProfile
};
