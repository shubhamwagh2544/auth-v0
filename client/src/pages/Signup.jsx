import { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../global";
import { signInStart, signInSuccess, signInFailure, inputHandleActive } from "../redux/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

export default function SignUp() {

    const [state, setState] = useState({
        username: "",
        email: "",
        password: ""
    })
    //const [loading, setLoading] = useState(false)
    //const [error, setError] = useState(false)

    const inputStyles = "bg-slate-200 p-3 rounded-lg";

    const dispatch = useDispatch()
    const { loading, error } = useSelector((state) => state.user)

    function inputHandler(e) {
        //setLoading(false)
        //setError(false)
        dispatch(inputHandleActive())
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    async function submitHandler(e) {
        e.preventDefault()
        console.log(state)
        //setError(false)
        //setLoading(true)
        dispatch(signInStart())
        try {
            const response = await axios.post(`${BACKEND_URL}/signup`, state, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data)
            //setLoading(false)
            dispatch(signInSuccess(response.data))
        }
        catch (err) {
            //setLoading(false)
            //setError(true)
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
        <div className="my-10">
            <h1 className="text-4xl font-semibold text-center my-7">Sign Up</h1>

            <div className="flex flex-col max-w-lg gap-5 mx-auto">
                <input
                    className={inputStyles}
                    type="text"
                    name="username"
                    placeholder="Username"
                    autoComplete="off"
                    onChange={inputHandler}
                />
                <input
                    className={inputStyles}
                    type="text"
                    name="email"
                    placeholder="Email"
                    autoComplete="off"
                    onChange={inputHandler}
                />
                <input
                    className={inputStyles}
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="off"
                    onChange={inputHandler}
                />
                <button
                    className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80 my-5"
                    onClick={submitHandler}
                    disabled={loading}
                >
                    {loading ? "Loading" : "Sign Up"}
                </button>
            </div>

            <div className="flex items-center justify-center mt-3 gap-2">
                <p>Have an account?</p>
                <Link to="/signin">
                    <span className="text-blue-500">Sign In</span>
                </Link>
            </div>
            <div className="text-center">
                <p className="text-red-700 mt-7">{error ? "something went wrong..." : null}</p>
            </div>
        </div>
    );
}
