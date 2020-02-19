import React from 'react'
import Button from '@material-ui/core/Button'
import {startUserLogin} from '../actions/user'
import {connect} from 'react-redux'


class LoginForm extends React.Component{
    constructor() {
        super()
        this.state={
            username: '',
            password: '',
            notice: ''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.dispatch(startUserLogin(formData))
        this.setState({username: '', password: ''})
    }

    render() {
        return (
                <form onSubmit={this.handleSubmit} style={{display:"flex", flexGrow:1, alignSelf:"stretch",flexDirection:"column", alignItems:"center", justifyContent:"center"}}>

                {this.props.notice ? this.props.notice : ' '}

                <label 
                    htmlFor="username" 
                    style={{fontSize:"0.9em", color:"#486175"}}
                >
                    Email/Username
                </label>
                <input 
                    type="text" 
                    value={this.state.username} 
                    onChange={this.handleChange} 
                    id="username" 
                    style={{padding:5, borderRadius:4, border:"1px solid #ffc9d3", outline:"none", textAlign:"center", width:"70%"}}
                />
                <label 
                    htmlFor="password"
                    style={{marginTop:10, fontSize:"0.9em", color:"#486175"}}
                >
                    Password
                </label>
                <input 
                    type="password" 
                    value={this.state.password} 
                    onChange={this.handleChange} id="password" 
                    style={{padding:5, borderRadius:4, border:"1px solid #ffc9d3", outline:"none", textAlign:"center", width:"70%"}}
                />
                <Button 
                    onClick={this.handleSubmit} 
                    size="small" 
                    style={{fontSize:"0.9em", margin:10, color:"#de6279", width:"50%"}} 
                    type="submit"  
                    color="secondary"
                >
                    Login
                </Button>
                </form>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        notice: state.user.notice
    }
}

export default connect(mapStateToProps)(LoginForm)