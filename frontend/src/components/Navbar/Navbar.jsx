import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("menu");
    const [showProfileDropdown, setShowProfileDropdown] = useState(false); // For dropdown toggle
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken("");  // Update the context token to an empty string
    };

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="Logo" className="logo" /></Link>
            <ul className="navbar-menu">
                <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</li>
                <li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</li>
                <li onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</li>
                <li onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="Search" />
                <div className="navbar-section-icon">
                    <Link to='/cart'>
                        <img src={assets.basket_icon} alt="Basket" />
                    </Link>
                    <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div> {/* Cart notification */}
                </div>
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>sign in</button>
                ) : (
                    <div className='navbar-profile'>
                        <img 
                            src={assets.profile_icon} 
                            alt="Profile" 
                            onClick={() => setShowProfileDropdown(prev => !prev)} // Toggle dropdown
                        />
                        {showProfileDropdown && (
                            <ul className="nav-profile-dropdown">
                                <li>
                                    <img src={assets.bag_icon} alt="Orders" />
                                    <p>Orders</p>
                                </li>
                                <hr />
                                <li onClick={handleLogout}> {/* Add logout functionality */}
                                    <img src={assets.logout_icon} alt="Logout" />
                                    <p>Logout</p>
                                </li>
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
