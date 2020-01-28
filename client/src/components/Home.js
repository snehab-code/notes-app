import React from 'react'


function Home (props) {
    return (
        <div style={{display:"flex", alignItems: "center", justifyContent:"center", width:"100%", height: "70%"}}>
            <div style={{
                backgroundImage: "linear-gradient(to right, #f5d382, #f7a1b1)",
                padding: 3,
                borderRadius:12,
                height:250,
                width:400
            }}>
                <h2 style={{background:"white", borderRadius:10, height: 244, padding:0, margin:0, display:"flex", justifyContent:"center", alignItems:"center", color: "#374957"}}>Welcome to notes app</h2>
            </div>

        </div>
    )
}

export default Home