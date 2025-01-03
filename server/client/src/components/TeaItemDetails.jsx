import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import { baseUrl } from '../globals'

const TeaItemDetails = ({ currentUser, loggedIn, userLoading, deleteTeaItem }) => {
    const [teaItem, setTeaItem] = useState({})
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (userLoading && !currentUser.id) {
            navigate("/login")
        }
        fetch("/api/teaItems/" + id)
            .then(resp => resp.json())
            .then(data => {
                setTeaItem(data)
                setLoading(false)
            })
    }, [loggedIn, currentUser])

    const handleDelete = event => {
        event.preventDefault()

        fetch('/api/teamItems/' + id, {
            method: "DELETE"
        })

        deleteTeaItem(id)
        navigate("/teaItems")
    }

    if (loading || userLoading) {
        return <h1>Loading...</h1>
    }

    const bobas = teaItem.milk_teas.map(mt => <li key={mt.id}>{mt.boba.name}</li>)
    // mt stands for milk_teas here
    return (
        <div>
            <h3>{teaItem.name}</h3>
            <p>{teaItem.user.username}'s Tea</p>
            {teaItem.user.id === currentUser.id ? <><Link to={`/teaItems/${teaItem.id}/edit`} style={{ marginRight: "5px" }}> Edit</Link>
                <Link to="#" onClick={handleDelete}>Delete</Link></> : null}
            <ul>
                {bobas}
            </ul>
        </div>
    )
}

export default TeaItemDetails