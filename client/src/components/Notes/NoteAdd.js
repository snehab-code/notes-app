import React from 'react'
import NoteForm from './NoteForm'
import axios from 'axios'

class NoteAdd extends React.Component {
    constructor(){
        super()
        this.state = {

        }
    }

    handleSubmit = (formData) => {
        axios.post('http://localhost:3015/notes', formData)
            .then(() => {
                this.props.history.push('/notes')
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <h1>Create a Note</h1>
                <NoteForm handleSubmit = {this.handleSubmit}/>
            </div>
        )
    }
}

export default NoteAdd