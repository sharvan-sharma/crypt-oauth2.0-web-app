import React from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

function LandingPageMiddle(){
    return (
        <div className="bg-black text-white mx-lg-4 mx-md-4 d-flex flex-wrap justify-content-center lp-mid">
            <div className='col-10 col-md-5 col-lg-4 m-auto'>
                <div className='p-auto'>
                    <p className='heading m-0 '>
                        <span className='bold'>C</span>
                        <span className='lead heading'>ry</span>
                        <span className='bold'>P</span>
                        <span className="lead heading">t</span>
                    </p>
                    <p className='subheading m-0'>OAuth2.0 Service</p>
                    <ul className='lead list-unstyled'>
                        <li>Oauth2.0 Service for your Application</li>
                        <li>Easy To Implement</li>
                    </ul>
                    <Link to='/login' className='h6 text-white text-decoration-none'>
                        Register Your Application
                        <FontAwesomeIcon className='mx-3' icon={faArrowRight}/>
                    </Link>
                </div>
            </div>
            <div className='col-10 col-md-5 col-lg-6 my-auto'>

            </div>
        </div>
    )
}

export default LandingPageMiddle