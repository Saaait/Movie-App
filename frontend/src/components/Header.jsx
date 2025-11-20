// Header.jsx
import React, { useState } from 'react';
import '../styles/Header.css';

const Header = ({ onGoHome }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false); // toggle between login/signup

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="header-container">
            <h1 onClick={onGoHome} className="logo">
                PlotPlay
            </h1>

            <button className="auth-btn" onClick={openModal}>
                Login / Signup
            </button>

            {isModalOpen && (
                <div className="modal" onClick={closeModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                    >
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>

                        {/* Signup Form */}
                        {!isLogin && (
                            <div className="form-container">
                                <h2 className="signuph2">Sign Up</h2>
                                <form>
                                    <input type="text" placeholder="Username" required />
                                    <input type="email" placeholder="Email" required />
                                    <input type="password" placeholder="Password" required />
                                    <input type="submit" value="Sign Up" />
                                </form>
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
                                <form>
                                    <input type="email" placeholder="Email" required />
                                    <input type="password" placeholder="Password" required />
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