import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import LoginForm from './LoginForm'
import LoginContainer from './LoginContainer'

class Login extends React.Component {
    constructor() {
        super()
        this.state={
            username: '',
            password: '',
            notice: ''
        }
    }

    componentDidMount() {
        if (this.props.isLoggedIn) this.props.history.push('/notes')
    }

    // handleSubmit = (e) => {
    //     e.preventDefault()
    //     const formData = {
    //         username: this.state.username,
    //         password: this.state.password
    //     }
    //     this.props.dispatch(startUserLogin(formData))
    //     this.setState({username: '', password: ''})
    // }

    render() {
        
        return (
            <LoginContainer>
                {this.props.isLoggedIn && <Redirect to="/notes"/>}
                <LoginForm/>
                <span style={{fontSize:"0.9em", color:"#486175"}}><Link to="/register">Sign up</Link> | <Link to="">Forgot Password?</Link></span>
            </LoginContainer>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        notice: state.user.notice
    }
}

export default connect(mapStateToProps)(Login)