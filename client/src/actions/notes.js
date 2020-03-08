import axios from '../config/axios'
import {addCategory} from './categories'

const setNotes = (notes) => {
    return {type: 'SET_NOTES', payload: notes}
}

const addNote = (note) => {
    return {type: 'ADD_NOTE', payload: note}
}

const removeNote = (id) => {
    return {type: 'REMOVE_NOTE', payload: id}
}

const updateNote = (id, note) => {
    return {type: 'UPDATE_NOTE', payload: {id, note}} 
}

export const startGetNotes = () => {
    return (dispatch) => {
        axios.get('/notes')
            .then(response => {
                const notes = response.data
                dispatch(setNotes(notes))
            })
            .catch(err => {
                console.log('startGetNotes err', err)
            })
    }
}

export const startPostNote = (formData, closeModal) => {
    return (dispatch) => {
        axios.post('/notes', formData)
            .then(response => {
                const note = response.data
                dispatch(addNote(note))
                closeModal()
            })
            .catch(err => {
                console.log('startPostNote err', err)
            })
    }
}

export const startPostNoteWithCategory = (formData, closeModal, newCategory) => {
    return (dispatch) => {
        axios.post('/categories', newCategory)
            .then(response => {
                const category = response.data
                formData.set('category', category._id)
                axios.post('/notes', formData)
                .then(response => {
                    const note = response.data
                    dispatch(addNote(note))
                    dispatch(addCategory(category))
                    closeModal()
                })
                .catch(err => {
                    console.log('startPostNote err', err)
                })
            })
    }
}

export const startDeleteNote = (id) => {
    return (dispatch) => {
        axios.delete(`/notes/${id}`)
            .then(response => {
                const id = response.data._id
                dispatch(removeNote(id))
            })
            .catch(err => {
                console.log('startDeleteNote err', err)
            })
    }
}

export const startPutNote = (id, formData, closeModal) => {
    return (dispatch) => {
        axios.put(`/notes/${id}`, formData)
            .then(response=>{
                const note = response.data
                const id = note._id
                dispatch(updateNote(id, note))
                closeModal()
            })
            .catch(err => {
                console.log('update note error', err)
            })
    }
}

export const startPutNoteWithCategory = (id, formData, closeModal, newCategory) => {
    return (dispatch) => {
        axios.post('/categories', newCategory)
            .then(response => {
                const category = response.data
                formData.set('category', category._id)
                axios.put(`/notes/${id}`, formData)
                .then(response=>{
                    const note = response.data
                    const id = note._id
                    dispatch(updateNote(id, note))
                    dispatch(addCategory(category))
                    closeModal()
                })
                .catch(err => {
                    console.log('update note error', err)
                })
            })
    }
}

export const startPinNote = (id, pinStatus) => {
    return (dispatch) => {
        const formData = {
            isPinned: !pinStatus
        }
        axios.put(`/notes/${id}`, formData)
            .then(response => {
                const note = response.data
                const id = note._id
                dispatch(updateNote(id, note))
            })
            .catch(err => {
                console.log(err => {
                    console.log('update note error', err)
                })
            })
    }
}