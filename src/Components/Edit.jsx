import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import EditorForm from './EditorForm';

const Edit = () => {

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/post/post/${id}`);
                const postInfo = response.data.data;
                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);
            } catch (error) {
                console.error('Axios error:', error);
                // Handle the error as needed
            }
        };

        fetchData();
    }, [id]);

    const editPost = async (ev) => {
        ev.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('content', content);
        formData.append('id', id);
        if (files?.[0]) {
            formData.append('file', files?.[0]);
        }
    
        try {
            const response = await axios.put(`http://localhost:3001/api/post/post/${id}`, formData, {
                withCredentials: true, // Include cookies with the request
            });
    
            if (response.status === 200) { 
                setRedirect(true);
            }
        } catch (error) {
            console.error('Axios error:', error);
            // Handle the error as needed
        }
    };

    if(redirect){
        return <Navigate to={`/post/${id}`}/>
    }

    return (
        <form onSubmit={editPost} className="edit-form">
          <label htmlFor="title" className="form-label">
          Title (Limit to 60 characters)
            <input
              type="text"
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              onChange={(e) => setSummary(e.target.value)}
              className="form-input"
            />
          </label>
          <label htmlFor="file" className="form-label">
            File
            <input
              type="file"
              onChange={(e) => setFiles(e.target.files)}
              className="form-input"
            />
          </label>
          <label htmlFor="editor" className="form-label">
            Editor
            <EditorForm value={content} onChange={setContent} className="editor-input" />
          </label>
          <button type="submit" style={{ marginTop: "5px" }} className="form-button">
            Update
          </button>
        </form>
      );
}

export default Edit;