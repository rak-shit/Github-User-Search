import React, { useState } from 'react'
import UserList from './UserList'
import '../styles/autocomplete.css'

function AutoComplete() {

    const [username, setUsername] = useState('')

    function handleUserSearch(event) {
        setUsername(event.target.value)
    }

    return (
        <div>
            <input
                type="text"
                onChange={handleUserSearch}
            />
            <UserList username={username} />
        </div>
    )
}

export default AutoComplete
