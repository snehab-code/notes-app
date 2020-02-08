import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Note from './Note'

class NotesList extends React.Component{
    constructor() {
        super()
        this.state = {
            notes: [],
            columns: 0
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions)
        axios.get("/notes")
            .then(response => {
                const notes = response.data
                this.setState({notes})
            })
    }

    updateWindowDimensions = () => {
        // Long term WIP. Attempting to mimic note reordering based on height
        const width = window.innerWidth
        const columns = Math.floor(width*0.7/270)
        this.setState({columns})
    }

    handleRemove = (id) => {
        axios.delete(`/notes/${id}`)
            .then(response => {
                this.setState(prevState => {
                    const notes = prevState.notes.filter(note => note._id !== id)
                    this.setState({notes})
                })
            })
    }

    // handleImage = (data) => {
    //     const arrayBuffer = data 
    //     console.log(arrayBuffer)
    //     let imageTest = new Uint8Array(arrayBuffer)
    //     const blob = new Blob([imageTest], {type: "image/jpeg"})
    //     const imageURL = URL.createObjectURL(blob)
    //     return imageURL
    // }
    
    render() {
        console.log('state', this.state)
        return (
            <div style={{display: "flex", flexDirection:"column", alignItems: "center", width:"80vw"}}>
                <div style={{display:"flex", justifyContent:"center", alignItems: "flex-start", flexWrap:"wrap"}}>
                    {/* So... min per row = 1, max depends on width of the screen... 100vw
                     */}
                    {
                        this.state.notes.map(note => {
                            return (
                                <Note key = {note._id} {...note}/>
                            )
                        })
                    }
                
                </div> 
                <Link to="/notes/add">
                    <Fab size="large" style={{position:"fixed", backgroundColor: "#f5427e",backgroundImage:"linear-gradient(to bottom right, #f5427e, #f5427e, #f5c242", bottom:"50px", right:"50px"}} color="secondary" aria-label="add">
                        <AddIcon />
                    </Fab> 
                </Link>  
            </div>
        )
    }
}

export default NotesList