import React from 'react'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import {Link} from 'react-router-dom'

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
        const height = this.divElement.clientHeight
        if (height != this.state.height) {
            this.setState({height})
        }
    }

    render() {
        return (
        <div key = {this.props._id} style={{margin:10, border:"1px solid #f7e7b2", padding:10, width:270, borderRadius: 12}} ref={(divElement) => this.divElement = divElement}>
            {this.props.photoPath && <img style={{width:250}} src={`${this.props.photoPath}`} onLoad = {this.onLoad} />}
            <br/>
                {/* src = {this.handleImage(this.props.image.data)} />}<br/> */}
                <Link to={`/notes/${this.props._id}`}><span style={{fontWeight:"bold"}}>{this.props.title}</span></Link>
            
            <br/>
            {this.props.description}
            <br/>
            
            <div style={{display:"flex", justifyContent:"space-between"}}>

                <Chip color="secondary" size="small" variant="outlined" label={this.props.category.name} style={{color: "#f5d382", border:"1px solid #f5d382", fontSize:"12px"}}/>
                
                <Button color="secondary" size="small" onClick={() => this.handleRemove(this.props._id)} style={{color:"#f5427e", height:"20px", fontSize:"12px", padding:"0px"}}>
                    Remove
                </Button>
            
            </div>
        </div>
        )
    }
}

export default Note