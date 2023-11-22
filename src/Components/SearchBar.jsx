import {React, useState, useEffect} from 'react';
import {FaSearch} from 'react-icons/fa';
import "./search.css"

const SearchBar = ({filterPosts}) => {

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        filterPosts(searchQuery);
    }, [searchQuery]);

    return(
        <div className="input-wrapper">
            <FaSearch id='search-icon'/>
            <input placeholder="Search Posts Here..."
             value={searchQuery} 
             onChange={e => setSearchQuery(e.target.value)} />
        </div>
    );
};

export default SearchBar;