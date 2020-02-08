import React from 'react'
import Box from '@material-ui/core/Box'
import {Link} from 'react-router-dom'
// import TextField from '@material-ui/core/TextField'

function Header(props) {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" style={{width:"100%"}}>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Link to="/"><h1 style={{fontSize:24}}>NOTES</h1></Link>
            </Box>
            <div style={{display: 'flex', justifyContent: "space-evenly", alignItems:"flex-start"}}>
                {/* <TextField size="small" style={{width:"100%"}} color="secondary" label="Search"/> */}
                <Link style={{color:"#e0a71f", marginRight:5}} to="/categories">
                    CATEGORIES
                </Link>
                <Link style={{color:"#f04665"}} to="/notes">
                    NOTES
                </Link>
            </div>
        </Box> 
    )
}

export default Header