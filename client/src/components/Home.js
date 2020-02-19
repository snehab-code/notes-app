import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class Home extends React.Component {

    render() {
        return <>
            {!this.props.isLoggedIn && <Redirect to="/login" />}
            {/* {this.props.isLoggedIn && <Redirect to="/notes"/>} */}
        </>
    }
    
}

// const mapStateToProps = (state) => {
//     return {user: 'hi'}
// }

// export default withRouter(connect(mapStateToProps)(Home))

export default connect()(Home)