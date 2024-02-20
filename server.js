const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv/config')
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

connectDB()

const app = express()

//MIDDLEWARES
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// app.use(express.json())
// app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('./routes/goalRoutes'))

app.use(errorHandler)

app.listen(port, () => {
    console.log(`server started on port ${port}`)
}) 