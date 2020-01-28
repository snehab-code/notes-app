import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class NoteShow extends React.Component{
    constructor() {
        super()
        this.state = {
            note: {},
            imageURL: '',
            message: ''
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3015/notes/${this.props.match.params.id}`)
            .then(response => {
                const note = response.data
                this.setState({note})
            })
    }

    handleImage = () => {
        const arrayBuffer = this.state.note.image.data
        console.log(arrayBuffer)
        let imageTest = new Uint8Array(arrayBuffer)
        const blob = new Blob([imageTest], {type: "image/jpeg"})
        const imageURL = URL.createObjectURL(blob)
        return imageURL
    }
    
    handleDuplicate = () => {
        const note = this.state.note
        const formData = { 
            title: note.title, 
            category: note.category, 
            description: note.description 
        }
        if (note.photoPath) {
            formData.photoPath = note.photoPath
        }
        console.log(formData)
        axios.post(`http://localhost:3015/notes/`, formData)
            .then(() => {
                this.props.history.push('/notes')
            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        console.log(this.state.note)
        return (
            <div>
                {
                    this.state.note.title ? 
                    <div><h1>{this.state.note.title}</h1>
                    <span>{this.state.note.description}</span><br/>
                    
                    {this.state.note.image ? <img src={this.handleImage()} style={{width:400}}/> : <br/>}
                    
                    <button onClick = {this.handleDuplicate}>Duplicate</button>

                    </div>
                    : <br/>
                }

                <Link to={`/notes/edit/${this.props.match.params.id}`}> Edit </Link>          

            </div>
        )
    }
}

export default NoteShow