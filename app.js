const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require('./helper/init_mongodb')
const AuthRoutes = require('./routes/Auth.route')


const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 3000

app.get('/', async (req, res, next)=>{
    res.send('test')
})

app.use('/auth', AuthRoutes)

//catch all route
app.use(async(req, res, next)=>{
    // const error = new Error("Not found")
    // error.status = 404
    // next(error)
    next(createError.NotFound())
    next(createError.NotFound('This error does not exists'))
})

app.use((err, req, res, next)=>{
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

app.listen(PORT, ()=>{
    console.log('The server is running on port', PORT)
})


