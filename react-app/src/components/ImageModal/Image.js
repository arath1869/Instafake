import React, { useDebugValue, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_comments } from "../../store/comment";

import './Image.css'



const Image = ({ setShowModal, image, user }) => {
    const {comments} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_comments())
    }, [dispatch])

    console.log(comments);
    return (

        <>
            <div className='exit-bar__image_modal'>
            <i className="far fa-image"></i>
                <h2 className='modal-header__image_modal'>Post</h2>
                <i onClick={() => setShowModal(false)} className="far fa-window-close"></i>
            </div>
            <div className='image-post-container__image_modal'>
                <div className='display-container__image_modal'>
                    <img className='image__image_modal' src={image.imgUrl} alt='to be uploaded'></img>
                </div>
                <div className='caption-share-container__image_modal'>
                    <div className='share-container-user-info__image_modal'>
                        <div className='user-profile-thumb__image_modal' style={
                            { backgroundImage: `url(${user.profileImgUrl})` }
                        }></div>
                        <p>{user.username}</p>
                        <p>{image.caption}</p>
                    </div>
                    <div className='comments_container__image_modal'>
                        <div className='image-caption-container__image_modal'>
                            {comments.loading === true && <div>Loading...</div>}
                            {comments.comments && Object.values(comments?.comments).map(comment => {
                                if (comment.imgId === image.id) {
                                    return (
                                        <p>{comment}</p>
                                    )
                                }
                                return ''
                            })}
                        </div>
                        <div className='share-button-container__image_modal'>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


export default Image;
