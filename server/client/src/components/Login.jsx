import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { headers } from '../globals'
import { useNavigate } from 'react-router-dom'

const Login = ({ loginUser }) => {

    const navigate = useNavigate()

    const initialValues = {
        username: "",
        password: ""
    }

    const validationSchema = yup.object({
        username: yup.string().min(3).max(25).required(),
        password: yup.string().min(3).required()
    })

    const handleSubmit = async values => {
        const options = {
            method: "POST",
            headers,
            body: JSON.stringify(values)
        }
        const resp = await fetch('/api/login', options)
        const data = await resp.json()

        if (resp.status != 200) {
            console.log(data.error)
        } else {
            loginUser(data)
            navigate("/playlists")
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
            <h3>Login</h3>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" value={formik.values.username} onChange={formik.handleChange} />
                    <p style={{ color: "red" }}>{formik.errors.username}</p>
                </div><br />
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} />
                    <p style={{ color: "red" }}>{formik.errors.password}</p>
                </div><br />

                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login