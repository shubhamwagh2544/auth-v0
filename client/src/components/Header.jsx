import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className="flex bg-slate-200 justify-between p-3">
            <Link to="/">
                <div className="text-2xl font-semibold ml-10 text-red-600">Auth App</div>
            </Link>
            <ul className="flex gap-8 mr-10">
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/about">
                    <li>About</li>
                </Link>
                <Link to="/signin">
                    <li>SignIn</li>
                </Link>                     {/* Link must be inside Router */}
            </ul>
        </div>
    )
}
