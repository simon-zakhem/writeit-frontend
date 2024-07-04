import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import EditorForm from './EditorForm';
import './edit.css';
import editorService from '../../Services/editorService';

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

        try {
            await editorService.createPost({ title, summary, content, files });
            setRedirect(true);
        } catch (error) {
            console.error('Error creating post:', error);
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