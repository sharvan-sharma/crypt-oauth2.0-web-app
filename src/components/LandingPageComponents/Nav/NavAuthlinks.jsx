import React from 'react';
import {Link} from 'react-router-dom'

export default function NavAuthlinks(){
    return (
        <div className="navbar-nav d-flex flex-row">
                <Link className="btn btn-light mr-2 rounded-pill px-4 fm" to='/login'>Log in</Link>
                <Link className="btn btn-dark  rounded-pill px-4 fm" to='/signup'>Sign Up</Link>
       </div>
    )
}