import React from 'react';
import {Link} from 'react-router-dom'

export default function NavLinkList(){
    return (
        <ul className="navbar-nav mx-auto text-dark">
                <li className="nav-item mr-4">
                    <Link className="nav-link text-secondary" to="/login">Developer Console</Link>
                </li>
                <li className="nav-item mr-4">
                    <Link className="nav-link text-secondary" to="/documentation">Documentation</Link>
                </li>
                <li className="nav-item mr-4">
                    <Link className="nav-link text-secondary" to="/about">About</Link>
                </li>
                <li className="nav-item mr-4">
                    <Link className="nav-link text-secondary" to="/contact">Contact</Link>
                </li>
        </ul>
    )
}