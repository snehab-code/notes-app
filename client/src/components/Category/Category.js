import React from 'react'
import {Link} from 'react-router-dom'
import CategoryEdit from './CategoryEdit'
import {connect} from 'react-redux'

class CategoryList extends React.Component{
    constructor() {
        super()
        this.state = {
            edit: ''
        }
    }

    handleRemove = (id) => {
        console.log(id)
    }

    handleEditClick = (edit) => {
        this.setState({edit})
    }
    
    handleEditCancel = (data) => {
        if (data.name) {
            this.setState(prevState => {
                const categories = [...prevState.categories]
                categories.find(cat => cat._id === data._id).name = data.name
                this.setState({categories})
            })
        }
        this.setState({edit: ''})
    }

    render() {
        return (
            <div>
                <h2>Listing Categories - {this.props.categories.length}</h2>
                <ul>
                    <li>Uncategorised</li>
                    {
                        this.props.categories.map(category => {
                            return (
                                this.state.edit !== category._id ?
                                <li key = {category._id}>
                                    <Link to={`/categories/${category._id}`}>{category.name}</Link> <button onClick={() => this.handleEditClick(category._id)}>Edit</button> <button onClick={() => this.handleRemove(category._id)}>Remove</button>
                                </li> 
                                :
                                <li key={category._id}>
                                    <CategoryEdit name ={category.name} id={category._id} cancel={this.handleEditCancel}/>
                                </li>
                            )
                        })
                    }
                </ul>
                <Link to={"/categories/add"}>Add a category</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(CategoryList)