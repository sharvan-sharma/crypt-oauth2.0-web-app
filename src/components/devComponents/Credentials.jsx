import React from 'react';
import Divider from '@material-ui/core/Divider'
import ClientsTable from './credentials/ClientsTable'


function Credentials(){

    return (
             <div className='col-12 ' style={{marginTop:'10vh'}}>
                <div className='h5 d-flex justify-content-start align-items-center'>
                    <b>Credentials</b>
                 </div>
                <Divider/>
                <ClientsTable/>
            </div>
    )

}

export default Credentials