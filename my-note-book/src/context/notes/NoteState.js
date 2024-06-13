import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host_url = "http://localhost:5000"
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    // get all notes 
    const getnotes = async () => {

        const response = await fetch(`${host_url}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
        });
        const json = await response.json();
        setNotes(json);
    }



    //add a note
    const addNote = async (title, description, tag) => {
        // API Call

        const response = await fetch(`${host_url}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }
    //delete a note
    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host_url}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
        });
        const json = await response.json();
        setNotes(json);
        const newNote = notes.filter((note) => { return note._id !== id });
        setNotes(newNote);

    }
    //edit a note
    const editNote = async (id, title, description, tag) => {
        // API Call

        const response = await fetch(`${host_url}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag }),
        });
        // eslint-disable-next-line
        const json = await response.json();

        let upNote = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < upNote.length; index++) {
            const element = upNote[index];
            if (element._id === id) {
                upNote[index].title = title;
                upNote[index].description = description;
                upNote[index].tag = tag;
                break;
            }
        }

        setNotes(upNote);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getnotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState; 