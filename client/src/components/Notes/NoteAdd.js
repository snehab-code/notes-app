import React from 'react'
import NoteForm from './NoteForm'
import {connect} from 'react-redux'
import {startPostNote, startPostNoteWithCategory} from '../../actions/notes'

function NoteAdd (props) {
    const handleSubmit = (formData, newCategory) => {
        if (newCategory) {
            props.dispatch(startPostNoteWithCategory(formData, props.closeModal, newCategory))
        } else {
            props.dispatch(startPostNote(formData, props.closeModal))
        }
    }

    return (
        <>
            <h1>Create a Note</h1>
            <NoteForm handleSubmit = {handleSubmit}/>
        </>
    )
}

export default connect()(NoteAdd)