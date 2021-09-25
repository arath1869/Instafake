import React, { useState } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import './UsersWhoLiked.css'

function UsersWhoLiked(showProp) {
    const location = useLocation()
    let newArray = showProp.props
    function handleClick() {
      showProp.changeWord('redirect')
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
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}
export default UsersWhoLiked
