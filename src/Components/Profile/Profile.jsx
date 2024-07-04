import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import profileService from '../../Services/profileService'; // You need to create this service
import './profile.css';

const Profile = () => {
  const { username } = useParams();
  const { userInfo } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getProfile(username);
        setProfile(data);
        setIsFollowing(data.isFollowing);
        setBio(data.bio);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [username]);

  const handleFollow = async () => {
    try {
      await profileService.followUser(username);
      setIsFollowing(true);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await profileService.unfollowUser(username);
      setIsFollowing(false);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bio', bio);
    if (profilePic) formData.append('profile', profilePic);
    if (coverPhoto) formData.append('cover', coverPhoto);

    try {
      const updatedProfile = await profileService.updateProfile(formData);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <img src={profile.cover} alt="Cover" className="cover-photo" />
        <img src={profile.profile} alt="Profile" className="profile-photo" />
      </div>
      <div className="profile-info">
        <h1>{profile.username}</h1>
        <p>{profile.bio}</p>
        <p>{profile.followers} Followers</p>
        <p>{profile.following} Following</p>
        {userInfo?.username === username ? (
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        ) : (
          isFollowing ? (
            <button onClick={handleUnfollow}>Unfollow</button>
          ) : (
            <button onClick={handleFollow}>Follow</button>
          )
        )}
        <button><Link to={`/messages/${username}`}>Message</Link></button>
      </div>
      {isEditing && (
        <form onSubmit={handleEdit} className="edit-profile-form">
          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Update bio"
          />
          <input
            type="file"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
          <input
            type="file"
            onChange={(e) => setCoverPhoto(e.target.files[0])}
          />
          <button type="submit">Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      )}
      <div className="profile-posts">
        {profile.posts && profile.posts.map(post => (
          <div key={post._id} className="post">
            <h2>{post.title}</h2>
            <p>{post.summary}</p>
            <Link to={`/post/${post._id}`}>Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
