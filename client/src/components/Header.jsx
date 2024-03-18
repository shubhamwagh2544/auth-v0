import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {

    const { currentUser } = useSelector((state) => state.user)
    console.log(currentUser)

    return (
        <div className="flex bg-slate-200 justify-between p-3">
            <Link to="/">
                <div className="text-2xl font-semibold ml-10 text-red-600">Auth App</div>
            </Link>
            <ul className="flex gap-8 mr-10">
                <Link to="/home">                   {/* Link must be inside Router */}
                    <li>Home</li>
                </Link>
                <Link to="/about">
                    <li>About</li>
                </Link>
                <Link to="/profile">
                    {
                        currentUser ? (
                            <img
                                src={currentUser.profilePhoto}
                                alt="profile"
                                className='h-7 w-7 rounded-full object-cover'
                            />
                        ) : (
                            <li>SignIn</li>
                        )
                    }
                </Link>
            </ul>
        </div>
    )
}
