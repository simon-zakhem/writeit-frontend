import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../Components/Profile/UserContext";
import BeatLoader from "react-spinners/BeatLoader";
import postService from "../Services/postService";
import "../Components/Posts/Post";

const PostPage = () => {

    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [commentInput, setCommentInput] = useState('');
    const [comments, setComments] = useState([]);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();

    const deletePost = async () => {
        await postService.deletePost({infoId: info._id});
    }

    const deleteComment = async (commentId) => {
        await postService.deleteComment({commentId});
        setComments((prevComments) => prevComments.filter(comment => comment._id !== commentId));
    };

    const handleCommentInputChange = (event) => {
        const input = event.target.value;
        if (input.length <= 400) {
            setCommentInput(input);
        }
    };

    const handleLikeClick = () => {
        postService.handleLikeClick(info, isLiked, setIsLiked, setInfo);
    };

    const submitComment = () => {
        postService.submitComment({
            infoId: info._id,
            commentInput,
            userInfo,
            setComments,
            setCommentInput,
        });
    };

    useEffect(() => {
        const fetchInfo = () => {
            postService.fetchInfo(id, setInfo, setIsLiked);
        };
    
        const fetchComments = () => {
            postService.fetchComments(id, setComments);
        };

        fetchInfo();
        fetchComments();
    }, [id]);

    if (!info) {
        return <div className="loading-container" style={{ marginTop: '10vh' }}>
            <BeatLoader loading={loading} size={50} color="black"/>
        </div>;
    }

    // makes sure the username does not get deleted after page refresh
    const username = userInfo?.result?.data?.username || userInfo?.username;
 
    return (
        <div>
            <div className="title" style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{info.title}</h1>
            </div>
            <div className="image" style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={"http://localhost:3001/" + info.cover}></img>
            </div>
            <div className="post-page">
                <time>Latest Modification: {formatISO9075(new Date(info.updatedAt))}</time>
                <div className="author">{info.author.username}</div>
            </div>
            {userInfo?.result !== null && (
                userInfo?.result?.data?._id === info.author._id && (
                <div className="edit-row">
                    <Link className="edit-btn materialUIButton" to={'/edit/' + info._id}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 svg-icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                        Edit Post
                    </Link>
                    <Link className="delete-btn materialUIDeleteButton" onClick={deletePost} to={'/'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                        Delete Post
                    </Link>
                </div>
                )
            )}
            <div dangerouslySetInnerHTML={{__html: info.content}}/>

            {username && (
                <div className="comment-input">
                    <div className="like-section">
                        <svg onClick={handleLikeClick}
                            xmlns="http://www.w3.org/2000/svg"
                            fill={isLiked ? "#55c2da" : "white"}
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                            style={{ cursor: "pointer" }}>
                            <path stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"/>
                        </svg>
                        <span>{info.likes}</span>
                    </div>
                    <input
                        type="text"
                        value={commentInput}
                        onChange={handleCommentInputChange}
                        placeholder="Write a comment (max 400 characters)..."
                    />
                    <button
                        onClick={submitComment}
                        style={{
                            width: '40%',
                            marginLeft: '30%',
                            marginRight: '30%',
                            marginTop: '10px',
                        }}>
                        Add Comment
                    </button>
                </div>
            )}
            <div className="comments">
                {comments.map((comment) => (
                    <div key={comment._id} className="comment-box">
                        {comment.postedBy.username === info.author.username ? (
                            <p>
                                <strong>{comment.postedBy.username} (author):</strong> {comment.content}
                            </p>
                        ) : (
                            <p>
                                <strong>{comment.postedBy.username}:</strong> {comment.content}
                            </p>
                        )}
                        <div className="comment-details">
                            <p className="comment-date">
                                {formatISO9075(new Date(comment.updatedAt))}
                            </p>
                            {userInfo?.result?.data?.username === comment.postedBy.username && (
                                
                                <button onClick={() => deleteComment(comment._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg> 
                                </button>
                            )} 
                        </div>
                    </div> 
                ))}
            </div>
        </div>
    );
};

export default PostPage;