import React, { useState, useEffect } from 'react'
import UserCard from './UserCard'

const Users = ({ user }) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('/api/users')
            .then(resp => resp.json())
            .then(data => setUsers(data))
    }, [])

    const userCards = users.map(user => <UserCard key={user.id} user />)

    return (
        <div>
            <h3>User List</h3>
            <ul>
                {userCards}
            </ul>
        </div>
    )
}

export default Users