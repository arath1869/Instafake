import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { get_feed } from "../../store/feed";
import FeedCard from '../FeedCard'
import { get_users } from "../../store/user";
import { get_followings } from "../../store/following";
import './ImageFeed.css'


const ImageFeed = () => {
    const user = useSelector(state => state.session.user)
    const feed = useSelector(state => state.feed)
    const users = useSelector(state => state.users)
    const following = useSelector(state => Object.values(state.following.users))
    const [isLoaded, setIsLoaded] = useState(false)
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

    useEffect(() => {
        if(users[1]){
            setIsLoaded(true)
        }
    },[users])

    useEffect(() => {
        dispatch(get_followings(user.id))
    },[dispatch])

    console.log(following)



    return (
        <>
        {isLoaded && following.length &&
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
        </>}
        {isLoaded && !following.length &&
        <>
                <div className="recommended-follow">
                    <div>You are not following anyone!</div>
                    <div>Search for your friends now!</div>
                    <div className="try-search">(try searching for Arnold Schwarzenegger, Jim Carrey, Emma Watson, Arath Vidrio)</div>
                </div>
        </>
        }
        </>
    )
}


export default ImageFeed;


