import React from 'react';
import BrandName  from './Nav/BrandName'
import NavLinkList from './Nav/NavLinkList'
import NavAuthlinks from './Nav/NavAuthlinks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function LandingPageNav(){
    return (
    <nav className="navbar navbar-expand-lg p-lg-4 p-md-4">
        <BrandName/>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <NavLinkList/>
            <NavAuthlinks/>
        </div>
    </nav>)
}