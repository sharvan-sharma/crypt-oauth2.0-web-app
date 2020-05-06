import React from 'react';
import {Link} from 'react-router-dom'

export default function NavLinkList(){
    return (
        <ul className="navbar-nav mx-auto text-dark">
                <li className="nav-item mr-4">
                    <Link className="nav-link text-secondary" to="/login">Developer Console</Link>
                </li>
                <li className="nav-item mr-4">
                    <a className="nav-link text-secondary" href="https://crypt-docs.netlify.app">Documentation</a>
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