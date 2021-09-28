import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Link } from "react-router-dom";
import { delete_image } from "../../store/feed";
import { Modal } from "../../context/Modal"
import { get_feed } from "../../store/feed";
import UsersWhoLiked from "../UsersWhoLikedModal/UsersWhoLikedModal";
import { set_new_comment } from "../../store/comment";
import ProfileFeedModal from "../ProfileFeedModal/ProfileFeedModal";
import LikeComponentForFeed from "../LikeComponentForFeed";
import UnlikeComponentForFeed from "../UnlikeComponentForFeed";
import ThreeDotModal from "../ThreeDotModal";
import { get_followings, delete_following } from "../../store/following";
import { get_followers } from "../../store/follower"
import EditPostModal from "../EditPostModal";

const FeedCard = (feedCardProps) => {
    const user = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false)
    const [showThreeDotModal, setShowThreeDotModal] = useState(false)
    const [comment, setComment] = useState('')
    const [word, setWord] = useState('parent')
    let [count, setCount] = useState(0)
    let [erase, setErase] = useState("Parent")
    let [feedUnfollow, setFeedUnfollow] = useState("feedunfollowstate")
    let [imageToDelete, setImageToDelete] = useState('no imageselected')
    let [isFollow, setIsFollow] = useState(true)
    let[pressEdit, setPressEdit] = useState(0)
    const [showEditModal, setShowEditModal] = useState(false)
    
    const dispatch = useDispatch()

    const handleDeleteImage = (imgId) => {
        dispatch(delete_image(imgId))
    }

    useEffect(() => {
        setCount(count += 1)
        if (count % 4 === 0) {
            setShowImageModal(false)
        }
    }, [word])

    useEffect(() => {
        if(erase === 1){
            dispatch(delete_image(imageToDelete))
        }
    }, [erase])

    useEffect(() => {
        if(pressEdit){
            setShowThreeDotModal(false)
            setPressEdit(0)
            setShowEditModal(true)
        }
    }, [pressEdit])

    useEffect(() => {
        if(feedUnfollow===1){
            dispatch(delete_following(isFollow))
            const updateFeed = async () => {
                await dispatch(get_followers(user.id))
                await dispatch(get_followings(user.id))
                await dispatch(get_feed())
            }
            updateFeed()
            setShowThreeDotModal(false);
        }

    }, [feedUnfollow])


    function handleonClose(e) {
        e.preventDefault();
        setCount(0)
        setShowImageModal(false);
    }

    function handleThreeDotOnClose(e) {
        e.preventDefault();
        setErase(0)
        setFeedUnfollow(0)
        setPressEdit(0)
        setShowThreeDotModal(false);
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault()
        const update_comment = async () => {
            await dispatch(set_new_comment(comment, feedCardProps.props.id))
            await dispatch(get_feed())
        }
        update_comment()
        setComment('')
    }

    let likeArray = feedCardProps.props.likes
    let commentArray = feedCardProps.props.comments
    let randomLike = likeArray[likeArray.length-1]
    let profileOwner = feedCardProps.testProp
    let image = feedCardProps.props
    let isLiked = likeArray.some(like => like.userId === user.id)

        return (
            <div>
            <div className="image-top-padding">
                            <div className="profile-picture__feed" style={
                        { backgroundImage: `url(${feedCardProps.testProp?.profileImgUrl})` }
                                }>
                            </div>
                    <div className="profile-username__feed"><Link to={`users/${feedCardProps.props?.userId}`} className="feed-profile__link">{feedCardProps.testProp?.username}</Link></div>
                            <div className="feed_threedot" onClick={() => setShowThreeDotModal(true)}>···</div>
                    {(showThreeDotModal) && (
                        <Modal onClose={handleThreeDotOnClose}>
                            <ThreeDotModal changePressEdit={pressEdit => setPressEdit(pressEdit)} changeShowModal={showThreeDotModal => setShowThreeDotModal(showThreeDotModal)} profileOwner={profileOwner} image={image} changeErase={erase => setErase(erase)} changefeedUnfollow={feedUnfollow => setFeedUnfollow(feedUnfollow)} changeImageToDelete={imageToDelete => setImageToDelete(imageToDelete)} changeFollow={isFollow => setIsFollow(isFollow)}/>
                        </Modal>
                    )
                    }
                            </div>
                            <div className="image-container__image" style={
                        { backgroundImage: `url(${feedCardProps.props.imgUrl})` }
                                }>
                            </div>
                            <div className="like-comment-container">
                                {!isLiked &&
                                    <LikeComponentForFeed imageId={feedCardProps.props.id}/>
                                }
                                {isLiked &&
                                    <UnlikeComponentForFeed imageId={feedCardProps.props.id} />
                                }
                            <div className="like-button-container">
                                <i className="far fa-comment" onClick={() => setShowImageModal(true)}></i>
                                {(showImageModal) && (
                            <Modal onClose={handleonClose}>
                                <ProfileFeedModal profileOwner={profileOwner} image={image} changeWord={word => setWord(word)}/>
                            </Modal>
                            )
                                }
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
                    <div className="username-caption-feed__small"><Link to={`/users/${feedCardProps.testProp?.id}`} className="link_liked">{feedCardProps.testProp?.username}</Link> {feedCardProps.props.caption}</div>
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
                            <div className="comments-link__feed" onClick={() => setShowImageModal(true)}>{`View all ${commentArray.length} comments`}</div>
                    </div>
                    </div>
                    <div className="like-comment-container">
                    <div className="username-caption-feed"><Link to={`/users/${commentArray[commentArray.length - 1]?.commenter.id}`} className="link_liked">{commentArray[commentArray.length - 1]?.commenter.username} </Link>{commentArray[commentArray.length - 1]?.content}</div>
                    </div>
                    </>
                }
                <div className="like-comment-container__time">
                    <div className="comments-link__time">2 Days Ago</div>
                </div>
                <div className='comment-button-container__feed__image'>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className='comment-input__image_modal'
                        placeholder='Add a comment...'
                    ></textarea>
                    <div className='share-button-container__image_modal'>
                        <button
                            disabled={(comment.length === 0) ? true : false}
                            className='comment-button__image_modal'
                            onClick={handleCommentSubmit}
                        >Post</button>
                    </div>
                </div>
                {(showEditModal) && (
                    <Modal onClose={() => setShowEditModal(false)}>
                        <EditPostModal changeShowEditModal={showEditModal => setShowEditModal(showEditModal)} image={image}/>
                    </Modal>
                )}
            </div>
        )

}

export default FeedCard;