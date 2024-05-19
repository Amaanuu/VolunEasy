import React from 'react'
import './Hero.css'
import darkarrow from '../../assets/dark-arrow.png'

const Hero = () => {
  return (
    <div className='hero container'>

        <div className='hero-text'>

            <h1>Welcome to VolunEase – Your Gateway to Impactful Volunteering</h1><br />
            <p>At VolunEase, we believe in the power of community and the profound difference
                 we can make when we come together for a common cause. Our platform is designed to connect 
                 passionate volunteers with meaningful opportunities, making it easier than ever to contribute 
                 your time and talents to causes that matter most to you. Whether you're looking to lend a hand 
                 at local events, support non-profits, or contribute to global initiatives. 
                 Join us today and start transforming lives, one volunteer hour at a time.</p><br />
            <button className='btn'>Explore More <img src={darkarrow} alt="" /></button>

        </div>

    </div>
  )
}

export default Hero