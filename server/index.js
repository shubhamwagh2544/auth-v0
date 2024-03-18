import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { User } from './db.js'
import errorHandler from './error.js'
import { authmiddleware } from './authmiddleware.js'
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
app.use(cookieParser())

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

        // send jwt
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_KEY)

        const {password: hashedPwd, ...restUser} = user._doc
        return res.status(201).json({
            message: 'user created successfully',
            user: restUser,
            token: `Bearer ${token}`
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

// googleauth route
app.post('/googleauth', async (req, res, next) => {
    // TODO
})

// update profile
app.put('/update/:id', authmiddleware, async (req, res, next) => {
    if (req.params.id != req.user.id) {
        return next(errorHandler(401, "unauthorized access..."))
    }

    try {
        // if client sends new password, we must hash it
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePhoto: req.body.profilePhoto
            },
        }, { new: true })

        const { password: hashedPassword, ...restUser } = updatedUser._doc
        
        return res.status(200).json({
            message: 'user updated successfully',
            updatedUser: restUser
        })
    }
    catch (err) {
        return next(err)
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