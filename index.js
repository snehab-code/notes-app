const express = require('express')
const cors = require('cors')
const setupDB = require('./config/database')
const router = require('./config/routes')
 
const app = express()
const port = 3015

app.use(express.json())
app.use(cors())

setupDB()

app.use('/uploads', express.static('uploads'))

app.use('/', router)

app.get('/', (req,res) => {
    res.json({
        notice: 'welcome to notes app'
    })
})

app.listen(port, () => {
    console.log('listening on port::::::',port)
})

