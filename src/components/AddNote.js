import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/noteContext';

export default function AddNote() {

    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title: '', description: '', tag: 'General'});

    const handleOnClick = (e) => {
        e.preventDefault(); // to restrict page reload
        addNote(note.title, note.description, note.title);
    }

    const handleOnChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value 
        });
    }

    return (
        <div>
            <div className="container my-3">
                <h3>Add a Note</h3>
                <form className='my-3'>

                    <div className="mb-3">
                        <label
                            htmlFor="title"
                            className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            onChange={handleOnChange} />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="description"
                            className="form-label">
                            Description
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            onChange={handleOnChange} />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="tag"
                            className="form-label">
                            Tag
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="tag"
                            name="tag"
                            onChange={handleOnChange} />
                    </div>

                    <button type="submit" className="btn btn-primary"
                        onClick={handleOnClick}>
                        Add Note
                    </button>

                </form>
            </div>
        </div>
    )
}
