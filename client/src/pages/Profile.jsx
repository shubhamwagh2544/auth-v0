import { useSelector } from "react-redux";

export default function Profile() {

    const { currentUser } = useSelector((state) => state.user)
    //console.log(currentUser.user)

    const inputStyles = "bg-slate-200 p-3 rounded-lg";

    return (
        <div className="my-10">
            <h1 className="text-4xl font-semibold text-center my-7">Profile</h1>
            <img
                src={currentUser.user.profilePhoto}
                alt="profile"
                className="h-24 w-24 rounded-full cursor-pointer mx-auto mb-10"
            />
            <div className="flex flex-col max-w-lg gap-5 mx-auto">
                <input
                    className={inputStyles}
                    defaultValue={currentUser.user.username}
                    type="text"
                    name="username"
                    placeholder="Username"
                />
                <input
                    className={inputStyles}
                    defaultValue={currentUser.user.email}
                    type="text"
                    name="email"
                    placeholder="Email"
                />
                <input
                    className={inputStyles}
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                <button
                    className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-80"
                >
                    Update Profile
                </button>
            </div>
        </div>
    )
}
