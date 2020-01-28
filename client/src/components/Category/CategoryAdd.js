import React from 'react'
import CategoryForm from './CategoryForm'
import axios from 'axios'

class CategoryAdd extends React.Component{
    constructor() {
        super()
        this.state = {
            message: ''
        }
    }

    handleSubmit = (formData) => {
        axios.post('http://localhost:3015/categories', formData)
            .then(response => {
                const category = response.data
                this.setState({message: `Added ${category.name}`})
                setTimeout(()=> {
                    this.props.history.push('/categories')
                }, 1500)
            })
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <h1> Add a category </h1>
                <CategoryForm handleSubmit={this.handleSubmit} />
                {this.state.message ? this.state.message : ""}
            </div>
        )
    }
}

export default CategoryAdd