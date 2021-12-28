import React from "react";
import './modal.scss';

export default function MilestoneModal({ toggleModal }) {
    return (
        <div className="funding-holder">
            <div className="funding-modal">
                <span>All grants are funded with STX unless specifically discussed with the foundation.</span>
                <button type="button" onClick={(e) => toggleModal(e, true)}>I Understand</button>
                <p className="cursor-pointer" onClick={toggleModal}>Nevermind</p>
            </div>
            <div className="modal-cover" onClick={toggleModal} />
        </div>
    );
}
