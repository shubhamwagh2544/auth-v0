import jwt from "jsonwebtoken"
import errorHandler from "./error.js"

export function authmiddleware(req, res, next) {
    //const token = req.cookies.token
    const token = req.headers.authorization.split(" ")[1]
    //console.log(token)
    if (!token) {
        return next(errorHandler(401, "unauthorized access...please sign in first!"))
    }
    else {
        // verify the token
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return next(errorHandler(403, "invalid token...please sign in again!"))
            }
            else {
                req.user = decoded          // store the user info in req object
                next()
            }
        })
    }
}