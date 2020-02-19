const express = require('express')
const cors = require('cors')
const setupDB = require('./config/database')
const router = require('./config/routes')
const path = require('path')
const app = express()
const port = process.env.PORT || 3015

app.use(express.json())
app.use(cors())

setupDB()

app.use('/uploads', express.static('uploads'))
app.use('/', router)

// app.use(express.static(path.join(__dirname,"client/build"))) 
// app.get("*",(req,res) => { 
//     res.sendFile(path.join(__dirname + "/client/build/index.html")) 
// }) 

app.get('/', (req,res) => {
    res.json({
        notice: 'welcome to notes app'
    })
})

app.listen(port, () => {
    console.log('listening on port ',port)
})

