import React, { useEffect, useState } from 'react'
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
import './NavBar.css'
import logo from '../../assets/logo.png'

const NavBar = () => {

  const [sticky, setSticky] = useState(false);

  useEffect(() => {

    window.addEventListener('scroll', ()=>{

      window.scrollY > 500 ? setSticky(true):setSticky(false);
      
    })

  },[])

  return (
    <nav className={`'container' ${sticky ? 'darkNav' : ''}`}>
        <img src={logo} alt=""  className='logo'/>
        <ul>
            <li><Link to='hero' smooth={true} offset={0} duration={500}>Home</Link></li>
            <li><Link to='Events' smooth={true} offset={-250} duration={500}>Programs</Link></li>
            <li><Link to='about' smooth={true} offset={-100} duration={500}>About Us</Link></li>
            <li><Link to='community' smooth={true} offset={-250} duration={500}>Community</Link></li>
            <li><Link to='organizations' smooth={true} offset={-250} duration={500}>Organizations</Link></li>
            <li><Link to='contact' smooth={true} offset={-250} duration={500}><button className='btn'>Contact Us</button></Link></li> 
        </ul>
    </nav>
  )
}

export default NavBar