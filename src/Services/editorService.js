import axios from 'axios';

const createPost = async ({ title, summary, content, files }) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    formData.append('file', files[0]);

    try {
        const response = await axios.post('http://localhost:3001/api/post/post', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        console.error('Axios error:', error);
        throw error;
    }
};

const fetchData = async (postId) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/post/post/${postId}`);
        const postInfo = response.data.data;
        
        if (postInfo && postInfo.title && postInfo.summary && postInfo.content) {
            return postInfo;
        } else {
            throw new Error('Invalid post data structure');
        }
    } catch (error) {
        console.error('Axios error:', error);
        throw error;
    }
};

const editPost = async (postId, title, summary, content, files) => {

    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    if (files?.[0]) {
        formData.append('file', files?.[0]);
    }

    try {
        const response = await axios.put(`http://localhost:3001/api/post/post/${postId}`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        console.error('Axios error:', error);
        throw error;
    }
};

const editorService = {
    createPost,
    fetchData,
    editPost,
};

export default editorService;