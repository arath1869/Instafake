import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { get_feed } from "../../store/feed";
import { get_followers } from "../../store/follower"
import { get_followings } from "../../store/following"
import { Modal } from "../../context/Modal"
import FollowersModal from "../FollowersModal/FollowersModal.js"
import FollowingModal from "../FollowingModal/FollowingModal.js"
import ProfileImages from "../ProfileImages/ProfileImages";

import ImageUploadModal from "../ImageUploadModals";
import ImageModal from "../ImageModal";

import './Profile.css'

const Profile = () => {
    const user = useSelector(state => state.session.user);
    const images = useSelector(state => Object.values(state.feed.images))
    const { userId } = useParams();
    const dispatch = useDispatch()
    const [profileOwner, setProfileOwner] = useState([]);
    const followers = useSelector(state => Object.values(state.followers.users))
    const following = useSelector(state => Object.values(state.following.users))

    const [showFollowerModal, setShowFollowerModal] = useState(false);
    const [showFollowingModal, setShowFollowingModal] = useState(false);


    useEffect(() => {
        (async () => {
            await dispatch(get_feed());
        })();
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            await dispatch(get_followers(userId));
        })();
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            await dispatch(get_followings(userId));
        })();
    }, [dispatch]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/users/${userId}`);
            const responseData = await response.json();
            setProfileOwner(responseData);
        }
        fetchData();
    }, []);

    let imagesArray = []
    images.forEach(element => {
        if(element.userId === Number(userId)){
            imagesArray.push(element)
        }
    })
    console.log(imagesArray)

    return (
        <>
        <div className="profile-page__container">
            <div className="profile-general">
                <div className="profile-card">
                    <div className="profile-image-holder" style={
                        { backgroundImage: `url(${profileOwner.profileImgUrl})`}
                    }>
                    </div>
                    <div className="profile-info-holder">
                        <div className="profile-info__firstLayer">
                            <div className="profile-info__username">{profileOwner.username}</div>
                            <button className="profile-info__message">Message</button>
                            <button className="profile-info__follow">/</button>
                        </div>
                        <div className="profile-info__secondLayer">
                            <div className="profile-info__posts"><i className="profile-i-tag">{`${imagesArray.length}`}</i> posts</div>
                            <div className="profile-info__followers"><i onClick={() => { setShowFollowerModal(true) }} className="profile-i-tag">{`${followers.length}`}</i> followers</div>
                                {(showFollowerModal) && (
                                    <Modal onClose={() => setShowFollowerModal(false)}>
                                        <FollowersModal followers={followers} />
                                    </Modal>
                                )}
                            <div className="profile-info__following"><i onClick={() => { setShowFollowingModal(true) }} className="profile-i-tag">{`${following.length}`}</i> following</div>
                                {(showFollowingModal) && (
                                    <Modal onClose={() => setShowFollowingModal(false)}>
                                        <FollowingModal followers={following} />
                                    </Modal>
                                )}
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="profile-images-container">
                    {imagesArray.map(image => (
                        <ProfileImages image={image}  profileOwner={profileOwner}/>
                    ))
                    }
                </div>
            </div>
        </div>
        </>
    )
}


export default Profile;
