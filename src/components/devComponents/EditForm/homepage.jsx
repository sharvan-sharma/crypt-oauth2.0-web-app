import React,{useState,useRef} from 'react';
import {connect} from 'react-redux'
import {setHomepage} from '../../../redux/project/project.actions'
import axios from 'axios'
import LinearProgress from '../../linearProgress'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Divider from '@material-ui/core/Divider'
import validation from '../../../../src/utils/validations/index'
import Alert from '@material-ui/lab/Alert'

function Homepage(props){

 const link = useRef('')
 const [flag,setflag] = useState(true)
 const [progress,setprogress] = useState(false)
 const [error,setError]  = useState({exist:0,message:''})
 const [mode,setmode] = useState('unedit')

 const validate = ()=>{
     if(!validation.is_url(link.current.value)){
        setError({exist:1,message:'invalid_url'})
     }else{
        setError({exist:0,message:''})
     }
 }

 const changelink = ()=>{
     setprogress(true)
     axios.post('/client/edithomepage',{
         withCredentials:true,
         project_id:props.project_id,
         new_link:link.current.value
     }).then(res=>{
        setprogress(false)
        if(res.data.status === 500){
            setError({...error,exist:1,message:'server_error'})
        }else{
             setError({...error,exist:0,message:''})
             props.setHomepage(res.data.homepagelink)
             setmode('unedit')
             setflag(!flag)
        }
     }).catch(err=>{
         setprogress(false);
         setError({...error,exist:1,message:'server_error'})})
 }

return (
    <div className='mt-4'>
        <label className='h6 '>Homepage link</label>
        {(progress)?<LinearProgress />:<></>}
        {(mode === 'unedit')?
        <div className="d-flex fm my-2 justify-content-between">
            <a  href={props.homepagelink} className='my-auto'><b>{props.homepagelink}</b></a>
            <div className='d-flex justify-content-center'>
                <IconButton size='small' className='mr-2' disabled={progress} onClick={()=>setmode('edit')}>
                    <EditIcon fontSize='small'/>
                </IconButton>
            </div>
        </div>
        :
        <div className="d-flex fm  justify-content-between">
            <input type="text"  className="form-control fm" onBlur={validate} key={(flag)?0:1} ref={link} id='link' defaultValue={props.homepagelink} placeholder="Enter homepage link" />
            <div className='d-flex justify-content-center'>
                <IconButton size='small' className='mr-2' disabled={progress} onClick={changelink}>
                    <CheckIcon fontSize='small'/>
                </IconButton>
                <IconButton size='small' className='mr-2' disabled={progress} onClick={()=>setmode('unedit')}>
                    <ClearIcon fontSize='small'/>
                </IconButton>
            </div>
        </div>}
        {(error.exist === 1)?<Alert severity='error'>{error.message}</Alert>:<></>}
        <small className='text-muted'>The Homepage link is used to redirect user to your homepage from our store.</small>   
        <Divider/>
    </div>
)
}

const mapStateToProps = state=>({
    homepagelink:state.project.homepagelink,
    project_id:state.project._id
})

const mapDispatchToProps = dispatch=>({
    setHomepage:link=>dispatch(setHomepage(link))
})

export default connect(mapStateToProps,mapDispatchToProps)(Homepage)