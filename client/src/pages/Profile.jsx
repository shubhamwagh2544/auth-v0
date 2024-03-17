import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase";

export default function Profile() {

    const { currentUser } = useSelector((state) => state.user)
    //console.log(currentUser.user)

    const fileRef = useRef(null)
    const [image, setImage] = useState(null)
    const [imageUploadPercentage, setImageUploadPercentage] = useState(0)
    const [imageError, setImageError] = useState(false)
    const [profileLink, setProfileLink] = useState("")
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
                        setProfileLink(downloadURL)
                    })
            }
        )
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
                src={profileLink || currentUser.user.profilePhoto}
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
                <div className="flex justify-between mt-10">
                    <span className="text-red-700 cursor-pointer">Delete Account</span>
                    <span className="text-red-700 cursor-pointer">Sign Out</span>
                </div>
            </div>
        </div>
    )
}
