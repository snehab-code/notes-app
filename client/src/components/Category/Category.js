import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import CategoryEdit from './CategoryEdit'

class CategoryList extends React.Component{
    constructor() {
        super()
        this.state = {
            categories: [],
            edit: ''
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3015/categories")
            .then(response => {
                const categories = response.data
                this.setState({categories})
            })
    }

    handleRemove = (id) => {
        axios.delete(`http://localhost:3015/categories/${id}`)
            .then((response) => {
                const category = response.data
                this.setState(prevState => {
                    const categories = prevState.categories.filter(categ => categ._id !== category._id)
                    return {categories}
                })
            })
            .catch(err => console.log(err))
    }

    handleEditClick = (edit) => {
        this.setState({edit})
    }
    
    handleEditCancel = (data) => {
        if (data.name) {
            console.log(data)
            this.setState(prevState => {
                const categories = [...prevState.categories]
                categories.find(cat => cat._id === data._id).name = data.name
                this.setState({categories})
            })
        }
        this.setState({edit: ''})
    }

    render() {
        console.log('yes')
        return (
            <div>
                <h2>Listing Categories - {this.state.categories.length}</h2>
                <ul>
                    {
                        this.state.categories.map(category => {
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

export default CategoryList