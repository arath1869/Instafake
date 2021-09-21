import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Link } from "react-router-dom";
import { delete_image } from "../../store/feed";
import { set_new_like } from "../../store/like"
import { Modal } from "../../context/Modal"
import UsersWhoLiked from "../UsersWhoLikedModal/UsersWhoLikedModal";

const FeedCard = (feedCardProps) => {
    const user = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false);
    const [poster, setPoster] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/users/${feedCardProps.props.userId}`);
            const responseData = await response.json();
            setPoster(responseData);
        }
        fetchData();
    },[]);


    const handleDeleteImage = (imgId) => {
        dispatch(delete_image(imgId))
    }

    const handleLike = (imgId) => {
        dispatch(set_new_like(imgId))
    }


    return (
        <div>
        <div className="image-top-padding">
                        <div className="profile-picture__feed" style={
                    { backgroundImage: `url(${poster?.profileImgUrl})` }
                            }>
                        </div>
                <div className="profile-username__feed"><Link to={`users/${feedCardProps.props?.userId}`} className="feed-profile__link">{poster.username}</Link></div>
                        </div>
                        <div className="image-container__image" style={
                    { backgroundImage: `url(${feedCardProps.props.imgUrl})` }
                            }>
                        </div>
                        <div className="like-comment-container" >
                        <div className="like-button-container" >
                    <i className="far fa-heart" onClick={() => handleLike(feedCardProps.props.id)}></i>
                        </div>
                        <div className="like-button-container">
                            <i className="far fa-comment"></i>
                        </div>
                        </div>
                        <div className="liked-container" >
                    {feedCardProps.props.totalLikes >1 &&
                        <>
                            <div className="three-image-container" style={
                            { backgroundImage: `url(${feedCardProps.props.imgUrl})` }
                            }>
                            </div>
                    <div className="users-who-liked">Liked by <Link className="link_liked">username</Link> and <Link onClick={() => { setShowModal(true)}} className="link_liked">{`${feedCardProps.props.totalLikes-1} others`}</Link>
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
                            { backgroundImage: `url(${feedCardProps.props.imgUrl})` }
                            }>
                            </div>
                            <div className="users-who-liked">Liked by <Link className="link_liked">username</Link></div>
                        </>
                        }
                    {feedCardProps.props.totalLikes < 1 &&
                            <div className="users-who-liked">0 Likes</div>
                        }
                        </div>
                    <p>{feedCardProps.props.caption}</p>
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