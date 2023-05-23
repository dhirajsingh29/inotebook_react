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
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YTg4ZThlOWM3ZjJhMmIyNGQzMDYyIn0sImlhdCI6MTY4NDc1MTQzNH0.fgWNSdo6aj4bq3jykuFU7Z4kdPi2-Y00V1oxvf0wIWM"
                }
            }
        );

        if (response.status === 200) {
            setNotes(response.data);
        }
        else {
            console.log('Error while fetching all notes');
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
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YTg4ZThlOWM3ZjJhMmIyNGQzMDYyIn0sImlhdCI6MTY4NDc1MTQzNH0.fgWNSdo6aj4bq3jykuFU7Z4kdPi2-Y00V1oxvf0wIWM"
                }
            }
        );

        if (response.status === 201) {
            let note = response.data;

            setNotes(notes.concat(note));
        }
        else {
            console.log('Error while creating note' + response.data);
        }
    }

    // Delete note
    const deleteNote = async (id) => {

        const response = await axios.delete(`${baseUrl}/api/notes/deletenote/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YTg4ZThlOWM3ZjJhMmIyNGQzMDYyIn0sImlhdCI6MTY4NDc1MTQzNH0.fgWNSdo6aj4bq3jykuFU7Z4kdPi2-Y00V1oxvf0wIWM"
                }
            }
        );

        if (response.status === 200) {
            const newNotes = notes.filter(note => note._id !== id);
            setNotes(newNotes);
        }
        else {
            console.log('Error while deleting note with id: ' + id);
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
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2YTg4ZThlOWM3ZjJhMmIyNGQzMDYyIn0sImlhdCI6MTY4NDc1MTQzNH0.fgWNSdo6aj4bq3jykuFU7Z4kdPi2-Y00V1oxvf0wIWM"
                }
            }
        );

        for (let index = 0; index < notes.length; index++) {
            const note = notes[index];

            if (note._id === id) {
                note.title = title;
                note.description = description;
                note.tag = tag;
            }
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;