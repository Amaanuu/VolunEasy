import React, { useEffect, useState } from 'react'
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
            <li>Home</li>
            <li>Programs</li>
            <li>About Us</li>
            <li>Community</li>
            <li>Organizations</li>
            <li><button className='btn'>Contact Us</button></li>
        </ul>
    </nav>
  )
}

export default NavBar