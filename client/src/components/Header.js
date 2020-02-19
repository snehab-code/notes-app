import React from 'react'
import Box from '@material-ui/core/Box'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {startUserLogout} from '../actions/user'
// import TextField from '@material-ui/core/TextField'

class Header extends React.Component {

    componentDidMount() {
        if (!localStorage.getItem('authToken') && this.props.location != '/register') this.props.history.push('/login')
    }
    
    handleLogout = () => {
        this.props.dispatch(startUserLogout())
        this.props.dispatch({type: 'LOGOUT'})
    }

    render() {
        return (
            <Box display="flex" justifyContent="space-between" alignItems="center" style={{width:"100%"}}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Link to="/"><h1 style={{fontSize:24}}>NOTES</h1></Link>
                </Box>
                <div style={{display: 'flex', justifyContent: "space-evenly", alignItems:"flex-start"}}>
                    {/* <TextField size="small" style={{width:"100%"}} color="secondary" label="Search"/> */}
                    {this.props.isLoggedIn && 
                        <>
                        {/* <Link style={{color:"#e0a71f", marginRight:5}} to="/categories">
                        CATEGORIES
                        </Link> */}
                        <Link style={{color:"#f04665"}} to="/notes">
                            NOTES
                        </Link>
                        <Link style={{color:"#e0a71f", marginRight:5}} onClick = {this.handleLogout} to="/">
                        LOGOUT
                        </Link>
                        </>
                    }
                    {!this.props.isLoggedIn && <Link style={{color:"#e0a71f", marginRight:5}} to="/login">
                        LOGIN
                    </Link>}
                </div>
            </Box> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn
    }
}

export default withRouter(connect(mapStateToProps)(Header))