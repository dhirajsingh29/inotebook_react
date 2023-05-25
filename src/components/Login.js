import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [cred, setCred] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios
            .post('http://localhost:5000/api/auth/login',
                {
                    email: cred.email,
                    password: cred.password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            .then(response => {
                if (response.data.success) {
                    localStorage.setItem('token', response.data.idToken);
                    navigate('/');
                }
            })
            .catch(error => {
                props.displayAlert(error.response.data.error, 'danger');
            });
    }

    const handleOnChange = (e) => {
        setCred({
            ...cred,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="container mt-1">
            <h2 className="my-2">Login to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                        onChange={handleOnChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={handleOnChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login