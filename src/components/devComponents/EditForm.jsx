import React,{useEffect,useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronLeft,faUndo,faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import WriteForm from './EditForm/WriteForm'
import ReadForm from './EditForm/ReadForm'
import history from '../../history'
import CircularProgress from '../circularProgress'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import {setCurrentProject,setSecret} from '../../redux/project/project.actions'
import {connect} from 'react-redux'

function EditForm(props){

    const [state,setstate] = useState({flag:0})
    const [progress,setprogress] = useState({flag:false,button:''})
    const [error,setError] = useState({reset:{exist:0,msg:''},delete:{exist:0,msg:''}})

    const resetSecret = ()=>{
        setprogress({flag:true,button:'reset'})
        axios.post('/client/resetsecret',{
            withCredentials:true,
            project_id:props.project_id
        }).then(res=>{
             setprogress({flag:false,button:''})
            if(res.data.status === 500){
                 setError({...error,reset:{exist:1,msg:'error ocuured'}})
            }else {
                props.setSecret(res.data.client_secret)
            }
        })
        .catch(error=>{
             setprogress({flag:false,button:''})
             setError({...error,reset:{exist:1,msg:'error ocuured'}})
        })
    }

    const deleteproject = ()=>{
        setprogress({flag:true,button:'delete'})
        axios.post('/client/deleteproject',{
            withCredentials:true,
            project_id:props.project_id
        }).then(res=>{
            setprogress({flag:false,button:''})
            if(res.data.status === 500){
                setError({...error,reset:{exist:1,msg:'server_error'}})
            }else if(res.data.status === 401){
                setError({...error,reset:{exist:1,msg:'unauthorised access'}})
            }else if(res.data.status === 200){
                history.push('/devconsole')
            }
        }).catch(err=>{
            setprogress({flag:false,button:''})
             setError({...error,delete:{exist:1,msg:'error ocuured'}})
        })
    }

    useEffect(()=>{
        axios.post('/client/readclient',{withCredentials:true,
        project_id:props.project_id})
        .then(res=>{
            if(res.data.status === 500){
                setstate({flag:1})
            }else{
                props.setCurrentProject({...res.data.doc})
                setstate({flag:2})
            }
        }).catch(err=>setstate({flag:1}))
    },[])

    if(state.flag === 0){
        return <div className='d-flex col-12 justify-content-center align-items-center' style={{height:'80vh'}}>
                <CircularProgress />
        </div>
    }else if(state.flag === 1)
    {
      return (  <div className='d-flex col-12 justify-content-center align-items-center'>
                <Alert severity='error'>Error Occured while processing Request</Alert>
        </div>)
    }else if(state.flag === 2){
    return (
        <>
        <div className='d-flex flex-wrap border-bottom border-dark p-2'  style={{marginTop:'10vh'}}>
            <button className='btn btn-light rounded-circle' onClick={()=>history.push('/devconsole')} ><FontAwesomeIcon icon={faChevronLeft} /></button>
            <label className='my-auto h5 mx-2'>Client ID for Web Application</label>
            {(progress.flag && progress.button === 'reset')?<CircularProgress/>:
            <button className='btn btn-link bg-light text-decoration-none mx-2' onClick={resetSecret}><FontAwesomeIcon icon={faUndo}/>RESET SECRET</button>}
            {(progress.flag && progress.button === 'delete')?<CircularProgress/>:
            <button className='btn btn-link bg-light text-decoration-none mx-2' onClick={deleteproject}><FontAwesomeIcon icon={faTrashAlt}/> DELETE</button>}
        </div>
        {(error.delete.exist === 1)?<Alert severity='error' className='my-1' variant='filled'>{error.delete.msg}</Alert>:<></>}
        {(error.reset.exist === 1)?<Alert severity='error'   className='my-1' variant='filled'>{error.reset.msg}</Alert>:<></>}
        <div className='d-flex flex-row-reverse m-lg-4 m-md-2 flex-wrap '>
            <ReadForm  />
            <WriteForm/>
        </div>
    </>)
    }
}


const mapDispatchToProps = dispatch=>({
    setCurrentProject:projectobj=>dispatch(setCurrentProject(projectobj)),
    setSecret:secret=>dispatch(setSecret(secret))
})

export default connect(null,mapDispatchToProps)(EditForm)