import React, { useState } from "react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import './MyProfileThreeDotModal.css'

const MyProfileThreeDotModal = ({changeShowModal, changeShowEditModal, changeDeleteImage}) => {
    return (
        <>
        <div className="three-dot-modal__three">
            <div className="delete-post-button">
                <div className="threebutton-text" onClick={() => changeDeleteImage(true)}>Delete</div>
            </div>
            <div className="delete-post-button">
                <div className="threebutton-text" onClick={() => changeShowEditModal(true)}>Edit</div>
            </div>
            <div className="delete-post-button__noborder">
                <div className="threebutton-text" onClick={()=>changeShowModal(false)}>Cancel</div>
            </div>
        </div>
        </>
    )
}

export default MyProfileThreeDotModal