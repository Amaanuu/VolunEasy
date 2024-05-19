import React, { useRef } from 'react'
import './Organizations.css'
import next_icon from '../../assets/next-icon.png'
import back_icon from '../../assets/back-icon.png'
import organization1 from '../../assets/user-1.png'
import organization2 from '../../assets/user-2.png'
import organization3 from '../../assets/user-3.png'
import organization4 from '../../assets/user-4.png'

const Organizations = () => {

    const slider = useRef();
    let tx = 0;

    const slideForward = () =>{
        if(tx > -50){
            tx -= 25;
        }
        slider.current.style.transform = `translateX(${tx}%)`
    }

    const slideBackward = () =>{
        if(tx < 0){
            tx += 25;
        }
        slider.current.style.transform = `translateX(${tx}%)`
    }

  return (

    <div className='organizations'>

        <img src={next_icon} alt="" className='next-btn' onClick={slideForward}/>
        <img src={back_icon} alt="" className='back-btn' onClick={slideBackward}/>
        <div className="slider">
            <ul ref={slider}>
                <li>

                    <div className="slide">
                       <div className="org-info">
                            <img src={organization1} alt="" />
                            <div>
                                <h3>Ethiopian Red Cross Society</h3>
                                <span>Addis Ababa, Ethiopia</span>
                            </div>
                        </div>
                        <p>Provides humanitarian assistance and emergency
                           response services across Ethiopia,including disaster
                           relief,health services, and community development
                           programs.
                        </p>
                    </div>
                </li>

                <li>
                    <div className="slide">
                       <div className="org-info">
                            <img src={organization2} alt="" />
                            <div>
                                <h3>Hope Enterprises</h3>
                                <span>Addis Ababa, Ethiopia</span>
                            </div>
                        </div>
                        <p>A humanitarian organization that provides support
                           and services to vulnerable population in Ethiopia,
                           including orphaned children,people with disabilities, 
                           and those affected by poverty and HIV/AIDS. 
                        </p>
                    </div>
                </li>

                <li>
                    <div className="slide">
                       <div className="org-info">
                            <img src={organization3} alt="" />
                            <div>
                                <h3>Ephrem Foundation</h3>
                                <span>Addis Ababa, Ethiopia</span>
                            </div>
                        </div>
                        <p>Ephrem Foundation is a charitable organization that 
                           focuses on providing support and care for orphans,
                           vulnerable children, and elderly individuals in Ethiopia. 
                        </p>
                    </div>
                </li>

                <li>
                    <div className="slide">
                       <div className="org-info">
                            <img src={organization4} alt="" />
                            <div>
                                <h3>Save The Children Ethiopia</h3>
                                <span>Addis Ababa, Ethiopia</span>
                            </div>
                        </div>
                        <p>Save the Children Ethiopia is a branch of the global 
                           Save the Children organization, dedicated to improving 
                           the lives of children in Ethiopia. Since its establishment, 
                           the organization has been at the forefront of promoting children's 
                           rights, providing relief, and supporting children in need through
                           various programs and initiatives.
                        </p>
                    </div>
                </li>
                
            </ul>
        </div>

    </div>

  )
}

export default Organizations