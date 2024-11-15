import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { headers } from '../globals'
import { useNavigate } from 'react-router-dom'

const BobaForm = ({ addBoba, loggedIn, loading }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && !loggedIn) {
            navigate("/login")
        }
    }, [loggedIn])

    const initialValues = {
        name: ""
    }

    const validationSchema = yup.object({
        name: yup.string().required()
    })

    const handleSubmit = values => {
        fetch('/api/bobas', {
            method: "POST",
            headers,
            // headers turned back to normal?
            body: JSON.stringify(values)
        })
            .then(resp => resp.json())
            .then(data => {
                addBoba(data)
                navigate("/bobas")
            })
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
        validateOnChange: false
    })

    return (
        <div>
            <h3>Create Boba</h3>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="name"> Title:</label>
                    <input type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} />
                    <p style={{ color: "red" }}>{formik.errors.name}</p>
                </div> <br />
                <input type="submit" value="Create Boba" />
            </form>
        </div>
    )
}

export default BobaForm