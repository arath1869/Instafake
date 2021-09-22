import React,{ useState } from "react";
import { Modal } from "../../context/Modal"
import ProfileFeedModal from "../ProfileFeedModal/ProfileFeedModal";

const ProfileImages = ({image, profileOwner}) => {
    
    const [showImageModal, setShowImageModal] = useState(false);

    return (
        <>
        <div onClick={() => { setShowImageModal(true) }} className="profile-images__mapped" style={
            { backgroundImage: `url(${image.imgUrl})` }
        }></div>
            {(showImageModal) && (
                <Modal onClose={() => setShowImageModal(false)}>
                    <ProfileFeedModal image={image} profileOwner={profileOwner}/>
                </Modal>
            )}
        </>
    )
}

export default ProfileImages