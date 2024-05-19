import React from 'react'
import NavBar from './Components/NavBar/NavBar'
import Hero from './Components/Hero/Hero'
import Events from './Components/Events/Events'
import Title from './Components/Title/Title'
import About from './Components/About/About'
import Community from './Components/Community/Community'
import Organization from './Components/Organizations/Organizations'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'

const App = () => {
  return (
    <div>
      
      <NavBar />
      <Hero />
      <div className='container'>

         <Title subTitle='Our PROGRAM' Title='what we offer'/>
         <Events />
         <About />
         <Title subTitle='Our Community' Title='Explore And See For YourSelf'/>
         <Community />
         <Title subTitle='Our Associates' Title='Featured Organizations'/>
         <Organization />
         <Title subTitle='Feel Free To Visit' Title='Contact Us'/>
         <Contact />
         <Footer />

      </div>
    </div>
  )
}

export default App