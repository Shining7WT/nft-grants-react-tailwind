import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { AiOutlinePlus } from 'react-icons/ai'
import { BsPencil } from 'react-icons/bs'
import { Button } from 'reactstrap';

import './SingleComment.scss';

function SingleComment({ comment, onDelete, onEdit, editing, onChangeHandler, editingComment, onUpdate, isUser }) {
  return (
    <div className="single-comment">
      <div className="avatar">
        <img src={comment.user && comment.user.avatar} alt="User" />
      </div>
      <div className="details">
        <div className="name">{comment.user ? comment.user.name : 'User'}</div>
        <div className="date-time">{moment(comment.created_at).format('MM/DD/YY h:mm A')}</div>
        {editing ? 
          <textarea name="edit-commment" id="edit-comment-input" rows="4" onChange={onChangeHandler} value={editingComment} />
        :
          <div className="comment-content">
            {comment.comments}
          </div>
        }
        <div className={editing ? 'comment-options flex' : 'comment-options flex mt-3'}>
          <div>
            {isUser ? 
              <div className="flex">
                <span onClick={editing ? null : onEdit} className={`${editing ? ' editing-btn' : 'edit-btn'} flex items-center cursor-pointer`}>
                  <BsPencil/>
                  <span className='options-wording'>Edit</span>
                </span>
                <span onClick={onDelete} className="delete-btn flex items-center cursor-pointer">
                  <AiOutlinePlus style={{transform: 'rotate(45deg)'}}/>
                  <span className='options-wording'>Delete</span>
                </span>
              </div>
            :''}
          </div>
          <div className='ml-auto'>
            {!editing ? 
              comment.updated_at ? 
                (<><span className='edited-details'>Last Edit: </span><span>{moment(comment.updated_at).format('MM/DD/YY h:mm A')} {comment.user.name ? `by ${comment.user.name}` : ''}</span></>)
              :
                ''
            : 
              (<span><Button onClick={onUpdate} className="text-white bg-indigo-600 hover:bg-indigo-700 shadow rounded-lg px-5 py-3 ml-auto cursor-pointer" color='primary'>Confirm Edit</Button></span>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleComment
