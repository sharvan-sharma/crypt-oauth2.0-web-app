import React,{useState} from 'react'
import BrandName from '../LandingPageComponents/Nav/BrandName'
import {Link} from 'react-router-dom'
import Fade from '@material-ui/core/Fade';
import Stepper from './signup/stepper'
import Message from './signup/Message'

function Signup(props){
    const [state,Switch] = useState({flag:true,email:''})
    return(
        <Fade in={true}>
            <div className='d-flex flex-column align-items-center border border-black rounded pt-5'>
                <BrandName/>
                {(state.flag)?
                <Stepper Switch={Switch} transaction_id={props.transaction_id}/>:
                <Message email={state.email}/>}
                <p className='mt-4 pt-4 mb-2 pb-2'>Already have a CryPt account?<Link to='/login'>Signin here</Link></p>
            </div>
        </Fade>
        )
}

export default Signup