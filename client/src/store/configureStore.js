import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import notesReducer from '../reducers/notesReducer'
import categoriesReducer from '../reducers/categoriesReducer'
import userReducer from '../reducers/userReducer'

const appReducer = combineReducers({
    notes: notesReducer,
    categories: categoriesReducer,
    user: userReducer  
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') state=undefined
    return appReducer(state, action)
}

const configureStore = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk))
    return store
}

export default configureStore