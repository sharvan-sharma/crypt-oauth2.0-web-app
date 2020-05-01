import React from 'react'

import OriginForm from './OriginForm'
import RedirectForm from './RedirectForm'
import AppNameForm from './AppNameForm'
import Homepage from './homepage'
import Description from './description'

function WriteForm(props){
   

return (
    <div className='col-12 col-md-6 col-lg-6'>
            <AppNameForm project_id ={props.project_id} />
            <Homepage/>
            <Description/>
            <OriginForm project_id ={props.project_id}/>
            <RedirectForm project_id ={props.project_id}/>
    </div>
)
}

export default WriteForm