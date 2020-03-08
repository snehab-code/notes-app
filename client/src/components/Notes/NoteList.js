import React from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import Note from './Note'
import NoteAdd from './NoteAdd'
import NoteEdit from './NoteEdit'

// styles for Modal
const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        backgroundColor       : 'white',
        display               : "flex",
        flexDirection         : "column",
        alignItems            : "center",
        justifyContent        : "center"
      }
}

class NotesList extends React.Component{
    constructor() {
        super()
        this.state = {
            columns: 0,
            modalIsOpen: false,
            action: null,
            activeNote: null
        }
    }

    componentDidMount() {
        Modal.setAppElement('#root')  
        window.addEventListener('resize', this.updateWindowDimensions)
        const width = window.innerWidth
        const columns = Math.floor(width*0.75/270)
        this.setState({columns})
    }

    updateWindowDimensions = () => {
        const width = window.innerWidth
        const columns = Math.floor(width*0.85/250)
        if (columns<=3) {
            this.setState({columns})
        } else {
            this.setState({columns: 3})
        }
    }

    closeModal = () => {
        this.setState({modalIsOpen: false})
    }
    
    handleAdd = () => {
        this.setState({modalIsOpen: true, action: 'add'})
    }

    handleEdit = (id) => {
        this.setState({modalIsOpen: true, action: 'edit', activeNote: id})
    }

    render() {
        return (<>
            <Modal
                style={customStyles}
                isOpen={this.state.modalIsOpen}
                // onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                contentLabel="Create note"
            >
                {this.state.action == 'add' && <NoteAdd closeModal = {this.closeModal}/>}
                {this.state.action == 'edit' && <NoteEdit closeModal = {this.closeModal} id = {this.state.activeNote}/>}
            </Modal>
            {   this.props.pinnedNotes.length > 0 &&
            <>
            <h3>Pinned</h3>
            <div style={{display: "flex", justifyContent: "center", width:"80vw"}}>
                
                <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems: "center", flexWrap:"wrap"}}>
                    {
                        this.props.pinnedNotes.map(note => {
                            if (note.position%this.state.columns==1) {
                                return (
                                    <Note key = {note._id} id={note._id} handleEdit = {this.handleEdit}/>
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
                                    <Note key = {note._id} id={note._id} handleEdit = {this.handleEdit}/>
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
                                    <Note key = {note._id} id={note._id} handleEdit = {this.handleEdit}/>
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
                                    <Note key = {note._id} id={note._id} handleEdit = {this.handleEdit}/>
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
                                    <Note key = {note._id} id={note._id} handleEdit = {this.handleEdit}/>
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
                                    <Note key = {note._id} id={note._id} handleEdit = {this.handleEdit}/>
                                )
                            }
                        })
                    }
                
                </div>
                {/* <Link to="/notes/add"> */}
                    <Fab size="large" style={{position:"fixed", backgroundColor: "#f5427e",backgroundImage:"linear-gradient(to bottom right, #f5427e, #f5427e, #f5c242", bottom:"50px", right:"50px"}} color="secondary" aria-label="add" onClick={this.handleAdd}>
                        <AddIcon />
                    </Fab> 
                {/* </Link>   */}
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