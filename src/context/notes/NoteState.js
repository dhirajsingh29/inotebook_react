import { useState } from "react";
import axios from "axios";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const baseUrl = 'http://localhost:5000';

    let notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    // Get all notes
    const getAllNotes = async () => {

        const response = await axios.get(`${baseUrl}/api/notes/fetchallnotes`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            }
        );

        if (response.status === 200) {
            setNotes(response.data);
        }
        else {
            console.error('Error while fetching all notes');
        }
    }

    // Add note
    const addNote = async (title, description, tag) => {

        const response = await axios.post(`${baseUrl}/api/notes/addnote`,
            {
                title: title,
                description: description,
                tag: tag
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            }
        );

        if (response.status === 201) {
            let note = response.data;

            setNotes(notes.concat(note));
        }
        else {
            console.error('Error while creating note' + response.data);
        }
    }

    // Delete note
    const deleteNote = async (id) => {

        const response = await axios.delete(`${baseUrl}/api/notes/deletenote/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            }
        );

        if (response.status === 200) {
            const newNotes = notes.filter(note => note._id !== id);
            setNotes(newNotes);
        }
        else {
            console.error('Error while deleting note with id: ' + id);
        }
    }

    // Edit note
    const editNote = async (id, title, description, tag) => {

        const response = await axios.put(`${baseUrl}/api/notes/updatenote/${id}`,
            {
                title: title,
                description: description,
                tag: tag
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            }
        );

        if (response.status === 200) {
            // newNotes creation is required as we should not modify state directly
            const newNotes = JSON.parse(JSON.stringify(notes));

            const index = newNotes.findIndex(note => note._id === id);

            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;

            setNotes(newNotes);
        }
        else {
            console.error('Error updating note with id: ' + id);
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;