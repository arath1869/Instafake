import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { get_feed } from "../../store/feed";
import FeedCard from '../FeedCard'
import { get_users } from "../../store/user";
import './ImageFeed.css'


const ImageFeed = () => {
    const feed = useSelector(state => state.feed)
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            await dispatch(get_feed());
        })();
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            await dispatch(get_users());
        })();
    }, [dispatch]);

    console.log('users', users)



    return (
        <>
            <div className="feed-container">
            <div className="feed-subcontainer">
                {feed.images && Object.values(feed.images).reverse().map(image => (
                    <div key={image.id} className="image-container">
                        <FeedCard props={image} testProp={users[image.userId]}/>
                </div>
                ))}
                </div>
            </div>
        </>
    )
}


export default ImageFeed;


