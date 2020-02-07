import React from 'react'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'

class Home extends React.Component {
    constructor() {
        super()
        this.state={
            username: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }

    render() {
        return (
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%", height: "100%", minHeight:"300px", maxWidth:900, maxHeight:480}}>
                <div style={{
                    backgroundImage: "linear-gradient(to right, #fcf3de, #fcdee4)",
                    padding: 2,
                    borderRadius:12,
                    height:"100%",
                    width:"62%",
                }}>
                    <div style={{borderRadius:10, height: "100%", padding:0, margin:0,  width:"100%", background:"white",  backgroundPosition:"center", display:"flex",  alignItems: "stretch", justifyContent:"center"}} ref={(divElement) => this.divElement = divElement}>
                        <div style={{height:"100%", width:"100%", borderTopLeftRadius:10, borderBottomLeftRadius: 10, overflow:"hidden", backgroundImage: `url(https://source.unsplash.com/collection/9507219/300x500)`, backgroundPosition:"center center"}}></div>
                        <div style={{display:"flex", flexDirection: "column",alignItems:"center", justifyContent: "flex-end", width:"100%", minWidth:"200px"}}>
                        <form onSubmit={this.handleSubmit} style={{flexGrow:1, alignSelf:"stretch",display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                            
                            <label htmlFor="username" style={{fontSize:"0.9em", color:"#486175"}}>Username</label>
                            <input type="text" value={this.state.username} onChange={this.handleChange} id="username" style={{padding:5, borderRadius:4, border:"1px solid #ffc9d3", outline:"none", textAlign:"center", width:"70%"}}/>
                            <label htmlFor="password"style={{marginTop:10, fontSize:"0.9em", color:"#486175"}}>Password</label>
                            <input type="password" value={this.state.password} onChange={this.handleChange} id="password" style={{padding:5, borderRadius:4, border:"1px solid #ffc9d3", outline:"none", textAlign:"center", width:"70%"}}/>
                            <Button size="small" style={{fontSize:"0.9em", margin:10, color:"#de6279", width:"50%"}}  color="secondary">Login</Button>
                            
                        </form>
                        <span style={{fontSize:"0.9em", color:"#486175"}}><Link to="">Sign up</Link> | <Link to="">Forgot Password?</Link></span>
                        </div>                       
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Home