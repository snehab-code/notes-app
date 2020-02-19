import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import RegisterForm from './RegisterForm'
import LoginContainer from './LoginContainer'

class Register extends React.Component {
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

    render() {
        
        return (
            <LoginContainer>
                {this.props.isLoggedIn && <Redirect to="/notes"/>}
                {this.props.registrationSuccess && <Redirect to="/login"/>}
                <RegisterForm/>
                <span style={{fontSize:"0.9em", color:"#486175"}}><Link to="/login">Login</Link> | <Link to="">Forgot Password?</Link></span>
            </LoginContainer>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        notice: state.user.notice,
        registrationSuccess: state.user.registrationSuccess
    }
}

export default connect(mapStateToProps)(Register)