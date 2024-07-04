import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';
import EditorForm from './EditorForm';
import editorService from '../../Services/editorService';

const Edit = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const postInfo = await editorService.fetchData(id);
                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };

        fetchPostData();
    }, [id]);

    const handleEditPost = async (ev) => {
      ev.preventDefault();
  
      try {
          await editorService.editPost(id, title, summary, content, files);
          setRedirect(true);
      } catch (error) {
          console.error('Error editing post:', error);
      }
    };
  

    if(redirect){
        return <Navigate to={`/post/${id}`}/>
    }

    return (
        <form onSubmit={handleEditPost} className="edit-form">
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