import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "646b509fd5e3de7abedb697b",
            "user": "646a88e8e9c7f2a2b24d3062",
            "title": "Goa Trip",
            "description": "Goa trip itinary",
            "tag": "Travel",
            "date": "2023-05-22T11:23:11.963Z",
            "__v": 0
        },
        {
            "_id": "646b5d51d5e3de7abedb697f",
            "user": "646a88e8e9c7f2a2b24d3062",
            "title": "Learn React JS",
            "description": "Access react tutorial on its official website or youtube",
            "tag": "Youtube",
            "date": "2023-05-22T12:17:21.885Z",
            "__v": 0
        }
    ];

    const [notes, setNotes] = useState(notesInitial);

    // Add note
    const addNote = (title, description, tag) => {
        let note = {
            "_id": "646b5d51d5e3de7abedb697i",
            "user": "646a88e8e9c7f2a2b24d3062",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-05-23T12:17:21.885Z",
            "__v": 0
        };

        setNotes(notes.concat(note));
    }

    // Delete note
    const deleteNote = (id) => {
        
    }

    // Edit note
    const editNote = () => {
        
    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;