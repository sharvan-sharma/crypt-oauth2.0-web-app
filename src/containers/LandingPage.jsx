import React from 'react';
import Fade from '@material-ui/core/Fade'
import LandingPageNav from '../components/LandingPageComponents/LandingPageNav'
import LandingPageFoot from '../components/LandingPageComponents/LandingPageFoot'
import LandingPageMiddle  from '../components/LandingPageComponents/LandingPageMiddle'

export default function LandingPage(){
    return (
    <Fade in={true}>
        <div className='container-fluid'>
                <LandingPageNav/>
                <LandingPageMiddle/>
                <LandingPageFoot/>
        </div>
    </Fade>)
}