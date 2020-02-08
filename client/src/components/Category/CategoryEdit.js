import React from 'react'
import CategoryForm from './CategoryForm'
import axios from 'axios'

class CategoryEdit extends React.Component {

    handleSubmit = (formData) => {
        const id = this.props.id
        axios.put(`/categories/${id}`, formData) 
            .then(response => {
                this.props.cancel(response.data)
            })
    }

    render() {
        return (
            <div>
                <CategoryForm name={this.props.name} handleSubmit={this.handleSubmit} /> <button onClick={this.props.cancel}>cancel</button>
            </div>
        )
    }
}

export default CategoryEdit