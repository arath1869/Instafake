import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { update_user } from "../../store/user";
import { get_feed } from "../../store/feed";
import { get_users } from "../../store/user";
import { uploadFile } from 'react-s3'
import { authenticate } from "../../store/session";
import './EditProfilePicModal.css'

const config = {
    bucketName: process.env.REACT_APP_BUCKET,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
}

const EditProfilePicModal = ({changeShowModal, closeModal}) => {

    const user = useSelector(state => state.session.user)
    const [profileImgUrl, setProfileImgUrl] = useState(null)
    const [imageProvided, setImageProvided] = useState(false)
    const dispatch = useDispatch()
    const imageInput = useRef(null)

    const handleUrlSubmit = (e) => {
        e.preventDefault();
        async function upload() {
            try {
                const data = await uploadFile(e.target.files[0], config)
                // setProfileImgUrl('https://i.pinimg.com/474x/60/13/a3/6013a33f806d8d74f43ee2eb565ff4dc.jpg')
                setProfileImgUrl((data.location).replace(/\s/g, '+'))
                setImageProvided(true)
            } catch (e) {
                return 
            }
        }
        upload()
    }


    const handleClickSelect = (e) => {
        e.preventDefault()
        imageInput.current.click()
    }


    useEffect(() => {
        if (imageProvided) {
            dispatch(update_user(user.id, profileImgUrl))
            changeShowModal(true)
            setImageProvided(false)
        }
        dispatch(get_feed())
        dispatch(authenticate())
    }, [imageProvided])

    function handleRemove(){
        setProfileImgUrl('https://i.pinimg.com/474x/60/13/a3/6013a33f806d8d74f43ee2eb565ff4dc.jpg')
        setImageProvided(true)
    }

    function closeTheModal(){
        closeModal(false)
    }


    return (
        <div className="three-dot-modal__four">
            <div className="three-modal-holder__title">
                <div className="three-modal-text__title">Change Profile Photo</div>
            </div>
            <div className="three-modal-holder">
                <div className="three-modal-text__upload" onClick={handleClickSelect}>Upload Photo</div>
                <input ref={imageInput} style={{ display: 'none' }} type='file' accept='.png,.jpeg,.jpg,' onChange={handleUrlSubmit} />
            </div>
            <div className="three-modal-holder">
                <div className="three-modal-text__delete" onClick={handleRemove}>Remove Current Photo</div>
            </div>
            <div className="three-modal-holder__noborder">
                <div className="three-modal-text__normal" onClick={closeTheModal}>Cancel</div>
            </div>
        </div>
    )
}

export default EditProfilePicModal