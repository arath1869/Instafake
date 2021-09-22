import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { get_feed } from "../../store/feed";
import FeedCard from '../FeedCard'
import './ImageFeed.css'


const ImageFeed = () => {
    const feed = useSelector(state => state.feed)
    const [users, setUsers] = useState([]);

    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);
    
    let idArray = []
    users.forEach(element => {
        idArray.push(element.id)
    })

    useEffect(() => {
        (async () => {
            await dispatch(get_feed());
        })();
    }, [dispatch]);


    return (
        <>
            <div className="feed-container">
            <div className="feed-subcontainer">
                {feed.images && Object.values(feed.images).reverse().map(image => (
                    <div key={image.id} className="image-container">
                        <FeedCard props={image} testProp={users[idArray.indexOf(image.userId)]}/>
                </div>
                ))}
                </div>
            </div>
        </>
    )
}


export default ImageFeed;


