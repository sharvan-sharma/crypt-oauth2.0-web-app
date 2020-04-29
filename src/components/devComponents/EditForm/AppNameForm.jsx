import React,{useState,useRef} from 'react';
import {connect} from 'react-redux'
import {setAppName} from '../../../redux/project/project.actions'
import axios from 'axios'
import LinearProgress from '../../linearProgress'

function AppNameForm(props){

  const name = useRef('')
    const [flag,setflag] = useState(true)
 const [progress,setprogress] = useState(false)
 const [error,setError]  = useState({exist:0,message:''})

 const changeAppName = ()=>{
     setprogress(true)
     axios.post('/client/editprojectname',{
         withCredentials:true,
         project_id:props.project_id,
         new_projectname:name.current.value
     }).then(res=>{
        setprogress(false)
        if(res.data.status === 500){
            setError({...error,exist:1,message:'server_error'})
        }else{
             setError({...error,exist:0,message:''})
             props.setAppName(res.data.name)
             setflag(!flag)
        }
     }).catch(err=>{
         setprogress(false);
         setError({...error,exist:1,message:'server_error'})})
 }

return (
    <div>
        <label className='h5 mb-4'>Application Name</label>
        {(progress)?<LinearProgress />:<></>}
        <div className="d-flex fm my-2">
            <input type="text" required className="form-control" key={(flag)?0:1} ref={name} id='appname' defaultValue={props.projectname} placeholder="Enter Application Name" />
            <button type="button" className="btn btn-dark mx-1" disabled={progress} onClick={changeAppName}>Change</button>
        </div> 
        <small>The name of your OAuth 2.0 client. This name is only used to identify the client in the console and will not be shown to end users.</small>   
    </div>
)
}

const mapStateToProps = state=>({
    projectname:state.project.projectname,
    project_id:state.project._id
})

const mapDispatchToProps = dispatch=>({
    setAppName:name=>dispatch(setAppName(name))
})

export default connect(mapStateToProps,mapDispatchToProps)(AppNameForm)