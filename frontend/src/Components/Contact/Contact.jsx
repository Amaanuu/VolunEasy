import React from 'react'
import './Contact.css'
import msg_icon from '../../assets/msg-icon.png'
import mail_icon from '../../assets/mail-icon.png'
import phone_icon from '../../assets/phone-icon.png'
import location_icon from '../../assets/location-icon.png'

const Contact = () => {
  return (

    <div className='contact'> 
        <div className="contact-col">
            <h3>Send Us a Message <img src={msg_icon} alt="" /></h3>
            <p>Feel free to reach contact form or find our contact
              information below. Your feedback,questions, and suggestion
              are important to us we strive to provide exceptiinal service
              to our volunteer community.
            </p>
            <ul>
                <li> <img src={mail_icon} alt="" />  Contact@VolunEase.et</li>
                <li> <img src={phone_icon} alt=""/> +251 93494654</li>
                <li> <img src={location_icon} alt=""/> Addis Ababa, Ethiopia</li>
            </ul>
        </div>
        <div className="contact-col">
            <form>
                <label>Name</label>
                <input type="text" name='name' placeholder='Enter your name' required />
                <label>Email</label>
                <input type="tel" name='phone' placeholder='Enter your Email' required />
                <label>Write your message here</label>
                <textarea name="message" id="" rows="6" placeholder='Enter your message' required></textarea>
                <button type='submit' className='btn darkbtn'>Submit</button>
            </form>
            <span>sending</span>
        </div>
    </div>
  )
}

export default Contact