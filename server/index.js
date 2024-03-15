import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from './db.js'
import errorHandler from './error.js'
const app = express()
const PORT = 3000
dotenv.config()
const corsConfig = {
    origin: [
        'http://localhost:3000'
    ],
    methods: ['GET', 'POST', 'PUT'],
    credentials: true
}

mongoose
    .connect(process.env.MONGO)
    .then(() => console.log('connected to mongodb'))
    .catch((err) => console.log(err))

app.use(express.json())
app.use(cors())

// routes
// signup route
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

// signin route
app.post('/signin', async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({
            email
        })
        if (!user) {
            return next(errorHandler(404, "user not found!"))
        }
        else {
            // if user exists, check for his password
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return next(errorHandler(401, "invalid credentials"))
            }
        }
        // now if all OK
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_KEY)
        const { password: hashedPassword, ...restUser } = user._doc

        const expiryDate = new Date()
        expiryDate.setDate(expiryDate.getDate() + 7)        // expiry 7 days from now

        return res
            .cookie('token', token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json({
                message: 'user signed in successfully',
                user: restUser,
                token: `Bearer ${token}`
            })
    }
    catch (err) {
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