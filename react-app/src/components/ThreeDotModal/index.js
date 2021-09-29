import React, { useState } from "react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import './ThreeDotModal.css'

const ThreeDotModal = (props) => {
    let userId = props.profileOwner.id
    let imageId = props.image.id
    let [count, setCount] = useState(0)
    const user = useSelector(state => state.session.user)

    function handleOnClick(){
        let countfunc = async () => {
            await setCount(count+=1)
            await props.changeErase(count)
        }
        props.changeImageToDelete(imageId)
        countfunc()
    }

    function handleFollowOnClick(){
        let followFunc = async () => {
            await setCount(count+=1)
            await props.changefeedUnfollow(count)
        }
        props.changeFollow(userId)
        followFunc()
    }

    function handleClickEdit(){
        props.changePressEdit(true)
    }

    function closeModalOnClick(){
        props.changeShowModal(false)
    }

    return (
        <>
        {(userId === user.id) &&
        <div className="three-dot-modal">
            <div className="delete-post-button">
                <div className="threebutton-text" onClick={handleClickEdit}>Edit</div>
            </div>
            <div className="delete-post-button">
                <div className="threebutton-text" onClick={handleOnClick} >Delete</div>
            </div>
            <Link className="threebutton__link" to={`/users/${userId}`}><div className="delete-post-button">{`Go To Profile`}</div></Link>
            <div className="delete-post-button__noborder">
                <div className="threebutton-text" onClick={closeModalOnClick}>Close</div>
            </div>
        </div>
        }
        {(userId !== user.id) &&
        <div className="three-dot-modal__three">
            <div className="delete-post-button">
                <div className="threebutton-text" onClick={handleFollowOnClick}>Unfollow</div>
            </div>
            <Link className="threebutton__link" to={`/users/${userId}`}><div className="delete-post-button">{`Go To Profile`}</div></Link>
            <div className="delete-post-button__noborder">
            <div className="threebutton-text" onClick={closeModalOnClick}>Close</div>
                </div>
             </div>
        }
        </>
    )
}

export default ThreeDotModal