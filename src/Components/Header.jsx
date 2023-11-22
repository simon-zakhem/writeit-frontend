// import {React, useContext, useEffect, useState} from "react";
// import { Link } from "react-router-dom";
// import axios from 'axios';
// import { UserContext } from "./UserContext";
// import logo from '../img/logo.png';
// import "./header.css"

// const Header = () =>{

//     const {setUserInfo, userInfo} = useContext(UserContext);

//     useEffect(() => {
//         axios.get('http://localhost:3001/api/auth/profile', {
//           withCredentials: true,
//         })
//         .then(response => {
//           setUserInfo(userInfo);
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     }, []);
    
//     function logout() {
//         axios.post('http://localhost:3001/api/auth/logout', null, {
//           withCredentials: true,
//         })
//         .then(response => {
//             setUserInfo(null);
//         })
//         .catch(error => {
//           // Handle any errors here
//           console.error(error);
//         });
//     }

//     const username = userInfo?.result?.data?.username;

//     return(
//         <header>
//             <Link to="/" className="logo">
//                 <img src={logo} style={{ width: '90px', height: 'auto' }}/>
//             </Link>
//             {username && (
//                 <div className="user-welcome">
//                     <span>{`Hello, ${username}`}</span>
//                 </div>
//             )}
//             {/* <SearchBar /> */}
//             <nav>
//                 {username && (
//                     <>
//                         <Link to={'/create'} className="auth-link">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 svg-icon">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
//                             </svg>
//                         </Link>
//                         <a onClick={logout} className="auth-link">Logout</a>
//                     </>
//                 )}
//                 {!username && (
//                     <>
//                         <Link to="/login" className="auth-link">Login</Link>
//                         <Link to="/signup" className="auth-link">Signup</Link>
//                     </>
//                 )}
//             </nav>
//         </header>
//     )
// }

// export default Header;

import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "./UserContext";
import logo from '../img/logo.png';
import "./header.css";

const Header = () => {
    // Check if user information exists in localStorage
    const { setUserInfo, userInfo } = useContext(UserContext);
    const storedUserInfo = localStorage.getItem('userInfo');
    console.log(storedUserInfo);
    console.log(userInfo);

    useEffect(() => {

        if (storedUserInfo) {
            // If user information exists, update the context
            setUserInfo(JSON.parse(storedUserInfo));
        } else {
            // If user information doesn't exist, fetch it from the server
            axios.get('http://localhost:3001/api/auth/profile', {
                withCredentials: true,
            })
                .then(response => {
                    setUserInfo(response.data);
                    // Save user information to localStorage
                    localStorage.setItem('userInfo', JSON.stringify(response.data));
                    console.log(response)
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [setUserInfo]);

    // useEffect(() => {
        
    // })

    function logout() {
        axios.post('http://localhost:3001/api/auth/logout', null, {
            withCredentials: true,
        })
            .then(response => {
                setUserInfo(null);
                // Clear user information from localStorage
                localStorage.removeItem('userInfo');
            })
            .catch(error => {
                // Handle any errors here
                console.error(error);
            });
    }

    const username = userInfo?.result?.data?.username;
    // const username = storedUserInfo?.username;
    console.log(username)

    return (
        <header>
            <Link to="/" className="logo">
                <img src={logo} style={{ width: '90px', height: 'auto' }} alt="Logo" />
            </Link>
            {username && (
                <div className="user-welcome">
                    <span>{`Hello, ${username}`}</span>
                </div>
            )}
            <nav>
                {username ? (
                    <>
                        <Link to={'/create'} className="auth-link">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 svg-icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </Link>
                        <span onClick={logout} className="auth-link">Logout</span>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="auth-link">Login</Link>
                        <Link to="/signup" className="auth-link">Signup</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
