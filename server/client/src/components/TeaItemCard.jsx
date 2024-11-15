import React from 'react'
import { Link } from 'react-router-dom'

const TeaItemCard = ({ teaItem }) => {
    return (
        <div>
            <h3>
                <Link to={`/teaItems/${teaItem.id}`}>{teaItem.name}</Link>
            </h3>
        </div>
    )
}

export default TeaItemCard