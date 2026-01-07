import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>

            </div>
            <div className="footer-contentt-center">
               <h2>Company</h2>
               <ul>
               <li>Home</li>
               <li>About</li>
               <li>Delivery</li>
               <li>Privacy policy</li>
               </ul>
            </div>
            <div className="footer-content-right">
              <h2>GET IN TOUCH</h2>
              <ul>
                <li>Phone: +123456789</li>
                <li>  Address: 123 Main St, Anytown, Kenya </li>
              </ul>
            </div>
        </div>
       <hr />
       <p className='footer-copyright'> Copyright 2025. All rights reserved.</p>
    </div>
  )
}

export default Footer
