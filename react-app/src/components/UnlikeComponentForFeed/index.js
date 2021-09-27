import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_feed } from "../../store/feed";
import { delete_like, set_new_like } from "../../store/like";



const UnlikeComponentForFeed = ({ imageId }) => {
    const user = useSelector(state => state.session.user)
    const image = useSelector(state => state.feed.images[imageId])
    const [liked, setLiked] = useState(Object.values(image.likes).some(like => like.userId === user.id))
    const dispatch = useDispatch()

    const handleLiked = (e) => {
        e.preventDefault()
        const update_like = async () => {
            await dispatch(delete_like(Number(imageId)))
            setLiked(prev => !prev)
            await dispatch(get_feed())
        }
        update_like()
    }


    return (
        <>
            <>
                <div className="like-button-container" >
                    <i className="fas fa-heart" onClick={handleLiked} style={
                        { color: "#fb3958" }}></i>
                </div>
            </>
        </>
    )
}


export default UnlikeComponentForFeed;