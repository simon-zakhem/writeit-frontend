import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import EditorForm from './EditorForm';
import '../Components/edit.css';

const Create = () => {

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleSummaryChange = (e) => {
      const maxLength = 180;
      const inputValue = e.target.value;
      const truncatedValue = inputValue.length <= maxLength ? inputValue : inputValue.slice(0, maxLength);
      setSummary(truncatedValue);
    };

    const handleTitleChange = (e) => {
      const maxLength = 60;
      const inputValue = e.target.value;
      const truncatedValue = inputValue.length <= maxLength ? inputValue : inputValue.slice(0, maxLength);
      setTitle(truncatedValue);
    };

    const createPost = async (ev) => {
        ev.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('content', content);
        formData.append('file', files[0]);
    
        try {
          const response = await axios.post('http://localhost:3001/api/post/post', formData, {
            withCredentials: true, // Include cookies in the request
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        
          if(response.status === 200){
            setRedirect(true);
          }
        } catch (error) {
          console.error('Axios error:', error);
          // Handle the error as needed
        }
    };

    if(redirect){
        return <Navigate to={'/'}/>
    }

    return (
      <form onSubmit={createPost} className="create-form">
        <label htmlFor="title" className="form-label">
          Title (Limit to 60 characters)
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            className="form-input"
          />
        </label>
        <label htmlFor="summary" className="form-label">
          Summary (Limit 180 characters)
          <input
            type="text"
            id="summary"
            placeholder="Summary"
            value={summary}
            onChange={handleSummaryChange}
            className="form-input"
          />
        </label>
        <label htmlFor="file" className="form-label">
          File
          <input
            type="file"
            id="file"
            onChange={(e) => setFiles(e.target.files)}
            className="form-input"
          />
        </label>
        <label htmlFor="editor" className="form-label">
          Editor
          <EditorForm value={content} onChange={setContent} className="editor-input" />
        </label>
        <button type="submit" className="form-button">
          Create
        </button>
      </form>
    );
};

export default Create;