import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_feed } from "../../store/feed";
import { delete_like, set_new_like } from "../../store/like";
import './LikeUnlike.css'


const LikeUnlikeComponent = ({imageId}) => {
    const user = useSelector(state => state.session.user)
    const image = useSelector(state => state.feed.images[imageId])
    const [liked, setLiked] = useState(Object.values(image.likes).some(like => like.userId === user.id))
    const dispatch = useDispatch()

    const handleLiked = (e) => {
        e.preventDefault()
        const update_like = async () => {
            if (!liked) {
                await dispatch(set_new_like(Number(imageId)))
            } else {
                await dispatch(delete_like(Number(imageId)))
            }
            setLiked(prev => !prev)

            await dispatch(get_feed())
        }
        update_like()
    }

    return (
        <>
            <>
                <div className="like-button-container" >

                    {liked && (
                        <i className="fas fa-heart" onClick={handleLiked} style={
                            { color:"#fb3958" }
                        }></i>
                    )}

                    {!liked && (
                        <i className="far fa-heart" onClick={handleLiked}></i>
                    )}
                </div>
            </>
            </>
    )
}


export default LikeUnlikeComponent;
