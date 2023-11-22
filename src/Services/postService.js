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

        // Assuming the server responds with the new comment
        const newComment = {
            ...response.data.data,
            postedBy: {
                username: userInfo?.result?.data?.username,
                // Add other user information if needed
            },
        };

        // Update the state to include the new comment
        setComments((prevComments) => [...prevComments, newComment]);

        // Clear the comment input
        // (Note: This assumes setCommentInput is a state-setting function in your PostPage component)
        setCommentInput('');
    } catch (error) {
        console.error('Axios error:', error);
    }
};

const postService = {
    deletePost,
    deleteComment,
    submitComment,
}

export default postService;