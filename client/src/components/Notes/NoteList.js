import React from 'react'
import {Link} from 'react-router-dom'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Note from './Note'
import {connect} from 'react-redux'


class NotesList extends React.Component{
    constructor() {
        super()
        this.state = {
            columns: 0
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions)
        const width = window.innerWidth
        const columns = Math.floor(width*0.75/270)
        this.setState({columns})
    }

    updateWindowDimensions = () => {
        // Long term WIP. Attempting to mimic note reordering based on height
        const width = window.innerWidth
        const columns = Math.floor(width*0.85/250)
        if (columns<=3) {
            this.setState({columns})
        } else {
            this.setState({columns: 3})
        }
        // remember to stop this before unmounting or it will try to setState when it's unmounted and send an error 
    }
    
    render() {
        // is there a way to move JUST the last two notes (when it's not a number divisible by column - for 3 it could be 2 notes, for 2 it would be 1) to the shortest div column container?
        console.log(this.props.pinnedNotes, 'pinned')
        return (<>
            {   this.props.pinnedNotes.length > 0 &&
            <>
            <h3>Pinned</h3>
            <div style={{display: "flex", justifyContent: "center", width:"80vw"}}>
                
                <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems: "center", flexWrap:"wrap"}}>
                    {/* {
                        this.props.notes
                    } */}
                    {
                        this.props.pinnedNotes.map(note => {
                            if (note.position%this.state.columns==1) {
                                return (
                                    <Note key = {note._id} id={note._id}/>
                                )
                            }
                        })
                    }

                </div> 
                <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems: "center", flexWrap:"wrap"}}>
                    {
                        this.props.pinnedNotes.map(note => {
                            if (note.position%this.state.columns==2) {
                                // only runs on three columns not 2
                                return (
                                    <Note key = {note._id} id={note._id}/>
                                )
                            }
                        })
                    }

                </div>
                <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems: "center", flexWrap:"wrap"}}>
                    {
                        this.props.pinnedNotes.map(note => {
                            if (note.position%this.state.columns==0) {
                                return (
                                    <Note key = {note._id} id={note._id}/>
                                )
                            }
                        })
                    }

                </div>
            </div>
            </>
            }
            <>
            {this.props.pinnedNotes.length > 0 && <h3>Others</h3>}
            <div style={{display: "flex", justifyContent: "center", width:"80vw"}}>

                

                <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems: "center", flexWrap:"wrap"}}>
                    {/* {
                        this.props.notes
                    } */}
                    {
                        this.props.notes.map(note => {
                            if (note.position%this.state.columns==1) {
                                return (
                                    <Note key = {note._id} id={note._id}/>
                                )
                            }
                        })
                    }
                
                </div> 
                <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems: "center", flexWrap:"wrap"}}>
                    {
                        this.props.notes.map(note => {
                            if (note.position%this.state.columns==2) {
                                // only runs on three columns not 2
                                return (
                                    <Note key = {note._id} id={note._id}/>
                                )
                            }
                        })
                    }
                
                </div>
                <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems: "center", flexWrap:"wrap"}}>
                    {
                        this.props.notes.map(note => {
                            if (note.position%this.state.columns==0) {
                                return (
                                    <Note key = {note._id} id={note._id}/>
                                )
                            }
                        })
                    }
                
                </div>
                <Link to="/notes/add">
                    <Fab size="large" style={{position:"fixed", backgroundColor: "#f5427e",backgroundImage:"linear-gradient(to bottom right, #f5427e, #f5427e, #f5c242", bottom:"50px", right:"50px"}} color="secondary" aria-label="add">
                        <AddIcon />
                    </Fab> 
                </Link>  
            </div>
            </>
            </>
        )
    }
}

const mapStateToProps = (state, props) => {
    if (!props.category) {
    return {
        pinnedNotes: state.notes.filter(note => note.isPinned).map((note, i) => {
            return {...note, position: i+1}
        }),
        notes: state.notes.filter(note=> !note.isPinned).map((note, i) => {
            return {...note, position: i+1}
        }),
        noteCount: state.notes.length
    }
    } else {
        return {
            pinnedNotes: state.notes.filter(note => (note.category._id == props.category) && note.isPinned).map((note, i) => {
                return {...note, position: i+1}
            }),
            notes: state.notes.filter(note=>(note.category._id == props.category) && !note.isPinned).map((note, i) => {
                return {...note, position: i+1}
            }),
            noteCount: state.notes.length 
        }
    } 
}

export default connect(mapStateToProps)(NotesList)