import React from 'react'

import Fade from '@material-ui/core/Fade';

function ForgotPassword(props){
    return (
        <Fade in={true}>
            <form className='col-12 my-4'>
                    <p className='h3 my-4'>Enter Your Registered Email</p>
                    <div className="form-group">
                        <input type="email" required className="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group d-flex justify-content-start ">
                        <button type='Submit' className='btn btn-dark mr-2' >Send Recovery Email</button>
                        <button type="button" className="btn btn-outline-dark" onClick={()=>props.setflag(true)}>Cancel</button>
                    </div> 
            </form>
         </Fade>
    )
}

export default ForgotPassword