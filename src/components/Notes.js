import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {

    const context = useContext(NoteContext);
    const { notes, getAllNotes } = context;

    // useEffect is used to call getAllNotes method once when page refreshes
    useEffect(() => {
        getAllNotes();
    }, []);

    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h3>Your Notes</h3>
                {
                    notes.map((note) => {
                        return <NoteItem key={note._id} note={note} />
                    })
                }
            </div>
        </>
    )
}

export default Notes