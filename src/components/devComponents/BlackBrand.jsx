import React from 'react'
import {Link} from 'react-router-dom'

function Brand (props){


    return (
        <Link to="/" className='text-decoration-none' >
        <span style={{fontSize:'1.5rem'}} className={(props.color === 'black')?'text-dark':'text-white'}>
            <span><b>C</b></span>
            <span><small>ry</small></span>
            <span><b>P</b></span>
            <span><small>t</small></span>
            <span className={(props.color === 'black')?'text-muted fm':'text-white-50 fm'}>OAuth2.0</span>
        </span>
   </Link> )
}

export default Brand