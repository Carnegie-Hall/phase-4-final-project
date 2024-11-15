import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { headers } from '../globals'
import { useNavigate, useParams } from 'react-router-dom'

const TeaItemEditForm = ({ currentUser, loggedIn, userLoading, updateTeaItem }) => {
    // const [title, setTitle] = useState("")
    const [error, setError] = useState({})
    const [teaItem, setTeaItem] = useState({})
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedIn && !userLoading) {
            navigate("/login")
        } else {
            fetch('/api/teaItems/' + id)
                .then(resp => resp.json())
                .then(data => {
                    if (data.user.id !== currentUser.id) {
                        navigate("playlists")
                    }
                    setTeaItem(data)
                    setLoading(false)
                    formik.values.name = data.name

                })
        }
    }, [loggedIn, currentUser])


    const initialValues = {
        name: ""
    }

    const validationSchema = yup.object({
        name: yup.string().min(3).max(50).required()
    })

    const handleSubmit = async values => {
        const options = {
            method: "PATCH",
            headers,
            body: JSON.stringify(values)
        }
        const resp = await fetch("/api/teaItems/" + id, options)
        const data = await resp.json()
        if (resp.status !== 201) {
            setError({ data })
        } else {
            updateTeaItem(data)
            navigate("/teaItems")
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
        validateOnChange: false
    })

    if (loading && !teaItem.id) {
        return <h1>Loading...</h1>
    }


    return (
        <div>
            <h3>Update Tea </h3>
            <p style={{ color: 'orange' }}> {formik.errors.error}</p>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="name">name:</label>
                    <input type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} />
                    <p style={{ color: 'purple' }}> {formik.errors.name}</p>
                </div> <br />
                <input type="submit" value="Update TeaItem " />
            </form>
        </div>
    )
}

export default TeaItemEditForm;