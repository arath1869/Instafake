import React from 'react';
import { useHistory } from "react-router-dom";

function FollowingModal(followers) {
    
    const history = useHistory()
    function handleClick(id){
        followers.changeShowModal(false)
        history.push(`/users/${id}`)
    }


    return (
        <div className="user-who-liked__liked_modal">
            <div className="users-who-liked-container">
                {followers.followers.length === 0 &&
                    <div>
                        <div className="top-menu">Following</div>
                        <div className="users-who-liked-loading">
                        </div>
                    </div>
                }
                {followers.followers.length !== 0 &&
                    <div>
                        <div className="top-menu">Following</div>
                        <div className="users-who-liked-loading">
                        </div>
                        {followers.followers.map(element => (
                            <div key={element.id} className="users-who-liked-loading">
                                <div className="modal-profile-pic" style={
                                    { backgroundImage: `url(${element.profileImgUrl})` }
                                }></div>
                                <div onClick={() => handleClick(element.id)} className="modal-profile-username">{element.username}</div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}
export default FollowingModal