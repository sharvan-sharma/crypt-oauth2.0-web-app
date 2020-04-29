import React,{useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCode,faCheck} from '@fortawesome/free-solid-svg-icons'
import history from '../../history'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import InputBase from '@material-ui/core/InputBase';

function SelectProject(props){

    const [active,setactive] = useState(true)


    return (<>
            <div className='d-flex  my-4 mx-4 justify-content-between align-items-center'>
                <label className='my-auto '>Select A Project</label>
                <button className='btn btn-outline-dark' onClick = {()=>{history.push('/devconsole/newproject')}}>
                    <FontAwesomeIcon icon={faCode}/> New Application
                </button>
            </div>
            <div className='d-flex pl-4 py-0 my-2 mx-4 justify-content-between align-items-center border border-dark rounded'>
                <InputBase
                    placeholder="Search Applications"
                    inputProps={{ 'aria-label': 'Search Applications' }}
                />
                <IconButton type="submit" aria-label="search">
                    <SearchIcon />
                </IconButton>
            </div>
            <div className='d-flex mb-0 border-bottom border-dark mt-2 mx-4 align-items-center'>
                <button className={(active)?'active-tab my-0 mr-2 p-2':'inactive-tab text-muted my-0 p-2 mr-2'} onClick={()=>setactive(true)}>
                    RECENT
                </button>
                <button className={(!active)?'active-tab my-0 p-2':'inactive-tab text-muted my-0 p-2'} onClick={()=>setactive(false)}>
                    ALL
                </button>
            </div>
            <div className='d-flex mx-4 border-bottom border-secondary py-2 align-items-center'>
                <label className='col-1 my-auto'> </label>
                <label className='col-11 my-auto'>Application Name</label>
            </div>
            <div className=' mx-4 d-flex'>
                    <label className='col-1 my-auto'><FontAwesomeIcon icon={faCheck} /></label>
                    <div className='col-11'><button className ='btn btn-link text-dark'><b>CryPt</b></button></div>
            </div>
        </>)
}

export default SelectProject