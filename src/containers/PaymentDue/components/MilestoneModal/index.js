import React, { useState } from "react";

import SingleStatusBar from "../../../../Shared/SingleStatusBar";
import './MilestoneModal.scss';

export default function MilestoneModal({ className, modalGrantInfo, toggleModal, onFunding }) {
  const FundedByStx = () => {
    const [expo_url, setExpo_url] = useState(null)
    const [focus, setFocus] = useState(null)

    return (
      <>
        <div className="milestone-modal">
          <p style={{ margin: "0" }}>{modalGrantInfo?.title}</p>
          <span className="instruction">You are about to Mark as Funded. Please enter the Explorer URL for this payment.</span>
          <input
            type="Text"
            className="inputBox"
            style={{ border: focus ? (expo_url ? "1px solid #2ECC71" : "1px solid #fb9c9c") : "1px solid #e1e1e1" }}
            value={expo_url}
            onChange={(e) => { setExpo_url(e.target.value) }}
            onFocus={() => { setFocus(true) }}
            onBlur={() => { setFocus(false) }}
            placeholder="Enter Explorer URL"
          />
          <div className="buttonContainer">
            <button className="mark" onClick={() => expo_url ? onFunding(expo_url) : null}>Mark as Funded</button>
            <button className="close" onClick={toggleModal}>Nevermind</button>
          </div>
        </div>
        <div className="modal-cover" onClick={toggleModal} />
      </>
    )
  }

  const NotFundedByStx = () => <>
    <div className="milestone-modal">
      <p>Mark As Funded</p>
      <span className="instruction">You are about to Mark as Funded.</span>
      <span className="amount">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(modalGrantInfo?.amount / 100)}</span>
      <span>Status:</span>
      <SingleStatusBar text={modalGrantInfo?.milestone_status} />
      <button onClick={() => { onFunding(null) }}>Mark As Funded</button>
    </div>
    <div className="modal-cover" onClick={toggleModal} />
  </>

  return (
    <div className="modal-holder">
      {
        modalGrantInfo?.grant?.fund_with_usd === false ? <FundedByStx /> : <NotFundedByStx />}
    </div>
  );
}
