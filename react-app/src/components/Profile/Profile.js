import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from 'react-router-dom';
import { get_feed } from "../../store/feed";
import { get_followers } from "../../store/follower"
import { get_followings } from "../../store/following"
import { get_users } from "../../store/user";
import { Modal } from "../../context/Modal"
import FollowersModal from "../FollowersModal/FollowersModal.js"
import FollowingModal from "../FollowingModal/FollowingModal.js"
import ProfileImages from "../ProfileImages/ProfileImages";
import FollowUnfollowComponent from "../FollowUnfollowComponent";
import ComingSoonModal from "../ComingSoonModal";

import ImageUploadModal from "../ImageUploadModals";
import ImageModal from "../ImageModal";

import './Profile.css'

const Profile = () => {
    const user = useSelector(state => state.session.user);
    const users = useSelector(state => state.users)
    const images = useSelector(state => Object.values(state.feed.images))
    const { userId } = useParams();
    const dispatch = useDispatch()
    const followers = useSelector(state => Object.values(state.followers.users))
    const following = useSelector(state => Object.values(state.following.users))

    let testIfFollowing = Object.values(followers).some(users => users.id === user.id)
    let [followed, setFollowed] = useState(testIfFollowing)

    const [showFollowerModal, setShowFollowerModal] = useState(false);
    const [showFollowingModal, setShowFollowingModal] = useState(false);
    const [showComingSoonModal, setShowComingSoonModal] = useState(false)
  

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        testIfFollowing = Object.values(followers).some(users => users.id === user.id)
        setFollowed(testIfFollowing)
    },[followed,testIfFollowing])

    useEffect(() => {
        (async () => {
            await dispatch(get_users());
        })();
    }, [dispatch]);

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

    let profileOwner = users[userId]

    let imagesArray = []

    images.forEach(element => {
        if(element.userId === Number(userId)){
            imagesArray.push(element)
        }
    })

    console.log('followed',followed)
    console.log('testiffollowing', testIfFollowing)

    if (Number(userId) === Number(user.id)) {
        return <Redirect to='/my-profile' />;
    } else return (
        <>
        <div className="profile-page__container">
            <div className="profile-general">
                <div className="profile-card">
                    <div className="profile-image-holder" style={
                        { backgroundImage: `url(${profileOwner?.profileImgUrl})`}
                    }>
                    </div>
                    <div className="profile-info-holder">
                        <div className="profile-info__firstLayer">
                            <div className="profile-info__username">{profileOwner?.username}</div>
                            {(followed && testIfFollowing) &&
                                <>
                                <button className="profile-info__message" onClick={() => setShowComingSoonModal(true)} >Message</button>
                                {showComingSoonModal && (
                                    <Modal onClose={() => setShowComingSoonModal(false)} >
                                        <ComingSoonModal />
                                    </Modal>
                                )}
                                    <FollowUnfollowComponent profileOwner={profileOwner} changeFollow={follows => setFollowed(follows)}/>
                                </>
                            }
                            {((!testIfFollowing && !followed)) &&
                                <>
                                    <FollowUnfollowComponent profileOwner={profileOwner} changeFollow={follows => setFollowed(follows)}/>
                                </>
                            }
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
                    {imagesArray.reverse().map(image => (
                        <ProfileImages image={image}  userId={profileOwner}/>
                    ))
                    }
                </div>
            </div>
        </div>
        </>
    )
}


export default Profile;
