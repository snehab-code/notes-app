import React from 'react'
import {connect} from 'react-redux'
import NoteList from '../Notes/NoteList'

function CategoryShow(props) {
    return (
        <div>
            {
                props.category ? 
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    {
                        <h1>{props.category.name}</h1>
                    }
                    <NoteList category={props.match.params.id} />
                </div>
                : <br/>
            }
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        category: state.categories.find(category => category._id == props.match.params.id)
    }
}

export default connect(mapStateToProps)(CategoryShow)