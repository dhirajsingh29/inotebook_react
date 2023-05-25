import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [user, setUser] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios
            .post('http://localhost:5000/api/auth/register',
                {
                    name: user.name,
                    email: user.email,
                    password: user.password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            .then(response => {
                if (response.data.success) {
                    localStorage.setItem('token', response.data.idToken);
                    navigate('/');
                    props.displayAlert('Account created successfully', 'success');
                }
            })
            .catch(error => {
                props.displayAlert(error.response.data.error, 'danger');
            });
    }

    const handleOnChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="container mt-2">
            <h2 className="my-2">Register to access iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        onChange={handleOnChange}
                        required
                        minLength={3} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                        onChange={handleOnChange}
                        required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={handleOnChange}
                        required
                        minLength={3} />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label"> Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={handleOnChange}
                        required
                        minLength={3} />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={user.name.length < 3 || user.password.length < 5 || user.confirmPassword.length < 5}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Signup