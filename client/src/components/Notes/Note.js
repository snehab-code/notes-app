import React from 'react'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Chip from '@material-ui/core/Chip'
import ImageIcon from '@material-ui/icons/Image';
import {startPinNote} from '../../actions/notes'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {startDeleteNote} from '../../actions/notes'
import pin from '../../pin.png'
import './note.css'

class Note extends React.Component{
    
    constructor() {
        super()
        this.state = {
            height: null,

        }
    }

    componentDidMount() {
        const height  = this.divElement.clientHeight
        this.setState({height})
    }

    onLoad = () => {
        console.log('load ran')
        const height = this.divElement.clientHeight
        if (height !== this.state.height) {
            this.setState({height})
        }
    }

    handleRemove = (id) => {
        this.props.dispatch(startDeleteNote(id))
    }

    handleShow = (id) => {
        this.props.history.push(`/notes/${id}`)
    }

    handleEdit = (id) => {
        this.props.history.push(`/notes/${id}/edit`)
    }

    handlePin = (id, pinStatus) => {
        this.props.dispatch(startPinNote(id, pinStatus))
    }

    render() {
        return (
        <div className="note" key = {this.props.note._id} style={{margin:10, border:"1px solid #f7e7b2", width:270, borderRadius: 12}} ref={(divElement) => this.divElement = divElement}>
            <div className="noteContent" style={{display:"grid", gridTemplateColumns: "1fr 1 fr 1fr 1fr", gridTemplateTows: "1fr", height:"auto"}}>
                
                <div className="photoOverlay" style={{borderRadius:12}}>
                    <Button className="photoIcon" size="small" onClick={() => this.handleShow(this.props.note._id)} style={{borderRadius:20, width:35, minWidth:35, height:35, background:"white", margin:7, border:"1px solid #f5d382"}}>
                        <ImageIcon style={{height:15}} fontSize="small" style={{fontSize:"1.5em"}}/>
                    </Button>
                    <Button className="photoIcon" size="small" onClick={() => this.handleRemove(this.props.note._id)} style={{borderRadius:20, width:35, minWidth:35, height:35, background:"white", margin:7, border:"1px solid #f5d382"}}>
                        <DeleteIcon style={{height:15}} fontSize="small" style={{fontSize:"1.5em"}}/>
                    </Button>
                    <Button className="photoIcon" size="small" onClick={() => this.handleEdit(this.props.note._id)} style={{borderRadius:20, width:35, minWidth:35, height:35, background:"white", margin:7, border:"1px solid #f5d382"}}>
                        <EditIcon style={{height:15}} fontSize="small" style={{fontSize:"1.5em"}}/>
                    </Button>
                    <Button className="photoIcon" size="small" onClick={() => this.handlePin(this.props.note._id, this.props.note.isPinned)} variant="contained" style={{borderRadius:20, width:35, minWidth:35, height:35, background:"white", margin:7, border:"1px solid #f5d382"}}>
                    <img src={pin} style={{width:20}}/>
                    </Button>
                </div>

                <div style={{gridRowStart: 1, gridColumnStart: 1}}>
                    {/* {this.props.note.photoPath && this.props.note.photoPath.includes('uploads/') && <img style={{width:268, borderTopRightRadius:12, borderTopLeftRadius:12}} alt="note" src={`http://localhost:3015${this.props.note.photoPath}`} onLoad = {this.onLoad}/>} */}

                    {this.props.note.photoPath && !this.props.note.photoPath.includes('uploads/') && <img style={{width:268, borderTopRightRadius:12, borderTopLeftRadius:12}} alt="note" src={`${this.props.note.photoPath}`} onLoad = {this.onLoad}/>}
                
                    <div style={{padding:15, paddingTop:10}}>
                    <Link to={`/notes/${this.props.note._id}`}><span style={{fontWeight:"bold", fontSize:"1.1em"}}>{this.props.note.title}</span></Link>
                    {this.props.note.description}
                    </div>
                </div>
            
            </div>    
            <div style={{margin:10}}>
                <Link to={`/categories/${this.props.note.category._id}`}>
                <Chip color="secondary" size="small" variant="outlined" clickable label={this.props.note.category.name} style={{color: "#f5d382", border:"1px solid #f5d382", background:"white", fontSize:"12px"}}/>
                </Link>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        note: state.notes.find(note => note._id == props.id)
    }
}

export default withRouter(connect(mapStateToProps)(Note))