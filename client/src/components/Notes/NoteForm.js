import React from 'react'
import {connect} from 'react-redux'
import CreatableSelect from 'react-select/creatable';

const customStyles = {
    border: '1px solid hsl(0,0%,80%)',
    borderRadius: '4px',
    padding: '5px',
    backgroundColor: 'white'
}

class NoteForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title ? this.props.title : '',
            description: this.props.description ? this.props.description : '',
            category: this.props.category ? this.props.category._id : '',
            image: null,
            noteCategory: null
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

    handleCategoryChange = (newValue) => {
        console.log(newValue)
        if (newValue) {
            this.setState({noteCategory: newValue})
        } else {
            this.setState({noteCategory: ''})
        }
    }

    // handleInputChange = (inputValue, actionMeta) => {
    //     console.log(inputValue)
    //     console.log(actionMeta)
    // }

    render() {
        console.log(this.props, this.state, 'noteform')
        return (
            <form onSubmit = {this.handleSubmit} style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                <label htmlFor="title">title</label>
                <input style={customStyles} id="title" value={this.state.title} onChange={this.handleChange}/>
                <label htmlFor="description">description</label>
                <input style={customStyles} id="description" value={this.state.description} onChange={this.handleChange}/>
                <label htmlFor="category">Category</label>
                <CreatableSelect 
                    isClearable
                    onChange={this.handleCategoryChange}
                    options={this.props.creatableCategories}
                    onInputChange = {this.handleInputChange}
                    value = {this.state.noteCategory}
                />
                <br/>
                <input style={customStyles} type = "file" onChange = {this.handleImageChange}/>
                <br/>
                <input style={customStyles} type="submit" />
            </form>
            
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        categories: state.categories,
        creatableCategories: state.categories.map(category => {
            return {
                label: category.name,
                value: category._id
            }
        }),
        noteCategory: props.category && {
            label: props.category.name,
            value: props.category._id
        }
    }
}

export default connect(mapStateToProps)(NoteForm)