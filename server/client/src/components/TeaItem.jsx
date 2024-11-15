import React, { useEffect } from 'react'
import TeaItemCard from './TeaItemCard'
import { useNavigate } from 'react-router-dom'

const TeaItem = ({ teaItems, loggedIn, loading }) => {

    const navigate = useNavigate()

    useEffect(() => {
        if (!loading) {
            if (!loggedIn) {
                navigate("/login")
            }
        }

    }, [loggedIn, loading])

    if (loading || !teaItems) {
        return <h1></h1>
    }

    const teaItemCards = teaItems.map(teaItem => <TeaItemCard key={teaItem.id} teaItem={teaItem} />)

    return (
        <ul> {teaItemCards} </ul>
    )
}

export default TeaItem