// Header.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Header.css';

const Header = ({ onGoHome }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    const BASE_URL = 'http://localhost:5001';

    // Check if user is logged in on page load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get(`${BASE_URL}/api/users/current`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => setUser(res.data))
                .catch(() => localStorage.removeItem('token'));
        }
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/api/users/register`, {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            alert('Signup successful! Please log in.');
            setIsLogin(true);
            setFormData({ username: '', email: '', password: '' });
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/api/users/login`, {
                email: formData.email,
                password: formData.password,
            });
            localStorage.setItem('token', res.data.accessToken);

            // Fetch current user info
            const userRes = await axios.get(`${BASE_URL}/api/users/current`, {
                headers: { Authorization: `Bearer ${res.data.accessToken}` },
            });
            setUser(userRes.data);

            alert('Logged in successfully!');
            closeModal();
            setFormData({ username: '', email: '', password: '' });
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <div className="header-container">
            <h1 onClick={onGoHome} className="logo">
                PlotPlay
            </h1>

            {!user && (
                <button className="auth-btn" onClick={openModal}>
                    Login / Signup
                </button>
            )}

            {user && (
                <div className="user-info">
                    <span>Welcome, {user.username}</span>
                    <button className="auth-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}

            {isModalOpen && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>

                        {/* Signup Form */}
                        {!isLogin && (
                            <div className="form-container">
                                <h2 className="signuph2">Sign Up</h2>
                                <form onSubmit={handleSignup}>
                                    <input
                                        name="username"
                                        type="text"
                                        placeholder="Username"
                                        required
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <input type="submit" value="Sign Up" />
                                </form>

                                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                                <div className="or-line"></div>
                                <label>Have an account?</label>{' '}
                                <a href="#" onClick={() => setIsLogin(true)}>
                                    Log In
                                </a>
                            </div>
                        )}

                        {/* Login Form */}
                        {isLogin && (
                            <div className="form-container">
                                <h2 className="signuph2">Log In</h2>
                                <form onSubmit={handleLogin}>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <input type="submit" value="Log In" />
                                </form>
                                <div className="or-line"></div>
                                <label>Don't have an account?</label>{' '}
                                <a href="#" onClick={() => setIsLogin(false)}>
                                    Sign Up
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
