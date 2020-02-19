import React from 'react'
import {connect} from 'react-redux'

class NoteForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title ? this.props.title : '',
            description: this.props.description ? this.props.description : '',
            category: this.props.category ? this.props.category._id : '',
            image: null 
        }
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
                        this.props.categories.map(category => {
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

const mapStateToProps = (state, props) => {
    return {
        // note: state.notes.find(note => note._id == props.match.params.id),
        categories: state.categories
    }
}

export default connect(mapStateToProps)(NoteForm)