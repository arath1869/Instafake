import React from 'react';
import './FollowersModal.css'

function FollowersModal(followers) {

    console.log(followers.followers)

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
                                <div className="modal-profile-username">{element.username}</div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}
export default FollowersModal