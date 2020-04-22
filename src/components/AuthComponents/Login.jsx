import React from 'react'
import {Link} from 'react-router-dom'
import BrandName from '../LandingPageComponents/Nav/BrandName'
import { useState } from 'react'
import Fade from '@material-ui/core/Fade';
import LoginForm from './login/loginForm'
import ForgotPassword from './login/forgotPassword'

function Login(){
    const [flag,setflag] = useState(true)
    return(
        <Fade in={true}>
            <div className='d-flex flex-column align-items-center border border-black rounded pt-3'>
                <BrandName/>
                <Fade in={true}>
                    {(flag)?<LoginForm setflag={setflag}/>:<ForgotPassword setflag={setflag}/>}
                </Fade>
                <p className='mt-4 mb-2 pt-4 pb-2'>Need a CryPt account?<Link to='/signup'>Create New Account</Link></p>
            </div>
        </Fade>
    )
}

export default Login