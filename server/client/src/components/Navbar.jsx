import React from 'react'
import { Link, useNavigate } from "react-router-dom"

const Navbar = ({ currentUser, loggedIn, logoutUser }) => {

    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault()
        fetch('/api/logout', {
            method: "DELETE"
        })

        logoutUser()
        navigate("/signup")
    }

    const loggedInLinks = <>
        <li><Link to="/users">View Users</Link></li>
        <li><Link to="/teaItems">View Tea Items</Link></li>
        <li><Link to="/teaItems/new">Create Tea Items</Link></li>
        <li><Link to="/bobas"> View Bobas</Link></li>
        <li><Link to="/bobas/new"> Create Bobas</Link></li>
        <li><Link to="#" onClick={handleLogout}>Logout</Link></li>
        <li><Link to="/chat">Boba Chat!</Link></li>
        <li>{currentUser.username}</li>
    </>

    const loggedOutLinks = <>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">Login</Link></li>
    </>

    return (

        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/teaItems">Tea Item</Link></li>
            <li><Link to="/teaItems/new">Create Tea</Link></li>

            {loggedIn ? loggedInLinks : loggedOutLinks}

        </ul>
    )
}

export default Navbar