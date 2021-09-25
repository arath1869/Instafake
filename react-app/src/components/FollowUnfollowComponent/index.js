import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_followings, delete_following, set_new_following } from "../../store/following";
import { get_followers } from "../../store/follower"
import { get_feed } from "../../store/feed";
import { useParams } from 'react-router-dom';
import "./FollowUnfollow.css"


const FollowUnfollowComponent = ({ profileOwner, changeFollow }) => {
    const dispatch = useDispatch()
    const { userId } = useParams();
    const user = useSelector(state => state.session.user)
    const followers = useSelector(state => state.followers.users)
    const follow = useSelector(state => state.following)
    let testIfFollowing = Object.values(followers).some(users => users.id === user.id)
    let [followed, setFollowed] = useState(testIfFollowing)

    console.log('followed from component',followed)
    console.log('testiffollowing from comptonent', testIfFollowing)

    useEffect(() => {
        changeFollow(followed)
    }, [followed])


    const handleFollow = (e) => {
        e.preventDefault()
        const update_follow = async () => {
            if (!followed) {
                await dispatch(set_new_following(Number(profileOwner.id)))
            } else {
                await dispatch(delete_following(Number(profileOwner.id)))
            }
            setFollowed(prev => !prev)
            await dispatch(get_followings(profileOwner.id))
            await dispatch(get_feed())
            await dispatch(get_followers(profileOwner.id))
            
        }
        update_follow()
    }

    return (
        <>
            {(testIfFollowing || followed) &&
            <>
            <button className="follow-button" onClick={handleFollow}>Unfollow</button>
            </>
            }
            {(!testIfFollowing) &&
            <>
            <button className="follow-button" onClick={handleFollow}>Follow</button>
            </>
            }
            
        </>
    )
}


export default FollowUnfollowComponent;