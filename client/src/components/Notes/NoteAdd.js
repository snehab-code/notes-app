import React from 'react'
import NoteForm from './NoteForm'
import {connect} from 'react-redux'
import {startPostNote} from '../../actions/notes'

function NoteAdd (props) {
    const handleSubmit = (formData) => {
        props.dispatch(startPostNote(formData, props.history))
    }

    return (
        <div>
            <h1>Create a Note</h1>
            <NoteForm handleSubmit = {handleSubmit}/>
        </div>
    )
}

export default connect()(NoteAdd)