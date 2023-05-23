import React, { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';

const Notes = () => {

    const context = useContext(NoteContext);
    const { notes, setNotes } = context;

    return (
        <div className="row my-3">
            <h3>Your Notes</h3>
            {
                notes.map((note) => {
                    return <NoteItem note={note}/>
                })
            }
        </div>
    )
}

export default Notes