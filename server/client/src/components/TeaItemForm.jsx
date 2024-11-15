import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { headers } from '../globals'
import { useNavigate } from 'react-router-dom'

const TeaItemForm = ({ addTeaItem }) => {
    // const [title, setTitle] = useState("")
    const [error, setError] = useState({})

    const navigate = useNavigate()

    const initialValues = {
        name: ""
    }

    const validationSchema = yup.object({
        name: yup.string().min(3).max(50).required()
    })

    const handleSubmit = async values => {
        const options = {
            method: "POST",
            headers,
            body: JSON.stringify(values)
        }
        const resp = await fetch("/api/teaItems", options)
        const data = await resp.json()
        if (resp.status !== 201) {
            setError({ data })
        } else {
            addTeaItem(data)
            navigate("/teaItems")
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
        validateOnChange: false
    })

    return (
        <div>
            <h3>Create Tea</h3>
            <p style={{ color: 'orange' }}> {formik.errors.error}</p>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="name">name:</label>
                    <input type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} />
                    <p style={{ color: 'purple' }}> {formik.errors.name}</p>
                </div> <br />
                <input type="submit" value="Create TeaItem" />
            </form>
        </div>
    )
}

export default TeaItemForm;