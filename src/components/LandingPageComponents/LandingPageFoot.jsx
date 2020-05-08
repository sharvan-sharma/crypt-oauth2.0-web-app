import React from 'react'
import CopyRight from '../CopyRight'
import LinkIcons from '../LinkIcons'

export default function LandingPageFoot(){
    return (
        <div className='d-flex justify-content-between mx-4 my-4'>
            <LinkIcons />
            <CopyRight/>
        </div>
    )
}
