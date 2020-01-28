import React from 'react'
import axios from 'axios'

class CategoryShow extends React.Component{
    constructor() {
        super()
        this.state = {
            category: {}
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3015/categories/${this.props.match.params.id}`)
            .then(response => {
                const category = response.data
                this.setState({category})
            })
    }

    render() {
        return (
            <div>
                {
                    this.state.category ? 
                    <div>
                        {
                           <h1> {this.state.category.name}</h1>
                        }
                    </div>
                    : <br/>
                }
            </div>
        )
    }
}

export default CategoryShow