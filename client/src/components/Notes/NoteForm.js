import React from 'react'
import axios from 'axios'

class NoteForm extends React.Component {
    constructor(props) {
        super(props)
        console.log('cons', props)
        this.state = {
            title: this.props.title ? this.props.title : '',
            description: this.props.description ? this.props.description : '',
            category: this.props.category ? this.props.category._id : '',
            categories: [],
            image: null 
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3015/categories')
            .then(response => {
                this.setState({categories: response.data})
            })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            title: this.state.title,
            description: this.state.description,
            category: this.state.category,
        }
        const form = new FormData()
        for (let key in formData) {
            form.append(key, formData[key])
        }
        
        form.append('image', this.state.image)
        this.props.handleSubmit(form)
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }

    handleImageChange = (e) => {
        this.setState({image: e.target.files[0]})
    }

    render() {
        return (
            <form onSubmit = {this.handleSubmit}>
                <label htmlFor="title">title</label>
                <br/>
                <input id="title" value={this.state.title} onChange={this.handleChange}/>
                <br/>
                <label htmlFor="description">description</label>
                <br/>
                <input id="description" value={this.state.description} onChange={this.handleChange}/>
                <br/>
                <label htmlFor="category">Category</label>
                <br/>
                <select id="category" value={this.state.category} onChange={this.handleChange}>
                    <option></option>
                    {
                        this.state.categories.map(category => {
                            return <option key={category._id} value={category._id}>{category.name}</option>
                        })
                    }
                </select>
                <br/>
                <input type = "file" onChange = {this.handleImageChange}/>
                <br/>
                <input type="submit" />
            </form>
            
        )
    }
}

export default NoteForm