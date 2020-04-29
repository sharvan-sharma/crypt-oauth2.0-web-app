import React,{useState} from 'react'
import Login from '../components/AuthComponents/Login'
import Signup from '../components/AuthComponents/Signup'
import CopyRight from '../components/CopyRight'

function Authenticate(props){
    return (
        <div className='fullscreen d-flex flex-column align-items-center justify-content-center'>
            <div className='col-12 col-md-6 col-lg-4 col-xl-4 py-4'>
                {(props.page === 'login')?<Login transaction_id={props.transaction_id}/>:<Signup transaction_id={props.transaction_id}/>}
                <p className='p-4'><CopyRight/></p>
            </div>
        </div>
        )
}

export default Authenticate