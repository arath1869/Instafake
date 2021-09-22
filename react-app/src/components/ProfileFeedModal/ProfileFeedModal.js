import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_new_comment } from "../../store/comment";
import { get_feed } from "../../store/feed";
import LikeUnlikeComponent from "../LikeUnlikeComponent";

const ProfileFeedModal = ({image, profileOwner}) => {

    const dispatch = useDispatch()
    const [comment, setComment] = useState('')

    const handleCommentSubmit = (e) => {
        e.preventDefault()
        const update_comment = async () => {
            await dispatch(set_new_comment(comment, image.id))
            await dispatch(get_feed())
        }
        update_comment()
        setComment('')
    }


    return (
        <div className='image-display-modal-container__image_modal'>
            <div className='image-post-container__image_modal'>
                <div className='display-container__image_modal'>
                    <div className='image__image_modal' style={
                        { backgroundImage: `url(${image?.imgUrl})` }
                    }></div>
                    <p>{image.caption}</p>
                </div>
                <div className='caption-share-container__image_modal'>
                    <div className='share-container-user-info__image_modal'>
                        <div className='user-profile-thumb__image_modal' style={
                            { backgroundImage: `url(${profileOwner.profileImgUrl})` }
                        }></div>
                        <p>{profileOwner.username}</p>
                    </div>
                    <div className='comments_container__image_modal'>
                        <div className='comment-section__image_modal'>
                            {Object.values(image.comments).map(comment => {
                                return <CommentCard comment={comment} />
                            })}
                        </div>
                        <LikeUnlikeComponent imageId={image.id} />
                        <div className='comment-button-container__image_modal'>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className='comment-input__image_modal'
                                placeholder='Leave a comment...'
                            ></textarea>
                            <div className='share-button-container__image_modal'>
                                <button
                                    disabled={(comment.length === 0) ? true : false}
                                    className='comment-button__image_modal'
                                    onClick={handleCommentSubmit}
                                >Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


const CommentCard = ({ comment }) => {
    return (
        <>
            <div className='comment-card__image_modal'>
                <div className='commenter-profile-thumb__image_modal' style={
                    { backgroundImage: `url(${comment.commenter.profileImgUrl})` }
                }></div>
                <div className='comment__image_modal'>
                    <p><span className='username__image_modal'>{comment.commenter.username}</span> {comment.content}</p>
                </div>
            </div>
        </>
    )
}


export default ProfileFeedModal;