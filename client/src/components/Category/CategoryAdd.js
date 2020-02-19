import React from 'react'
import CategoryForm from './CategoryForm'
import {connect} from 'react-redux'
import {startPostCategory} from '../../actions/categories'

class CategoryAdd extends React.Component{
    constructor() {
        super()
        this.state = {
            message: ''
        }
    }

    handleSubmit = (formData) => {
        this.props.dispatch(startPostCategory(formData))
    }

    render() {
        return (
            <div>
                <h1> Add a category </h1>
                <CategoryForm handleSubmit={this.handleSubmit} />
                {this.state.message ? this.state.message : ""}
            </div>
        )
    }
}

export default connect()(CategoryAdd)

    