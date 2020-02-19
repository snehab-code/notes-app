import React from 'react'
import {connect} from 'react-redux'
import NoteForm from './NoteForm'
import { startPutNote } from '../../actions/notes'

// class NoteEdit extends React.Component {
function NoteEdit(props) {
    const handleSubmit = (formData) => {
        const id = props.match.params.id
        const history = props.history
        props.dispatch(startPutNote(id, formData, history))
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
        note: state.notes.find(note => note._id == props.match.params.id)
    }
}

export default connect(mapStateToProps)(NoteEdit)