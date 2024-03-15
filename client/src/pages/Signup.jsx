import { Link } from "react-router-dom"

export default function SignUp() {
    const inputStyles = "bg-slate-200 p-3 rounded-lg"
    return (
        <div className="my-10">
            <h1 className="text-4xl font-semibold text-center my-7">Sign Up</h1>
            <div className="flex flex-col max-w-lg gap-5 m-auto">
                <input className={inputStyles} type="text" placeholder="username" />
                <input className={inputStyles} type="text" placeholder="email" />
                <input className={inputStyles} type="text" placeholder="password" />
                <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80 my-5">sign up</button>
            </div>
            <div className="flex items-center gap-2 justify-center mt-3">
                <p>Have an account</p>
                <Link to="/signin">
                    <span className="text-blue-500">Sign In</span>
                </Link>
            </div>
        </div>
    )
}
