import React from 'react'
import {Link, Redirect} from 'react-router-dom'

function LoginContainer(props) {
    return (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%", height: "100%", minHeight:"300px", maxWidth:900, position:"relative", top:"-30px"}}>
                
                <div style={{
                    backgroundImage: "linear-gradient(to right, #fcf3de, #fcdee4)",
                    padding: 2,
                    borderRadius:12,
                    height:"100%",
                    width:"62%",
                    maxHeight: 480
                }}>
                    <div style={{borderRadius:10, height: "100%", padding:0, margin:0,  width:"100%", background:"white",  backgroundPosition:"center", display:"flex",  alignItems: "stretch", justifyContent:"center"}}>
                        <div style={{height:"100%", width:"100%", borderTopLeftRadius:10, borderBottomLeftRadius: 10, overflow:"hidden", backgroundImage: `url(https://source.unsplash.com/collection/9507219/300x500)`, backgroundPosition:"center center"}}>
                        </div>

                        <div style={{display:"flex", flexDirection: "column",alignItems:"center", justifyContent: "flex-end", width:"100%", minWidth:"200px"}}>
                                
                            {props.children}
            
                        </div>                       
                    </div>
                </div>
            </div>
    )
}

export default LoginContainer