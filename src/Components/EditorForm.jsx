import ReactQuill from "react-quill";
import "../Components/edit.css";

const EditorForm = ({value, onChange}) => {

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
    };
    
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    return(
        <ReactQuill className="editor-input"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}/>
    );
}

export default EditorForm;