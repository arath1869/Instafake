import React from 'react';
import { useHistory } from "react-router-dom";
import './FollowersModal.css'

function FollowersModal(followers) {

    const history = useHistory()

    function handleClick(id) {
        followers.changeShowFollowerModal(false)
        history.push(`/users/${id}`)
    }

    return (
        <div className="user-who-liked__liked_modal">
            <div className="users-who-liked-container">
                {followers.followers.length === 0 &&
                    <div>
                        <div className="top-menu">Followers</div>
                        <div className="users-who-liked-loading">
                        </div>
                    </div>
                }
                {followers.followers.length !== 0 &&
                    <div>
                        <div className="top-menu">Followers</div>
                        <div className="users-who-liked-loading">
                        </div>
                        {followers.followers.map(element => (
                            <div key={element.id} className="users-who-liked-loading">
                                <div className="modal-profile-pic" style={
                                    { backgroundImage: `url(${element.profileImgUrl})` }
                                }></div>
                                <div className="modal-profile-username" onClick={() => handleClick(element.id)}>{element.username}</div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}
export default FollowersModal