import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Link } from "react-router-dom";
import { delete_image, get_feed } from "../../store/feed";
import { set_new_like } from "../../store/like"
import { get_followings } from "../../store/following"
import { Modal } from "../../context/Modal"
import FeedCard from '../FeedCard'
import UsersWhoLiked from "../UsersWhoLikedModal/UsersWhoLikedModal";
import './ImageFeed.css'


const ImageFeed = () => {
    const feed = useSelector(state => state.feed)
    const user = useSelector(state => state.session.user)
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [idForModal, setIdForModal] = useState('')


    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);

    useEffect(() => {
        (async () => {
            await dispatch(get_feed());
        })();
    }, [dispatch]);

    const handleDeleteImage = (imgId) => {
        dispatch(delete_image(imgId))
    }

    const handleLike = (imgId) => {
        dispatch(set_new_like(imgId))
    }

    let arrayOfId = []
    users.forEach(element => {
        arrayOfId.push(element.id)
    })

    let getLikeAmount = (imageId) => {
        return feed.images[imageId].totalLikes
    }

    console.log('feed images',feed.images)

    return (
        <>
            <div className="feed-container">
            <div className="feed-subcontainer">
                {feed.loading === true && <h2>Loading</h2>}
                {feed.images && Object.values(feed.images).map(image => (
                    <div key={image.id} className="image-container">
                        <FeedCard props={image}/>
                </div>
                ))}
                </div>
            </div>
        </>
    )
}


export default ImageFeed;


