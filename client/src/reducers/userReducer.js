const userReducer = (state={isLoggedIn: false}, action) => {
    switch(action.type) {
        case 'LOGIN_USER': {
            if (action.payload.token){
                return {isLoggedIn: true, notice: '...Redirecting'}
            } else {
                return {isLoggedIn: false, notice: action.payload.notice}
            }
        }
        case 'LOGOUT_USER': {
            return {isLoggedIn: false
                // , notice: action.payload.notice
            }
        }
        case 'REGISTER_USER': {
            if (action.payload) {
                return {registrationSuccess: false, notice: action.payload}
            } else {
                return {registrationSuccess: true}
            }
        }
        case 'AUTHORISE_USER': {
            return {isLoggedIn: true}
        }
        default: {
            return state
        }
    }
}

export default userReducer