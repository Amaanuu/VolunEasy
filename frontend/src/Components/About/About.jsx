import React from 'react'
import './About.css'
import about_img from '../../assets/about.png'

const About = () => {
  return (
    <div className='about'>
        <div className='aboutLeft'>

            <img src={about_img} alt="" className='about-img' />
            <img src="" alt="" />

        </div>

        <div className='aboutRight'>

            <h3>
            About Us
            </h3>
            <h2>
            Empowering Volunteers, Transforming Communities
            </h2>
            <p>
            Our mission is to connect compassionate individuals with impactful opportunities that drive positive 
            change in communities around the globe. At VolunEase, we believe that everyone has the power to make 
            a difference, and our platform is designed to make volunteering accessible, rewarding, and effective.   
            </p>
            <p>
            Founded on the principles of community, service, and engagement, VolunEase offers a seamless experience
            for both volunteers and organizations. Our intuitive platform allows volunteers to discover, sign up for,
            and manage their participation in various events and projects. For organizations, VolunEase provides 
            powerful tools to recruit, coordinate, and communicate with volunteers, ensuring every initiative runs 
            smoothly and efficiently.   
            </p>
            <p>
            Join us at VolunEase and become part of a vibrant network dedicated to making the world a better place, 
            one volunteer at a time   
            </p>

        </div>
    </div>
  )
}

export default About