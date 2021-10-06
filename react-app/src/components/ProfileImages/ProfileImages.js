import React,{ useState, useEffect } from "react";
import { Modal } from "../../context/Modal"
import ProfileFeedModal from "../ProfileFeedModal/ProfileFeedModal";
import { useParams } from 'react-router-dom';
import { delete_image,get_feed } from "../../store/feed";
import { useDispatch, useSelector } from "react-redux"

const ProfileImages = ({ image }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    const [showImageModal, setShowImageModal] = useState(false);
    const { userId } = useParams();
    const users = useSelector(state => state.users)
    const [word, setWord] = useState('parent')
    let [count, setCount] = useState(0)
    const [profileOwner, setProfileOwner] = useState('')
    const [deleteImage, setDeleteImage] = useState(false)

    useEffect(() => {
        if(!userId){
            setProfileOwner(user.id)
        } else {
            setProfileOwner(users[userId])
        }
    },[])

    useEffect(() => {
        if(deleteImage){
            dispatch(delete_image(image.id))
            dispatch(get_feed())
            setShowImageModal(false)
            setDeleteImage(false)
        }
        dispatch(get_feed())
    }, [deleteImage])

    useEffect(() => {
        setCount(count+=1)
        if(count % 4 === 0){
            setShowImageModal(false)
        }
    }, [word])

    function handleonClose(e) {
        e.preventDefault();
        setCount(0)
        setShowImageModal(false);
    }

    return (
        <>
        <div onClick={() => { setShowImageModal(true) }} className="profile-images__mapped" style={
            { backgroundImage: `url(${image.imgUrl})` }
        }></div>
            {(showImageModal) && (
                <Modal onClose={handleonClose}>
                    <ProfileFeedModal changeDeleteImage={deleteImage => setDeleteImage(deleteImage)} image={image} profileOwner={profileOwner} changeWord={word => setWord(word)}/>
                </Modal>
            )}
        </>
    )
}

export default ProfileImages