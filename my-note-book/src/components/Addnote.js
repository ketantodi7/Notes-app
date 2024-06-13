import React,{useContext, useState} from 'react';
import noteContext from '../context/notes/NoteContext';


const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
const [init_note, change_note] = useState({title: "", description: "", tag: ""});
    const add_note = (e) => {
        e.preventDefault()
        addNote(init_note.title, init_note.description, init_note.tag);
        change_note({title: "", description: "", tag: ""});
        props.showAlert("Note Added Successfully", "success ");
    };
    
    const onChange = (e) =>{
        change_note({
            ...init_note, [e.target.name] : e.target.value
        })
    };




    return (
        <div>
            <div className="container my-3">
                <h1 >Add A Note</h1>
                <form>
                    <div className="mb-3 my-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title"  value={init_note.title} onChange={onChange}  required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label" >Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={init_note.description} onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label" >Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={init_note.tag} onChange={onChange}/>
                    </div>
                    <button disabled={init_note.title.length<5 || init_note.description.length<5 } type="submit " className="btn btn-primary" onClick={add_note}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Addnote
