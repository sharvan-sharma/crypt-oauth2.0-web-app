import React from 'react';
import CopyRight  from '../components/CopyRight'
import Navbar from '../components/devComponents/Navbar'
import Divider from '@material-ui/core/Divider'
import {Route,Switch,Redirect} from 'react-router-dom'
import Credentials from '../components/devComponents/Credentials'
import AppStepper from '../components/devComponents/AppStepper'
import querystring from 'query-string'
import EditForm from '../components/devComponents/EditForm'
import Fade from '@material-ui/core/Fade'
import UserDisplay from '../components/devComponents/Userdisplay'
import LinkIcons from '../components/LinkIcons'

function DevConsole(){

    return (
        <div className="d-flex justify-content-between flex-column mh-100">
            <div>
                    <Navbar />
                    <Divider/>
                    <Switch>
                    <Route exact path ='/' component={()=>{
                        return <UserDisplay/>
                    }} />
                    <Route exact path ='/devconsole' component={()=>{
                        return (<Fade in={true}><Credentials /></Fade>)
                    }}/>
                    <Route exact path ='/devconsole/newproject' component={()=>{
                        return (<Fade in={true}><AppStepper /></Fade>)
                    }} />
                    <Route exact path ='/devconsole/credentials/edit' component={(prop)=>{
                        const val = querystring.parse(prop.location.search)
                        const project_id = val.project_id
                        return <EditForm  project_id={project_id} />
                    }} />
                    
                    <Route>
                        <Redirect to = '/'/>
                    </Route>
                </Switch>
                </div>
                <div className='d-flex justify-content-between p-4 border-top border-gray'>
                    <LinkIcons/>
                        <CopyRight />
                    </div>
                    
        </div>
    )
}

export default DevConsole;
