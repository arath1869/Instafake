import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_feed } from "../../store/feed";
import { delete_like, set_new_like } from "../../store/like";



const LikeComponentForFeed = ({ imageId }) => {
    const user = useSelector(state => state.session.user)
    const image = useSelector(state => state.feed.images[imageId])
    let [liked, setLiked] = useState(Object.values(image.likes).some(like => like.userId === user.id))
    const dispatch = useDispatch()

    const handleLiked = (e) => {
        e.preventDefault()
        const update_like = async () => {
                await dispatch(set_new_like(Number(imageId)))
                setLiked(prev => !prev)
                await dispatch(get_feed())
        }
        update_like()
    }


    return (
        <>
            <>
                <div className="like-button-container" >
                        <i className="far fa-heart" onClick={handleLiked}></i>
                </div>
            </>
        </>
    )
}


export default LikeComponentForFeed;