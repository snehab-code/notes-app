import React from 'react'
import axios from 'axios'
import NoteForm from './NoteForm'

class NoteEdit extends React.Component {
    constructor() {
        super()
        this.state = {
            note: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`http://localhost:3015/notes/${id}`)
            .then(response => {
                const note = response.data
                this.setState({note})
            })
    }

    handleSubmit = (formData) => {
        console.log(formData)
        const id = this.props.match.params.id
        axios.put(`http://localhost:3015/notes/${id}`, formData)
            .then((response) => {
                console.log(response.data)
                this.props.history.push('/notes')
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <h1>Edit Note</h1>
                {this.state.note.title && <NoteForm {...this.state.note} handleSubmit = {this.handleSubmit} />}
            </div>
        )
    }
}

export default NoteEdit