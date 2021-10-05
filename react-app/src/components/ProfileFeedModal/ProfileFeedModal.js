import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_new_comment } from "../../store/comment";
import { get_feed } from "../../store/feed";
import LikeUnlikeComponent from "../LikeUnlikeComponent";
import { NavLink, Link, useParams } from "react-router-dom";
import { Modal } from "../../context/Modal"
import UsersWhoLiked from "../UsersWhoLikedModal/UsersWhoLikedModal";
import './ProfileFeedModal.css'

const ProfileFeedModal = ({image, changeWord}) => {
    const { userId } = useParams()
    const [showProfileFeedModal, setShowProfileFeedModal] = useState(false);
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const profileOwner = users[userId]



    const handleCommentSubmit = (e) => {
        e.preventDefault()
        const update_comment = async () => {
            await dispatch(set_new_comment(comment, image.id))
            await dispatch(get_feed())
        }
        update_comment()
        setComment('')
    }

    let likeArray = image.likes
    let randomLike = likeArray[0]

    const [ word, setWord ] = useState('parent')

    useEffect(() => {
        setWord('grandparent-redirect')
        changeWord(word)
        setShowProfileFeedModal(false);
    }, [word])

    function handleonClose(e) {
        e.preventDefault();
        setShowProfileFeedModal(false);
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
                            { backgroundImage: `url(${profileOwner?.profileImgUrl})` }
                        }></div>
                        <p>{profileOwner?.username}</p>
                    </div>
                    <div className='comments_container__image_modal'>
                        <div className='comment-section__image_modal'>
                            {Object.values(image.comments).map(comment => {
                                return <CommentCard comment={comment} />
                            })}
                        </div>
                        <LikeUnlikeComponent imageId={image.id} />
                        <div className="liked-container__profile" >
                            {image.totalLikes > 1 &&
                                <>
                                    <div className="three-image-container__profile" style={
                                        { backgroundImage: `url(${randomLike.user.profileImgUrl})` }
                                    }>
                                    </div>
                                    <div className="users-who-liked__profile">{`Liked by ${randomLike.user.username} and`} <Link onClick={() => { setShowProfileFeedModal(true) }} className="link_liked">{`${image.totalLikes - 1} others`}</Link>
                                        {(showProfileFeedModal) && (
                                            <Modal onClose={handleonClose}>
                                            <UsersWhoLiked props={image.likes} changeWord={word => setWord(word)} />
                                            </Modal>
                                        )}
                                    </div>
                                </>
                            }
                            {image.totalLikes === 1 &&
                                <>
                                    <div className="three-image-container__profile" style={
                                        { backgroundImage: `url(${randomLike.user.profileImgUrl})` }
                                    }>
                                    </div>
                                <div className="users-who-liked__profile">{`Liked by ${randomLike.user.username}`}</div>
                                </>
                            }
                            {image.totalLikes < 1 &&
                                <div className="users-who-liked">0 Likes</div>
                            }
                        </div>
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