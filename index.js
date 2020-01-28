const express = require('express')
const cors = require('cors')
const setupDB = require('./config/database')
const router = require('./config/routes')
 
const app = express()
const port = 3015
// const bodyParser= require('body-parser')

app.use(express.json())
app.use(cors())
// app.use(bodyParser.urlencoded({extended: true}))
// this allows whitelisting etc
setupDB()

// THIS IS ENOUGH to make the images automatically gettable!
app.use('/uploads', express.static('uploads'))

app.use('/', router)

app.get('/', (req,res) => {
    res.json({
        notice: 'welcome to notes app'
    })
})

app.listen(port, () => {
    console.log('listening on 3015')
})

