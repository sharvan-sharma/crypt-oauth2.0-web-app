import React,{useState} from 'react'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCode} from '@fortawesome/free-solid-svg-icons'

function ApplicationItems(props){

    const [progress,setprogress] = useState(false)

const revokeAccess =()=>{
    setprogress(true)
    axios.post('/revokeaccess',{
        withcredentials:true,
        client_id:props.app.client_id
    }).then(res=>{
        props.setc(!props.c)
        setprogress(false)
    }).catch(err=>{
        setprogress(false)
    })
}

return (<div className='border-bottom border-gray p-2 d-flex justify-content-between'>
            <label className='h6 my-auto'>
                <FontAwesomeIcon icon={faCode} className='mr-2' />
                {(props.app.projectname.lenght > 20)?
                props.app.projectname.substring(0,20)+'...'
                :props.app.projectname}
            </label>
            <button  className='btn btn-outline-danger fm' disabled={progress} onClick={revokeAccess} >Revoke Access</button>
    </div>)
}

export default ApplicationItems