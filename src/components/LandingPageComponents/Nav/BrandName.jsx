import React from 'react';
import {Link} from 'react-router-dom'

export default function BrandName(){
    return (
        <Link className="text-dark text-decoration-none p-2" to="/">
            <span className='fl'>
                <b>C</b>
                <span className='text-muted'>ry</span>
                <b>P</b>
                <span className='text-muted'>t</span>
            </span>
            <span className='text-secondary fm'> OAuth2.0</span>
        </Link>
    )
}