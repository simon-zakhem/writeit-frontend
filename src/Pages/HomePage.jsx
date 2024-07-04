import React, { useEffect, useState } from 'react';
import Post from '../Components/Posts/Post';
import '../HomeP.css';
import '../Components/Posts/Post.css';
import SearchBar from '../Components/Posts/SearchBar';
import respng from '../img/no-result.png';
import RiseLoader from 'react-spinners/RiseLoader';
import homeService from '../Services/homeService';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        homeService.fetchPosts(setPosts, setFilteredPosts, setLoading);
    }, []);

    const filterPosts = (query) => {
        setSearchQuery(query);
        const filteredPosts = posts.filter(post =>
            post.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredPosts(filteredPosts);
    }

    return(
        <>
            <div className="home">
                <SearchBar filterPosts={filterPosts} />
                <div className="posts-container">
                    {filteredPosts.length > 0 && filteredPosts.map(post => (
                        <Post key={post.id} {...post} />
                    ))}
                    {filteredPosts.length === 0 && searchQuery && (
                        <div className="nores-container">
                            <div className="no-results-text">No Results Found!</div>
                            <img src={respng} className="no-results-img" alt="No Results" />
                        </div>
                    )}
                    {filteredPosts.length === 0 && !searchQuery && (
                        <div className="loading-container" style={{ marginTop: '10px' }}>
                            <RiseLoader loading={loading} size={50} color="black"/>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default HomePage;