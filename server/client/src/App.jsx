import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import TeaItem from './components/TeaItem'
import TeaItemForm from './components/TeaItemForm'
import TeaItemEditForm from './components/TeaItemEditForm'
import TeaItemDetails from './components/TeaItemDetails'
import { baseUrl } from './globals'
import Signup from './components/Signup'
import Login from './components/Login'
import Users from './components/Users'
import UserDetails from './components/UserDetails'
import BobaList from './components/BobaList'
import BobaForm from './components/BobaForm'
import Chat from './components/Chat'

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [bobas, setBobas] = useState([])
  const [loggedIn, setloggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  // const [teaItems, setTeaItems] = useState([])

  useEffect(() => {
    fetch('/api/check-current-user')
      .then(resp => {
        if (resp.status == 200) {
          resp.json().then(data => {
            loginUser(data)
            setLoading(false)
          })
        } else {
          setLoading(false)
        }
      })
    fetch('/api/bobas')
      .then(resp => resp.json())
      .then(data => setBobas(data))
  }, [])


  const loginUser = (user) => {
    setCurrentUser(user)
    setloggedIn(true)
    // setLoading(false)
  }

  const logoutUser = () => {
    setCurrentUser({})
    setloggedIn(false)
    // setLoading(false)
  }

  const addBoba = boba => {
    setBobas([...bobas, boba])
  }

  const addTeaItem = teaItem => {

    const ti = [...currentUser.teaItems, teaItem]

    const updatedCurrentUser = {
      ...currentUser,
      teaItems: ti
    }
    setCurrentUser(updatedCurrentUser)
  }

  const updateTeaItem = updatedTeaItem => {
    const updatedTeaItems = currentUser.teaItems.map(teaItem => {
      if (teaItem.id === updatedTeaItem.id) {
        return updatedTeaItem
      } else {
        return teaItem
      }
    })

    const updatedCurrentUser = {
      ...currentUser,
      teaItems: updatedTeaItems
    }

    setCurrentUser(updatedCurrentUser)
  }

  const deleteTeaItem = (id) => {
    const updatedTeaItems = currentUser.teaItems.filter(teaItem => teaItem.id !== parseInt(id))
    const updatedCurrentUser = {
      ...currentUser,
      teaItems: updatedTeaItems
    }
    setCurrentUser(updatedCurrentUser)
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <Router>
      <Navbar loggedIn={loggedIn} currentUser={currentUser} logoutUser={logoutUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/teaItems" element={<TeaItem teaItems={currentUser.teaItems} loggedIn={loggedIn} loading={loading} />} />
        <Route path="/teaItems/new" element={<TeaItemForm addTeaItem={addTeaItem} />} />
        <Route path="/teaItems/:id/edit" element={<TeaItemEditForm currentUser={currentUser} loggedIn={loggedIn} userLoading={loading} updateTeaItem={updateTeaItem} />} />
        <Route path="/teaItems/:id" element={<TeaItemDetails currentUser={currentUser} loggedIn={loggedIn} userLoading={loading} deleteTeaItem={deleteTeaItem} />} />
        <Route path="/bobas" element={<BobaList bobas={bobas} />} />
        <Route path="/bobas/new" element={<BobaForm addBoba={addBoba} loggedIn={loggedIn} />} />
        <Route path="/signup" element={<Signup loginUser={loginUser} />} />
        <Route path="/login" element={<Login loginUser={loginUser} />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  )
}

export default App;
