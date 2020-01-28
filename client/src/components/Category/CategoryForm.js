import React from 'react'

class CategoryForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name ? this.props.name : ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name
        }

        this.props.handleSubmit(formData)
    }

    handleChange = (e) => {
        const name = e.target.value
        this.setState({name})
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.name} onChange={this.handleChange} />
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

export default CategoryForm