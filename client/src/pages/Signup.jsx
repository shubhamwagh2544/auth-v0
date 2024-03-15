import { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../global";

export default function SignUp() {

    // const [username, setUsername] = useState("")
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    const [state, setState] = useState({
        username: "",
        email: "",
        password: ""
    })

    const inputStyles = "bg-slate-200 p-3 rounded-lg";

    function inputHandler(e) {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    async function submitHandler(e) {
        e.preventDefault()
        //console.log(state)

        try {
            const response = await axios.post(`${BACKEND_URL}/signup`, state, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data)
        }
        catch (err) {
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
                >
                    Sign Up
                </button>
            </div>

            <div className="flex items-center justify-center mt-3 gap-2">
                <p>Have an account?</p>
                <Link to="/signin" className="text-blue-500">Sign In</Link>
            </div>
        </div>
    );
}
