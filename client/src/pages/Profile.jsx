import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase";
import { BACKEND_URL } from "../global";
import {
    updateUserStart, updateUserSuccess, updateUserFailure,
    deleteUserStart, deleteUserSuccess, deleteUserFailure, signout
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {

    const { currentUser, loading, error } = useSelector((state) => state.user)
    //console.log(currentUser.user)

    const fileRef = useRef(null)
    const [image, setImage] = useState(null)
    const [imageUploadPercentage, setImageUploadPercentage] = useState(0)
    const [imageError, setImageError] = useState(false)
    const [state, setState] = useState({
        username: currentUser.username,
        email: currentUser.email,
        password: currentUser.password,
        profilePhoto: currentUser.profilePhoto
    })
    const dispatch = useDispatch()
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const navigate = useNavigate()
    const inputStyles = "bg-slate-200 p-3 rounded-lg";

    useEffect(() => {
        if (image) {
            handleFileUpload(image)
        }
    }, [image])

    async function handleFileUpload(image) {
        console.log(image)
        const storage = getStorage(app)
        const fileName = image.name + new Date().getTime()
        const storageRef = ref(storage, fileName)
        const fileUpload = uploadBytesResumable(storageRef, image)

        fileUpload.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log(`Upload is ${Math.round(progress)} % done`)
                setImageUploadPercentage(Math.round(progress))
            },
            (error) => {
                setImageError(true)
            },
            () => {
                getDownloadURL(fileUpload.snapshot.ref)
                    .then((downloadURL) => {
                        setState({ ...state, profilePhoto: downloadURL })
                    })
            }
        )
    }

    function inputHandler(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(state)

        try {
            dispatch(updateUserStart())
            const res = await axios.put(`${BACKEND_URL}/update/${currentUser._id}`, state, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem('token')
                }
            })
            console.log(res.data)
            dispatch(updateUserSuccess(res.data.user))
            setUpdateSuccess(true)
        }
        catch (err) {
            setUpdateSuccess(false)
            dispatch(updateUserFailure())
            if (err.response) {
                console.log(err.response.data)
            }
            else if (err.request) {
                console.log(err.request)
            }
        }
    }

    async function handleDeleteAccount() {
        try {
            dispatch(deleteUserStart())
            const res = await axios.delete(`${BACKEND_URL}/delete/${currentUser._id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem('token')
                }
            })
            console.log(res.data)
            dispatch(deleteUserSuccess(res.data))
            //localStorage.removeItem('token')
            localStorage.clear()
            navigate('/signin')
        }
        catch (err) {
            dispatch(deleteUserFailure())
            if (err.response) {
                console.log(err.response.data)
            }
            else if (err.request) {
                console.log(err.request)
            }
        }
    }

    async function handleSignOut() {
        try {
            await axios.get(`${BACKEND_URL}/signout`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem('token')
                }
            })
            localStorage.removeItem('token')
            dispatch(signout())
            navigate('/signin')
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
            <h1 className="text-4xl font-semibold text-center my-7">Profile</h1>
            <input
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
            />
            {/*
                firebase storage rules:
                allow read;
                allow write: if
                request.resource.size < 2 * 1024 * 1024 &&
                request.resource.contentType.matches('image/.*') 
            */}
            <img
                src={state.profilePhoto || currentUser.profilePhoto}
                alt="profile"
                className="h-24 w-24 rounded-full cursor-pointer mx-auto mb-10"
                onClick={() => fileRef.current.click()}
            />
            <div className="flex items-center justify-center mb-10">
                <p className="text-sm self-center">
                    {
                        imageError ? (
                            <span className="text-red-700">Error uploading image...</span>
                        ) : imageUploadPercentage > 0 && imageUploadPercentage < 100 ? (
                            <span className="text-slate-700">{`Uploading Image: ${imageUploadPercentage} %`}</span>
                        ) : imageUploadPercentage === 100 ? (
                            <span className="text-green-700">Image uploaded successfully</span>
                        ) : ""
                    }
                </p>
            </div>
            <div className="flex flex-col max-w-lg gap-5 mx-auto">
                <input
                    className={inputStyles}
                    defaultValue={currentUser.username}
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={inputHandler}
                />
                <input
                    className={inputStyles}
                    defaultValue={currentUser.email}
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={inputHandler}
                />
                <input
                    className={inputStyles}
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={inputHandler}
                />
                <button
                    className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-80"
                    onClick={handleSubmit}
                >
                    {loading ? "Updating" : "Update Profile"}
                </button>
                <p>
                    {
                        error ? (
                            <span className="text-red-700 mt-3">something went wrong...</span>
                        ) : null
                    }
                </p>
                <p>
                    {
                        updateSuccess ? (
                            <span className="text-green-700 mt-3">Profile updated successfully...</span>
                        ) : null
                    }
                </p>
                <div className="flex justify-between mt-5">
                    <span
                        className="text-red-700 cursor-pointer"
                        onClick={handleDeleteAccount}
                    >
                        Delete Account
                    </span>
                    <span
                        className="text-red-700 cursor-pointer"
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </span>
                </div>
            </div>
        </div>
    )
}
