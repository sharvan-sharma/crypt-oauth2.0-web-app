import React from 'react';
import CopyRight  from '../components/CopyRight'
import Navbar from '../components/devComponents/Navbar'
import Divider from '@material-ui/core/Divider'
import {Route} from 'react-router-dom'
import Credentials from '../components/devComponents/Credentials'
import AppStepper from '../components/devComponents/AppStepper'
import querystring from 'query-string'
import EditForm from '../components/devComponents/EditForm'
import GrantedApps from '../components/devComponents/GrantedApps'

function DevConsole(){

    return (
        <div >
                    <Navbar />
                    <Divider/>
                    <Route exact path ='/' component={()=><GrantedApps/>} />
                    <Route exact path ='/devconsole' component={()=><Credentials />}/>
                    <Route exact path ='/devconsole/newproject' component={()=><AppStepper />} />
                    <Route exact path ='/devconsole/credentials/edit' component={(prop)=>{
                        const val = querystring.parse(prop.location.search)
                        const project_id = val.project_id
                        return <EditForm  project_id={project_id} />
                    }} />
                    <div className='d-flex justify-content-end p-4 border-top broder-gray'>
                        <CopyRight />
                    </div>
                    
        </div>
    )
}

export default DevConsole;
