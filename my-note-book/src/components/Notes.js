import React, { useState, useContext, useEffect, useRef } from 'react';
import noteContext from '../context/notes/NoteContext';
import NoteItem from "./NoteItem";
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const navigate = useNavigate();
    const ref = useRef(null);
    const refClose = useRef(null);
    const context = useContext(noteContext);
    const { notes, getnotes, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
        getnotes();
    }
    else{
        navigate("/login");
    }
    // eslint-disable-next-line
    }, []);

    const [init_note, change_note] = useState({ id: "", utitle: "", udescription: "", utag: "" });
    const Update_Note = () => {
        editNote(init_note.id, init_note.utitle, init_note.udescription, init_note.utag)
        refClose.current.click();
        props.showAlert("Updated Successfully","success ");
    }

    const onChange = (e) => {
        change_note({
            ...init_note, [e.target.name]: e.target.value
        })
    }

    const updatenote = (CurrentNote) => {
        ref.current.click();
        change_note({ id: CurrentNote._id, utitle: CurrentNote.title, udescription: CurrentNote.description, utag: CurrentNote.tag });

    }

    return (
        <>

            <Addnote showAlert={props.showAlert} />
            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3 my-3">
                                    <label htmlFor="utitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="utitle" name="utitle" value={init_note.utitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="udescription" className="form-label" >Description</label>
                                    <input type="text" className="form-control" id="udescription" value={init_note.udescription} name="udescription" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="utag" className="form-label" >Tag</label>
                                    <input type="text" className="form-control" id="utag" value={init_note.utag} name="utag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={init_note.utitle.length < 5 || init_note.udescription.length < 5} onClick={Update_Note} type="button" className="btn btn-primary">Update Changes</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row my-3">
                <h1 >Your Notes</h1>
                <div className='container mx-2 minLength={5} required'>
                    {notes.length === 0 && "No Notes To Display"}
                </div>
                {notes.map((notes) => {
                    return <NoteItem key={notes._id} showAlert={props.showAlert} updatenote={updatenote} note={notes} />
                })}
            </div>
        </>
    )
}

export default Notes
