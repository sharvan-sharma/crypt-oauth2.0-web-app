import React from 'react';
import {Link} from 'react-router-dom'

function Details(props){

return (
    <div className='client-details d-flex justify-content-center align-items-center'>
        <div className='col-12 col-md-6 col-lg-6 col-xl-6 bg-white mx-2 p-4 d-flex flex-column rounded'>
            <label className='h3 my-2'>OAuth Client created</label>
            <label className='fm text-muted my-2'>Client ID and Client Secret can be accessed from Credentials</label>
            <label className='fm mt-2'>Client ID</label>
            <input className='form-control my-1' value={props.data.client_id} readOnly/>
            <label className='fm mt-2'>Client Secret</label>
            <input className='form-control my-1' value={props.data.client_secret} readOnly/>
            <div className='d-flex justify-content-end'>
                <Link to='/devconsole' className='btn btn-outline-dark text-decoration-none my-4 '>Ok</Link>
            </div>
        </div>
    </div>
)
}

export default Details