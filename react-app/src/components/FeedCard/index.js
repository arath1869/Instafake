import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Link } from "react-router-dom";
import { delete_image } from "../../store/feed";
import { Modal } from "../../context/Modal"
import UsersWhoLiked from "../UsersWhoLikedModal/UsersWhoLikedModal";
import LikeUnlikeComponent from "../LikeUnlikeComponent";

const FeedCard = (feedCardProps) => {
    const user = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch()

    const handleDeleteImage = (imgId) => {
        dispatch(delete_image(imgId))
    }

    let likeArray = feedCardProps.props.likes
    let commentArray = feedCardProps.props.comments
    let randomLike = likeArray[Math.floor(Math.random()*likeArray.length)]
    // console.log('commentArray', commentArray)
    console.log('feedcardoprops',feedCardProps.props.createdAt)

    return (
        <div>
        <div className="image-top-padding">
                        <div className="profile-picture__feed" style={
                    { backgroundImage: `url(${feedCardProps.testProp?.profileImgUrl})` }
                            }>
                        </div>
                <div className="profile-username__feed"><Link to={`users/${feedCardProps.props?.userId}`} className="feed-profile__link">{feedCardProps.testProp?.username}</Link></div>
                        </div>
                        <div className="image-container__image" style={
                    { backgroundImage: `url(${feedCardProps.props.imgUrl})` }
                            }>
                        </div>
                        <div className="like-comment-container">
                        <LikeUnlikeComponent imageId={feedCardProps.props.id}/>
                        <div className="like-button-container">
                            <i className="far fa-comment"></i>
                        </div>
                        </div>
                        <div className="liked-container" >
                    {feedCardProps.props.totalLikes >1 &&
                        <>
                            <div className="three-image-container" style={
                        { backgroundImage: `url(${randomLike.user.profileImgUrl})` }
                            }>
                            </div>
                    <div className="users-who-liked">Liked by <Link to={`/users/${randomLike.user.id}`} className="link_liked">{randomLike.user.username}</Link> and <Link onClick={() => { setShowModal(true)}} className="link_liked">{`${feedCardProps.props.totalLikes-1} others`}</Link>
                                        {(showModal) && (
                                            <Modal onClose={() => setShowModal(false)}>
                                                <UsersWhoLiked props={feedCardProps.props.likes}/>
                                            </Modal>
                                        )}
                                    </div>
                        </>
                        }
                    {feedCardProps.props.totalLikes === 1 &&
                        <>
                            <div className="three-image-container" style={
                            { backgroundImage: `url(${randomLike.user.profileImgUrl})` }
                            }>
                            </div>
                            <div className="users-who-liked">Liked by <Link to={`/users/${randomLike.user.id}`} className="link_liked">{randomLike.user.username}</Link></div>
                        </>
                        }
                    {feedCardProps.props.totalLikes < 1 &&
                            <div className="users-who-liked">0 Likes</div>
                        }
                        </div>
            {(feedCardProps.props.caption).length > 60 &&
            <div className="like-comment-container">
                <div className="username-caption-feed__small"><Link to={`/users/${feedCardProps.testProp?.id}`} className="link_liked">{feedCardProps.testProp?.username} </Link> {feedCardProps.props.caption}</div>
            </div>
            }            
            {(feedCardProps.props.caption).length < 60 &&
                <div className="like-comment-container">
                    <div className="username-caption-feed"><Link to={`/users/${feedCardProps.testProp?.id}`} className="link_liked">{feedCardProps.testProp?.username} </Link> {feedCardProps.props.caption}</div>
                </div>
            }
            {(commentArray.length === 0) &&
            <div className="like-comment-container">
                <div className="comments-link__feed">{`No comments yet`}</div>
            </div>
            }
            {(commentArray.length > 0) &&
                <>
                <div className="like-comment-container">
                <div>
                    <div className="comments-link__feed">{`View all ${commentArray.length} comments`}</div>
                </div>
                </div>
                <div className="like-comment-container">
                <div className="username-caption-feed"><Link to={`/users/${commentArray[commentArray.length - 1]?.commenter.id}`} className="link_liked">{commentArray[commentArray.length - 1]?.commenter.username} </Link>{commentArray[commentArray.length - 1]?.content}</div>
                </div>
                </>
            }
                    <p>{feedCardProps.props.userId}</p>
                    {
            user?.id === feedCardProps.props.userId && (
            <>
                        <button onClick={() => handleDeleteImage(feedCardProps.props.id)}>Delete Image</button>
                    <NavLink to={`/images/${feedCardProps.props.id}`}>edit</NavLink>
            </>
        )
    }
        </div>
    )
}

export default FeedCard;