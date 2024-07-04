import axios from 'axios';

const deletePost = async ({infoId}) => {
    try {
        await axios.delete(`http://localhost:3001/api/post/post/${infoId}`);
    } catch (error) {
        console.error('Axios error:', error);
    }
};

const deleteComment = async ({commentId}) => {
    try {
        await axios.delete(`http://localhost:3001/api/comment/comment/${commentId}`);
    } catch (error) {
        console.error('Axios error:', error);
    }
};

const submitComment = async ({ infoId, commentInput, userInfo, setComments, setCommentInput }) => {
    try {
        const response = await axios.post(
            `http://localhost:3001/api/comment/comment/${infoId}`,
            {
                content: commentInput,
                story: infoId,
            },
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const newComment = {
            ...response.data.data,
            postedBy: {
                username: userInfo?.result?.data?.username,
            },
        };

        setComments((prevComments) => [...prevComments, newComment]);

        setCommentInput('');
    } catch (error) {
        console.error('Axios error:', error);
    }
};

const fetchInfo = async (id, setInfo, setIsLiked) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/post/post/${id}`, {
            withCredentials: true,
        });
        setInfo(response.data.data);

        setIsLiked(response.data.data.isLiked);
    } catch (error) {
        console.error('Axios error:', error);
    }
};

const fetchComments = async (id, setComments) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/comment/comment/${id}`);
        setComments(response.data.data);
    } catch (error) {
        console.error('Axios error:', error);
    }
};

const handleLikeClick = async (info, isLiked, setIsLiked, setInfo) => {
    try {
        const response = isLiked
            ? await axios.post(`http://localhost:3001/api/post/post/${info._id}/unlike/`, {}, { withCredentials: true })
            : await axios.post(`http://localhost:3001/api/post/post/${info._id}/like`, {}, { withCredentials: true });

        if (response.status === 200) {
            setIsLiked(!isLiked);
            setInfo((prevInfo) => ({
                ...prevInfo,
                likes: isLiked ? prevInfo.likes - 1 : prevInfo.likes + 1,
            }));
        } else {
            console.error('Failed to toggle like:', response.message);
        }
    } catch (error) {
        console.error('Error toggling like:', error);
    }
};

const postService = {
    deletePost,
    deleteComment,
    submitComment,
    fetchInfo,
    fetchComments,
    handleLikeClick,
};

export default postService;