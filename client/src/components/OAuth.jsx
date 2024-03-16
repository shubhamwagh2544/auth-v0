import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import axios from 'axios'
import { app } from '../firebase'
import { BACKEND_URL } from '../global'
import { useDispatch } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'

export default function OAuth() {

    const dispatch = useDispatch()

    async function googleAuthHandler() {
        dispatch(signInStart())
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const response = await signInWithPopup(auth, provider)
            console.log(response)
            const body = {
                name: response.user.displayName,
                email: response.user.email,
                photo: response.user.photoURL
            }
            const res = await axios.post(`${BACKEND_URL}/googleauth`, body, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(res.data)
            dispatch(signInSuccess(res.data))
        }
        catch (err) {
            dispatch(signInFailure())
            if (err.response) {
                console.log(err.response.data)
            }
            else if (err.request) {
                console.log(err.request)
            }
        }
    }

    return (
        <button
            className="bg-red-700 rounded-lg p-3 text-white uppercase hover:opacity-90"
            onClick={googleAuthHandler}
        >
            Continue With Google
        </button>
    )
}
