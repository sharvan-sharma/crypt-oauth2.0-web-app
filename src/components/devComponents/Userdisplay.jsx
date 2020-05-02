import React,{useState} from 'react';
import GrantedApps from './GrantedApps'
import Store from './Store'
import Fade from '@material-ui/core/Fade'

function UserDisplay(){

const [state,setstate] = useState(true)

const active = 'btn btn-dark rounded-pill fm'

const inactive = 'btn btn-light rounded-pill fm'

return (<div className='d-flex flex-column  align-items-center' style={{marginTop:'10vh'}}>
                <div className='col-12 col-lg-6 p-2 col-md-8 d-flex border-bottom border-gray'>
                    <button className={(state)?active+' mr-2':inactive+' mr-2'} onClick={()=>setstate(true)}>Store</button>
                    <button className={(state)?inactive:active} onClick={()=>setstate(false)}>Granted Apps</button>
                </div>
                <div className='col-12 col-lg-6 p-2 col-md-8 mb-5'>
                    {(state)?
                    <Fade in={true}>
                            <Store />
                    </Fade>:
                    <Fade in={true}>
                            <GrantedApps />
                    </Fade>}
                </div>
        </div>)
}

export default UserDisplay