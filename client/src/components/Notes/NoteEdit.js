import React from 'react'
import {connect} from 'react-redux'
import NoteForm from './NoteForm'
import { startPutNote, startPutNoteWithCategory } from '../../actions/notes'

// class NoteEdit extends React.Component {
function NoteEdit(props) {
    const handleSubmit = (formData, newCategory) => {
        const id = props.id
        if (newCategory) {
            props.dispatch(startPutNoteWithCategory(id, formData, props.closeModal, newCategory))
        } else {
            props.dispatch(startPutNote(id, formData, props.closeModal))
        }
    }
 
    return (
        <div>
            <h1>Edit Note</h1>
            {props.note && <NoteForm {...props.note} handleSubmit = {handleSubmit} />}
        </div>
    )

}

const mapStateToProps = (state, props) => {
    return {
        note: state.notes.find(note => note._id == props.id)
    }
}

export default connect(mapStateToProps)(NoteEdit)