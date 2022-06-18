import React from 'react'
import '../styles/userlist.css'

function User({ user }) {
    return (
        <div className="suggestion">
            <div className="image-wrapper">
                <img src={user.avatar_url} alt="avatar" />
            </div>
            <div className="user-info">
                <div>
                    {user.name ? user.name : '--'}
                </div>
                <div>
                    {user.location ? user.location : '--'}
                </div>
            </div>
        </div>
    )
}

export default User
