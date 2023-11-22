import {React, useEffect, useState} from "react";
import Post from "../Components/Post";
import axios from 'axios';
import '../HomeP.css';
import SearchBar from "../Components/SearchBar";
import respng from '../img/no-result.png';
import RiseLoader from 'react-spinners/RiseLoader';

const HomePage = () =>{

    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/post/post');
                setPosts(response.data.data);
                setFilteredPosts(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchPosts();
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