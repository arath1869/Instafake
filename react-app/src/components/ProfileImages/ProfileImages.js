import React,{ useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal"
import ProfileFeedModal from "../ProfileFeedModal/ProfileFeedModal";
import { useParams } from 'react-router-dom';

const ProfileImages = ({ image }) => {
    
    const [showImageModal, setShowImageModal] = useState(false);
    const { userId } = useParams();
    const users = useSelector(state => state.users)
    const profileOwner = users[userId]
    const [word, setWord] = useState('parent')
    let [count, setCount] = useState(0)

    useEffect(() => {
        setCount(count+=1)
        console.log('count',count)
        if(count % 4 === 0){
            setShowImageModal(false)
        }
    }, [word])

    return (
        <>
        <div onClick={() => { setShowImageModal(true) }} className="profile-images__mapped" style={
            { backgroundImage: `url(${image.imgUrl})` }
        }></div>
            {(showImageModal) && (
                <Modal onClose={() => setShowImageModal(false)}>
                    <ProfileFeedModal image={image} profileOwner={profileOwner} changeWord={word => setWord(word)}/>
                </Modal>
            )}
        </>
    )
}

export default ProfileImages