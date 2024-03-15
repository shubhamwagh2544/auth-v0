import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bcrypt from 'bcrypt'
import { User } from './db.js'
import errorHandler from './error.js'
const app = express()
const PORT = 3000
dotenv.config()

mongoose
    .connect(process.env.MONGO)
    .then(() => console.log('connected to mongodb'))
    .catch((err) => console.log(err))

app.use(express.json())
app.use(cors())

// routes
app.post('/signup', async (req, res, next) => {
    const { username, email, password } = req.body

    // password hash
    const hashedPassword = bcrypt.hashSync(password, 10)       // 10 salt rounds

    try {
        const user = new User({
            username,
            email,
            password: hashedPassword
        })
        await user.save()
        return res.status(201).json({
            message: 'user created successfully'
        })
    }
    catch (err) {
        // return res.status(500).json({
        //     message: err.message
        // })
        next(err)
    }
})


// global route handler
app.all('*', (req, res) => {
    return res.json({
        msg: 'this might not be the page you are looking for!!!'
    })
})

// global error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'

    return res.status(statusCode).json({
        success: false,
        error: message,
        statusCode
    })
})

app.listen(PORT, () => console.log(`server started on port: ${PORT}`))