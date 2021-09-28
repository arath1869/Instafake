import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { update_image, get_feed } from "../../store/feed";
import './EditPostModal.css'

const EditPostModal = ({image, changeShowEditModal}) => {
    const [caption, setCaption] = useState(image.caption)
    const dispatch = useDispatch()

    const handleImageEdit = (e) => {
        e.preventDefault()
        dispatch(update_image(image.id, caption))
        changeShowEditModal(false)
    }

    function handleCloseClick(){
        changeShowEditModal(false)
    }

    return (
        <div className="edit-caption-container">
            <div className="edit-caption-title__holder">
                <div className="edit-caption-title">Edit Post</div>
            </div>
            <div className="edit-image-holder" style={
                { backgroundImage: `url(${image.imgUrl})` }
            }></div>
            <div className="change-caption-container">
                <form onSubmit={handleImageEdit}>
                    <div>
                        <textarea className="textarea-edit"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="edit-buttons-container">
                        <button className="update-button" type='submit'>Update</button>
                        <button className="close-button" type="button" onClick={handleCloseClick}>Close</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default EditPostModal