import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { update_user } from "../../store/user";
import { uploadFile } from 'react-s3'
import { authenticate } from "../../store/session";
import './UpdateProfile.css'

const config = {
    bucketName: process.env.REACT_APP_BUCKET,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
}

const UpdateProfile = () => {
    const user = useSelector(state => state.session.user)
    const username = user.username
    const userId = user.id
    const imageUrl = user.profileImgUrl

    const[profileImgUrl, setProfileImgUrl] = useState(null)
    const [imageProvided, setImageProvided] = useState(false)
    const dispatch = useDispatch()
    const imageInput = useRef(null)

    const handleUrlSubmit = (e) => {
        e.preventDefault();
        async function upload() {
            try {
                const data = await uploadFile(e.target.files[0], config)
                setProfileImgUrl((data.location).replace(/\s/g, '+'))
                setImageProvided(true)
            } catch (e) {
                return 
            }
        }
        upload()
        console.log("profileimgeurl", profileImgUrl)
    }

    let [count, setCount] = useState(0)
    useEffect(() => {
    if(imageProvided){
        dispatch(update_user(user.id, profileImgUrl))
    }
    },[imageProvided])

    useEffect(() => {
        console.log("imageimnbpoutttthjthj",imageInput)
    },[imageInput])

    const handleClickSelect = (e) => {
        e.preventDefault()
        imageInput.current.click()
    }

    const handleImageUpdate = (profileImgUrl) => {
        dispatch(update_user(user.id, profileImgUrl))
    }


    console.log("hello from update profile")

    console.log("profileimageurlfrom user",user.profileImgUrl)
    return (
        <>
        <div className="updateProfile__test">{`Username is "${username}", userId is "${userId}" and the image url is "${imageUrl}"`}</div>
            <>
                <div className='exit-bar__image_upload'>
                    <i className="far fa-image"></i>
                    <h2 className='modal-header__image_upload'>New Post</h2>
                </div>
                <div className='container__image_upload image-select-container__image_upload'>
                    <div>
                        <button className='select-button__image_upload' onClick={handleClickSelect}>Select an image (PNG, JPG)</button>
                        <input ref={imageInput} style={{ display: 'none' }} type='file' accept='.png,.jpeg,.jpg,' onChange={handleUrlSubmit} />
                    </div>
                </div>
            </>
        </>
    )
}

export default UpdateProfile