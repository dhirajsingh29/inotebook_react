import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {

    const context = useContext(NoteContext);
    const { notes, getAllNotes, editNote } = context;

    let navigate = useNavigate();

    // useEffect is used to call getAllNotes method once when page refreshes
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllNotes();
        }
        else {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({ eid: 0, etitle: '', edescription: '', etag: 'General' });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ eid: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleOnClick = (e) => {
        editNote(note.eid, note.etitle, note.edescription, note.etitle);
        refClose.current.click();
    }

    const handleOnChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
    }

    return (
        <>
            <AddNote />

            <button
                type="button"
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#editModal"
                ref={ref}>
                Launch demo modal
            </button>

            <div
                className="modal fade"
                id="editModal"
                tabIndex="-1"
                aria-labelledby="editModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="editModalLabel">
                                Edit Note
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>

                                <div className="mb-3">
                                    <label
                                        htmlFor="etitle"
                                        className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etitle"
                                        name="etitle"
                                        value={note.etitle}
                                        onChange={handleOnChange}
                                        minLength={3}
                                        required />
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="edescription"
                                        className="form-label">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="edescription"
                                        name="edescription"
                                        value={note.edescription}
                                        onChange={handleOnChange}
                                        minLength={5}
                                        required />
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="etag"
                                        className="form-label">
                                        Tag
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etag"
                                        name="etag"
                                        value={note.etag}
                                        onChange={handleOnChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                ref={refClose}>
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleOnClick}
                                disabled={note.etitle.length < 3 || note.edescription.length < 5}>
                                Update Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h3>Your Notes</h3>
                <div className="container">
                    {notes.length === 0 && 'No notes to display!'}
                </div>
                {
                    notes.map((note) => {
                        return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                    })
                }
            </div>
        </>
    )
}

export default Notes