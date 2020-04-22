import React from 'react';
import LandingPageNav from '../components/LandingPageComponents/LandingPageNav'
import LandingPageFoot from '../components/LandingPageComponents/LandingPageFoot'
import LandingPageMiddle  from '../components/LandingPageComponents/LandingPageMiddle'

export default function LandingPage(){
    return (<div className='container-fluid'>
                <LandingPageNav/>
                <LandingPageMiddle/>
                <LandingPageFoot/>
            </div>)
}