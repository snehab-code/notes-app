import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {startPostNote} from '../../actions/notes'

function NoteShow(props){

    const handleDuplicate = () => {
        const note = props.note
        const formData = { 
            title: note.title, 
            category: note.category, 
            description: note.description 
        }
        if (note.photoPath) {
            formData.photoPath = note.photoPath
        }
        props.dispatch(startPostNote(formData))
    }

    return (
        <div>
            {
                props.note ? 
                <div><h1>{props.note.title}</h1>
                <span>{props.note.description}</span><br/>
                
                {props.note.photoPath ? <img src={`http://localhost:3015${props.note.photoPath}`} alt="note" style={{width:400}}/> : <br/>}

                <button onClick = {handleDuplicate}>Duplicate</button>

                </div>
                : <br/>
            }

            <Link to={`/notes/edit/${props.match.params.id}`}> Edit </Link>          

        </div>
    )
}


const mapStateToProps = (state, props) => {
    return {
        note: state.notes.find(note => note._id == props.match.params.id)
    }
}

export default connect(mapStateToProps)(NoteShow)