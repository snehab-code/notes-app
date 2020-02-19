import axios from "../config/axios"
import {startGetNotes} from '../actions/notes'
import {startGetCategories} from '../actions/categories'

const loginUser = (token, notice) => {
    return {type: 'LOGIN_USER', payload: {token, notice}}
}

const logoutUser = (notice) => {
    return {type: 'LOGOUT_USER'
    // , payload: {notice}
}
}

const reloginUser = () => {
    return {type: 'AUTHORISE_USER'}
}

const registerUser = (notice) => {
    return {type: 'REGISTER_USER', payload: notice}
}

export const startUserLogin = (formData) => {
    return (dispatch) => {
        axios.post('/users/login', formData)
            .then(response => {
                if (response.data.notice) {
                    const notice = response.data.notice
                    dispatch(loginUser('', notice))
                } else {
                    const token = response.data
                    localStorage.setItem('authToken', token)
                    dispatch(loginUser(token, ''))
                    dispatch(startGetNotes())
                    dispatch(startGetCategories())
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

// change names for consistency - startLogoutUser and so on
export const startUserLogout = () => {
    return (dispatch) => {
        axios.delete('/users/logout')
            .then(response => {
                if (response.data.notice) {
                    const notice = response.data.notice
                    dispatch(logoutUser(notice))
                    localStorage.clear()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const startCheckUserAuth = () => {
    return (dispatch) => {
        axios.get('/users/check-login')
            .then(response => {
                if (response.data.notice) {
                    dispatch(reloginUser())
                    dispatch(startGetNotes())
                    dispatch(startGetCategories())
                }
            })
            .catch (err => {
                console.log('check userauth error', err)
            })
    }
}

export const startRegisterUser = (formData) => {
    return (dispatch) => {
        axios.post('/users/register', formData)
            .then(response => {
                if (response.data._id) {
                    dispatch(registerUser())
                }
                if (response.data.errors) {
                    console.log('err ')
                    dispatch(registerUser(response.data.message))
                }
            })
            .catch(err => {
                console.log(err)
            })

    }
}