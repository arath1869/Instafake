import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { get_followings, delete_following, set_new_following } from "../../store/following";
import { get_feed } from "../../store/feed";
import './UsersWhoLiked.css'

function UsersWhoLiked(showProp) {
    const location = useLocation()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const follow = useSelector(state => state.following.users)
    let newArray = showProp.props.reverse()
    

    function handleClick() {
      showProp.changeWord('redirect')
    }

    useEffect(() => {
        dispatch(get_followings(user.id))
    },[dispatch])

    function handleFollow(id){
        dispatch(set_new_following(id))
        dispatch(get_followings(user.id))
        dispatch(get_feed())
    }

    function handleUnfollow(id) {
        dispatch(delete_following(id))
        dispatch(get_followings(user.id))
        dispatch(get_feed())
    }
    

    return (
        <div className="user-who-liked__liked_modal">
            <div className="users-who-liked-container">
                {newArray.length === 0 &&
                    <div>
                        <div className="top-menu">Likes</div>
                        <div className="users-who-liked-loading">
                        </div>
                    </div>
                }
                {newArray.length !== 0 &&
                    <div>
                        <div className="top-menu">Likes</div>
                        <div className="users-who-liked-loading">
                        </div>
                        {newArray.map(element => (
                            <div key={element.user.id} className="users-who-liked-loading">
                                <div className="modal-profile-pic" style={
                                    { backgroundImage: `url(${element.user.profileImgUrl})` }
                                }></div>
                            {(location.pathname.startsWith('/users')) &&
                                <Link to={`/users/${element.user.id}`}><div onClick={handleClick} className="modal-profile-username">{element.user.username}</div></Link>

                            }
                            {(!location.pathname.startsWith('/users')) &&
                                <Link to={`/users/${element.user.id}`}><div className="modal-profile-username">{element.user.username}</div></Link>
                            }
                            {(!location.pathname.startsWith('/users')) &&
                                <>
                                    {(follow[element.user.id]) &&
                                        <>
                                            <div className="likes__follow">
                                                <button className="follow-button" onClick={() => handleUnfollow(element.user.id)}>Unfollow</button>
                                            </div>
                                        </>
                                    }
                                    {!(follow[element.user.id]) && (element.user.id !== user.id) &&
                                        <>
                                            <div className="likes__follow">
                                                <button className="follow-button" onClick={() => handleFollow(element.user.id)}>Follow</button>
                                            </div>
                                        </>
                                    }
                                </>}
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}
export default UsersWhoLiked
