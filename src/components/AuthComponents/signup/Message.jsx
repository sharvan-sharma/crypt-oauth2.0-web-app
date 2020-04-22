import React from 'react'
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/Alert'

function Message(props){
    return (
         <Alert className='m-4' variant="filled" severity="info">
            <p className='h5 text-white my-2'>Verification Email has Sent To {props.email}</p>
            <p>We have sent a Verification Link in the Email,
            It is going to expires after 1 hour — <strong>check it out!</strong></p>
        </Alert>
    )
}

export default Message