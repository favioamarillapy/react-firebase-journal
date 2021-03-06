import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startActiveNote, startDeleteNote } from '../../actions/Note';
import { NoteAppBar } from '../../components/notes/NoteAppBar'
import { useForm } from '../../hooks/useForm';

export const NotesScreen = () => {

    const dispatch = useDispatch();

    const { active } = useSelector(state => state.note);
    const [formValues, handleInputChange, reset] = useForm(active);
    const { id, title, body, url, date } = formValues;

    const activeId = useRef(active.id);

    useEffect(() => {

        if (active.id !== activeId.current) {
            reset(active);
            activeId.current = active.id
        }

    }, [active, reset])

    useEffect(() => {

        dispatch(startActiveNote(formValues));

    }, [formValues, dispatch])

    const handleDelete = () => {

        dispatch(startDeleteNote(activeId.current));
    }



    return (
        <div>
            <NoteAppBar />

            <div className="note-container mt-5">
                <h1 className="text-white">Create a new entry!</h1>

                <form className="form">
                    <div className="form-group  col-md-6">
                        <label>Title</label>
                        <input type="text" className="form-control" placeholder="Title" name="title" value={title} onChange={handleInputChange} />
                    </div>
                    <div className="form-group  col-md-6">
                        <label>Description</label>
                        <textarea rows="5" className="form-control" placeholder="Description" name="body" value={body} onChange={handleInputChange}></textarea>
                    </div>

                    {
                        (url) && (
                            <div className="form-group mt-5  col-md-12">
                                <div className="row">
                                    <div className="col-md-2 mb-3">
                                        <img className="note-img" src={active.url} alt="profile" />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    
                    <div className="form-group  col-md-6">
                        <button type="button" className="btn btn-danger" onClick={handleDelete}> <i className="fas fa-trash"> </i> Delete</button>
                    </div>


                </form>

            </div>
        </div>
    )
}
