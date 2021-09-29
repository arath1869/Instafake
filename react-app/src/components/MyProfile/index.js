import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_feed } from "../../store/feed";
import { get_followers } from "../../store/follower"
import { get_followings } from "../../store/following"
import { get_users } from "../../store/user";
import { Modal } from "../../context/Modal"
import FollowersModal from "../FollowersModal/FollowersModal.js"
import FollowingModal from "../FollowingModal/FollowingModal.js"
import ProfileImages from "../ProfileImages/ProfileImages";
import EditProfilePicModal from "../EditProfilePicModal";
import { authenticate } from "../../store/session";

const MyProfile = () => {
    const user = useSelector(state => state.session.user);
    const images = useSelector(state => Object.values(state.feed.images))
    const dispatch = useDispatch()
    const followers = useSelector(state => Object.values(state.followers.users))
    const following = useSelector(state => Object.values(state.following.users))
    const [showFollowerModal, setShowFollowerModal] = useState(false);
    const [showFollowingModal, setShowFollowingModal] = useState(false);
    const [showProfilePicModal, setShowProfilePicModal] = useState(false);
    const [handleImage, setHandleImage] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if(handleImage){
            setShowProfilePicModal(false)
            dispatch(authenticate())
            dispatch(get_feed())
            setHandleImage(false)
        }
        dispatch(authenticate())
    },[handleImage])

    useEffect(() => {
        dispatch(authenticate());
    },[showProfilePicModal])

    useEffect(() => {
        (async () => {
            await dispatch(get_feed());
        })();
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            await dispatch(get_followers(user.id));
        })();
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            await dispatch(get_followings(user.id));
        })();
    }, [dispatch]);

    let imagesArray = []

    images.forEach(element => {
        if (element.userId === Number(user.id)) {
            imagesArray.push(element)
        }
    })

    function handleOnClose(){
        setShowProfilePicModal(false)
        dispatch(authenticate())
    }

    return (
        <div className="profile-page__container">
            <div className="profile-general">
                <div className="profile-card">
                    <div className="profile-image-holder__myprofile" style={
                        { backgroundImage: `url(${user.profileImgUrl})` }
                    } onClick={() => { setShowProfilePicModal(true) }}></div>
                    <div className="profile-info-holder">
                        <div className="profile-info__firstLayer">
                            <div className="profile-info__username">{user.username}</div>
                            <>
                                <i class="fas fa-user-cog" onClick={() => { setShowProfilePicModal(true) }}></i>
                                {(showProfilePicModal) && (
                                    <Modal onClose={handleOnClose}>
                                        <EditProfilePicModal changeShowModal={handleImage => setHandleImage(handleImage)}/>
                                    </Modal>
                                )
                                }
                            </>
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
                    <ProfileImages image={image} userId={user} />
                ))
                }
                </div>
            </div>
        </div>
    )
}

export default MyProfile