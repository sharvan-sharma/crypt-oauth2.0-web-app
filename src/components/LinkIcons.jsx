import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

function LinkIcons(){
    return (
        <a href='https://github.com/sharvan-sharma/CryPt-client' className='text-decoration-none text-muted '>
            <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
        </a>
    )
}

export default LinkIcons