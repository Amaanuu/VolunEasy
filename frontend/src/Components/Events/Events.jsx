import React from 'react'
import './Events.css'
import Event1 from '../../assets/Event1.png'
import Event2 from '../../assets/Event2.png'
import Event3 from '../../assets/Event3.png'
import Icon1 from '../../assets/Icon1.png'
import Icon2 from '../../assets/Icon2.png'
import Icon3 from '../../assets/Icon3.png'

const Events = () => {
  return (

    <div className='Events'>

        <div className='Event'>
            <img src={Event1} alt="" />
            <div className='caption'>
                <img src={Icon1} alt="" />
                <p>Community Clean Up</p>
            </div>
        </div>

        <div className='Event'>
            <img src={Event2} alt="" />
            <div className='caption'>
                <img src={Icon2} alt="" />
                <p>Food Drives and Meal Services</p>
            </div>
        </div>

        <div className='Event'>
            <img src={Event3} alt="" />
            <div className='caption'>
                <img src={Icon3} alt="" />
                <p>Health and Wellness Events</p>
            </div>
        </div>

    </div>
  )
}

export default Events