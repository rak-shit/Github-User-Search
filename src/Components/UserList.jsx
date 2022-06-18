import React, { useState, useEffect, useRef } from 'react'
import { fetchGithubUsers, getUserDetails } from '../api/githubUserSearch'
import '../styles/userlist.css'
import User from './User'

function UserList({ username }) {

    const [suggestions, setSuggestions] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [prevUsername, setPrevUsername] = useState('')
    const [lastElement, setLastElement] = useState(null)
    const [noUsersFound, setNoUsersFound] = useState(false)

    const observer = useRef(
        new IntersectionObserver(
            (entries) => {
                const first = entries[0]
                if (first.isIntersecting) {
                    setPageNumber((no) => no + 1)
                }
            })
    )

    useEffect(() => {
        if (prevUsername !== username) {
            setPageNumber(1)
            setSuggestions([])
            setNoUsersFound(false)
        }
        if (username !== '') {
            setPrevUsername(username)
            const debounceTimeoutId = setTimeout(() => {
                fetchGithubUsers(username, pageNumber)
                    .then((response) => {
                        if (response.data.items.length === 0 && suggestions.length === 0) {
                            setNoUsersFound(true)
                        }
                        const userList = []
                        response.data.items.map(async (user) => {
                            const userDetails = await getUserDetails(user.url)
                            userList.push(userDetails.data)
                            if (userList.length === 50) {
                                setSuggestions((prevSuggestions) => [...prevSuggestions, ...userList])
                            }                            
                        })
                    })
                    .catch(error => console.log(error))
            }, 1000)

            return (() => clearTimeout(debounceTimeoutId))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, pageNumber, prevUsername])

    useEffect(() => {
        const currentElement = lastElement
        const currentObserver = observer.current

        if (currentElement) {
            currentObserver.observe(currentElement)
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement)
            }
        }
    }, [lastElement])

    return (
        <div className="suggestion-box">
            {
                noUsersFound ? (
                    <div>No users found</div>
                ) : (
                    suggestions.map((user, index) => {
                        if (index === suggestions.length - 1) {
                            return (
                                <div ref={setLastElement}>
                                    <User user={user} />
                                </div>
                            )
                        }
                        return (
                            <User user={user} />
                        )
                    }) 
                )
            }
        </div>
    )
}

export default UserList
