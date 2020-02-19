import React from 'react'
import CategoryForm from './CategoryForm'
import {connect} from 'react-redux'
import {startPutCategory} from '../../actions/categories'

function CategoryEdit(props) {

    const handleSubmit = (formData) => {
        const id = this.props.id
        props.dispatch(startPutCategory(id, formData))
    }

    return (
        <div>
            <CategoryForm name={props.name} handleSubmit={handleSubmit} /> <button onClick={this.props.cancel}>cancel</button>
        </div>
    )
}

export default connect()(CategoryEdit)