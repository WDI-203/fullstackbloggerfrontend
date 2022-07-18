import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PostBlogPage = (props) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [text, setText] = useState("")
    const [validationMessage, setValidationMessage] = useState("")
    const navigate = useNavigate()
    return (
        <div>
            <h1>Post Blog Page</h1>
            <h3>{validationMessage}</h3>
            <br/>
            <label>Title</label>
            <input type="text" onChange={(e)=>{
                setTitle(e.target.value)
            }} />
            <br/>
            <label>Author</label>
            <input type="text" onChange={(e)=>{
                setAuthor(e.target.value)
            }} />
            <br/>
            <label>Text</label>
            <textarea type="text" onChange={(e)=>{
                setText(e.target.value)
            }} />
            <br/>
            <button onClick={()=>{
                const newBlogData = {
                    title,
                    author,
                    text
                }
                props.blogSubmit(newBlogData)
                navigate("/")
            }}>Submit</button>
        </div>
    )
}

export default PostBlogPage