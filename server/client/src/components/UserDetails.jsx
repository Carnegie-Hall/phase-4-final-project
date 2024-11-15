import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const UserDetails = () => {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    useEffect(() => {
        fetch('/api/users/' + id)
            .then(resp => resp.json())
            .then(data => {
                setUser(data)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <h1>loading...</h1>
    }

    const teaItems = user.teaItems.map(ti => <li key={ti.id}>{ti.name}</li>)

    return (
        <div>
            <h3>{user.username}'s Tea</h3>
            <ul>{teaItems}</ul>
        </div>
    )
}

export default UserDetails