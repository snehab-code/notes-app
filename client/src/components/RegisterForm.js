import React from 'react'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {startRegisterUser} from '../actions/user'

class RegisterForm extends React.Component{
    constructor() {
        super()
        this.state={
            email: '',
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
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }
        this.props.dispatch(startRegisterUser(formData))
        this.setState({username: '', password: '', email: ''})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={{flexGrow:1, alignSelf:"stretch",display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>

                {this.props.notice ? this.props.notice : ' '}
                <label
                    htmlFor = "email"
                    style={{fontSize:"0.9em", color:"#486175"}}
                >
                    Email
                </label>
                <input 
                    type="text" 
                    value={this.state.email} 
                    onChange={this.handleChange} 
                    id="email" 
                    style={{padding:5, borderRadius:4, border:"1px solid #ffc9d3", outline:"none", textAlign:"center", width:"70%"}}
                />
                <label 
                    htmlFor="username" 
                    style={{marginTop:10, fontSize:"0.9em", color:"#486175"}}
                >
                    Username
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
                    Sign up
                </Button>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notice: state.user.notice,
        registrationSuccess: state.user.registrationSuccess
    }
}

export default connect(mapStateToProps)(RegisterForm)