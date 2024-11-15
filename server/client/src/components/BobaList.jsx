import React from 'react'
import BobaCard from './BobaCard'

const BobaList = ({ bobas }) => {

    const bobasCards = bobas.map(boba => <BobaCard key={boba.id} boba={boba} />)

    return (
        <div>
            <h3>BobaList</h3>
            {bobasCards}
        </div>
    )
}

export default BobaList