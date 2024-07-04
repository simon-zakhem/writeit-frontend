import axios from 'axios';

const fetchPosts = async (setPosts, setFilteredPosts, setLoading) => {
    try {
        const response = await axios.get('http://localhost:3001/api/post/post');
        setPosts(response.data.data);
        setFilteredPosts(response.data.data);
        setLoading(false);
    } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
    }
};

const logout = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/logout', null, {
        withCredentials: true,
      });
  
      return response.data;
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
};
  
const profile = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/auth/profile', {
            withCredentials: true,
        });
  
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};

const homeService = {
    fetchPosts,
    logout,
    profile,
};

export default homeService;