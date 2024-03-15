import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { User } from './db.js'
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
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body
    try {
        const user = new User({
            username,
            email,
            password
        })
        await user.save()
        return res.status(201).json({
            message: 'user created successfully'
        })
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})


app.all('*', (req, res) => {
    return res.json({
        msg: 'home'
    })
})

app.listen(PORT, () => console.log(`server started on port: ${PORT}`))