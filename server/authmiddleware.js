export function authmiddleware(req, res, next) {
    const token = req.cookies.token
    if (!token) {
        console.log('no token:::')
        next()
    }
    else {
        console.log('token::' + token)
        next()
    }
}