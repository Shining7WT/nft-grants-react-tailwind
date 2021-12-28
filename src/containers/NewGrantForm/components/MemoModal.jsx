import React from "react";
import './modal.scss';

export default function MilestoneModal({ toggleModal }) {
    return (
        <div className="funding-holder">
            <div className="memo-modal">
                <span>Are you sure you do not have memo? If a memo is not provided, but is required, the funds can be lost.</span>
                <div className="buttons">
                    <button type="button" onClick={(e) => toggleModal(e, true)}>Yes, I'm sure</button>
                    <button type="button" onClick={(e) => toggleModal(e, false)}>No, take me back</button>
                </div>
            </div>
            <div className="modal-cover" onClick={toggleModal} />
        </div>
    );
}
