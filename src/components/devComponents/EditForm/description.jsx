import React,{useState,useRef} from 'react';
import {connect} from 'react-redux'
import {setDescription} from '../../../redux/project/project.actions'
import axios from 'axios'
import LinearProgress from '../../linearProgress'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Divider from '@material-ui/core/Divider'
import Alert from '@material-ui/lab/Alert'

function Description(props){

 const description = useRef('')
 const [flag,setflag] = useState(true)
 const [progress,setprogress] = useState(false)
 const [error,setError]  = useState({exist:0,message:''})
 const [mode,setmode] = useState('unedit')
 const [val,setdesc] = useState({value:props.description,rem:200-props.description.length})

 const setdescription = ()=>{
     if(description.current.value.length <= 200){
        setdesc({...val,value:description.current.value,rem:200-description.current.value.length})
     }else{
        setdesc({...val,value:val.value,rem:0})
     }
 }

 const changeDesc = ()=>{
     setprogress(true)
     axios.post('/client/editdescription',{
         withCredentials:true,
         project_id:props.project_id,
         new_description:description.current.value || ''
     }).then(res=>{
        setprogress(false)
        if(res.data.status === 500){
            setError({...error,exist:1,message:'server_error'})
        }else{
             setError({...error,exist:0,message:''})
             props.setDescription(res.data.description)
             setmode('unedit')
             setflag(!flag)
        }
     }).catch(err=>{
         setprogress(false);
         setError({...error,exist:1,message:'server_error'})})
 }

return (
    <div className='mt-4'>
        <label className='h6 my-2'>Short Descritpion <small className='text-muted'>character remaining {val.rem}/200</small></label>
        {(progress)?<LinearProgress />:<></>}
        {(mode === 'unedit')?
        <div className="d-flex fm my-2 justify-content-between">
            <label className='my-auto bg-secondary text-white rounded p-2'>{props.description}</label>
            <div className='d-flex justify-content-center'>
                <IconButton size='small' className='mr-2' disabled={progress} onClick={()=>setmode('edit')}>
                    <EditIcon fontSize='small'/>
                </IconButton>
            </div>
        </div>
        :
        <div className="d-flex fm justify-content-between">
            <input type="text"  className="form-control fm" onChange={setdescription} key={(flag)?0:1} ref={description} id='desc' value={val.value} placeholder="Enter Description" />
            <div className='d-flex justify-content-center'>
                <IconButton size='small' className='mr-2' disabled={progress} onClick={changeDesc}>
                    <CheckIcon fontSize='small'/>
                </IconButton>
                <IconButton size='small' className='mr-2' disabled={progress} onClick={()=>setmode('unedit')}>
                    <ClearIcon fontSize='small'/>
                </IconButton>
            </div>
        </div>}
        {(error.exist === 1)?<Alert severity='error'>{error.message}</Alert>:<></>}
        <small className='text-muted'>This description is going to be used for for App description in Crypt Store</small> 
        <Divider/>  
    </div>
)
}

const mapStateToProps = state=>({
    description:state.project.description,
    project_id:state.project._id
})

const mapDispatchToProps = dispatch=>({
    setDescription:description=>dispatch(setDescription(description))
})

export default connect(mapStateToProps,mapDispatchToProps)(Description)