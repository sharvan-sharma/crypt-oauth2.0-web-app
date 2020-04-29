import React from 'react'
import {Link} from 'react-router-dom'
import Fade from '@material-ui/core/Fade'

const Page404 = ()=>{
    return (
    <Fade in={true}>
        <div className='d-flex justify-content-center align-items-center fullscreen' >
            <div className='col-12 col-md-6 col-lg-4 col-xl-4 d-flex flex-column align-items-center justify-content-center'>
                <p className='display-2'>404</p>
                <p className='h3 mb-4'>Page Not Found</p>
                <p><Link to='/' className='btn btn-info'>Let's Get Back To Home</Link></p>
            </div>
        </div>
    </Fade>
    )
}

export default Page404