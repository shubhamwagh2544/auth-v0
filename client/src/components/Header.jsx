import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {

    const { currentUser } = useSelector((state) => state.user)
    console.log(currentUser)

    return (
        <div className="flex bg-slate-200 justify-between items-center p-3">
            <Link to="/">
                <div className="text-2xl font-semibold ml-10 text-red-600">Auth App</div>
            </Link>
            <ul className="flex gap-8 mr-10">
                {/* <Link to="/home">                   
                    <li>Home</li>
                </Link>
                <Link to="/about">
                    <li>About</li>
                </Link> */}
                <Link to="/profile">            {/* Link must be inside Router */}
                    {
                        currentUser ? (
                            <img
                                src={currentUser.profilePhoto}
                                alt="profile"
                                className='h-7 w-7 rounded-full object-cover'
                            />
                        ) : (
                            <li>Sign In</li>
                        )
                    }
                </Link>
            </ul>
        </div>
    )
}
