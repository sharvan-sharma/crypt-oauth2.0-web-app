import React from 'react';
import GrantedApps from './GrantedApps'
import Store from './Store'

function UserDisplay(){
return (<div className='d-flex justify-content-center overflow-scroll ' style={{marginTop:'15vh',height:'70vh'}}>
                <div className='col-12 col-md-8 col-lg-9 col-xl-9 d-flex flex-column border-right border-dark'>
                    <Store />
                </div>
                <div className='col-12 col-md-4 col-lg-3 col-xl-3 d-flex flex-column'>
                    <GrantedApps />
                </div>
        </div>)
}

export default UserDisplay