import React from "react";
import Tag from '../../../../components/Shared/tags/tag';
import './Wallet.scss';

export default function MilestoneModal({ address, toggleModal, onCopy, isMemo }) {
    return (
        <div className="modal-holder">
            <div className="wallet-modal">
                <span>{address}</span><i class="far fa-copy" onClick={() => onCopy(address, isMemo ? true : false)}></i>
            </div>
            <div className="modal-cover" onClick={toggleModal} />
        </div>
    );
}
