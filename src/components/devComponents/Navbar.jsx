import React from 'react'
import {Link} from 'react-router-dom'
import ProfileMenu from '../devComponents/profileMenu'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisH,faCode} from '@fortawesome/free-solid-svg-icons'
import Brand from './BlackBrand'
import history from '../../history'


function Navbar(props){
return (
<nav className="navbar navbar-expand-lg bg-black fixed-nav">
  <Brand color='white' />
  <Link to='/devconsole' className='mx-3 text-dark p-2 fm rounded bg-white my-auto text-decoration-none'>
    Developer Console
  </Link>
  <span className="navbar-toggler text-white ml-auto my-auto" role='button'  data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
    <FontAwesomeIcon icon={faEllipsisH}/>
  </span>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <div className="navbar-nav ml-auto">
        <div className='m-lg-1 mt-4 mb-1 mx-1'>
          <button onClick={()=>history.push('/devconsole/newproject')}  className='btn btn-outline-light' data-toggle="collapse" data-target="#navbarSupportedContent">
            <FontAwesomeIcon icon={faCode} className='mr-1'/> 
            New Application
          </button>
        </div>
        <div className='m-1' >
          <ProfileMenu />
        </div>
    </div>
  </div>
</nav>
)
}

export default Navbar