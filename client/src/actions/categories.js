import axios from '../config/axios'

const setCategories = (categories) => {
    return {type: 'SET_CATEGORIES', payload: categories}
}

export const addCategory = (category) => {
    console.log(category)
    return {type: 'ADD_CATEGORY', payload: category}
}

const removeCategory = (id) => {
    return {type: 'REMOVE_CATEGORY', payload: id}
}

const updateCategory = (id, category) => {
    return {type: 'UPDATE_CATEGORY', payload: {id, category}} 
}

export const startGetCategories = (token) => {
    return (dispatch) => {
        axios.get('/categories')
            .then(response => {
                const categories = response.data
                dispatch(setCategories(categories))
            })
            .catch(err => {
                console.log('startGetCategories err', err)
            })
    }
}

export const startPostCategory = (formData) => {
    return (dispatch) => {
        axios.post('/categories', formData)
            .then(response => {
                const category = response.data
                dispatch(addCategory(category))
                // dispatch()
            })
            .catch(err => {
                console.log('startPostCategory err', err)
            })
    }
}

export const startDeleteCategory = (id) => {
    return (dispatch) => {
        axios.delete(`/categories/${id}`)
            .then(response => {
                const id = response.data._id
                dispatch(removeCategory(id))
            })
            .catch(err => {
                console.log('startDeleteCategory err', err)
            })
    }
}

export const startPutCategory = (id, formData) => {
    return (dispatch) => {
        axios.put(`/categories/${id}`, formData)
            .then(response=>{
                const category = response.data
                const id = category._id
                dispatch(updateCategory(id, category))
            })
    }
}