import React,{useState,useRef} from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import axios from 'axios'
import {connect} from 'react-redux'
import {setRedirectURIs,setOriginURIs} from '../../../redux/project/project.actions'
import Alert from '@material-ui/lab/Alert'

function UriItem(props){
    const uri = useRef('')

    const [state,setstate] = useState('unedit')
 
    const [error,setError] = useState({
        adduri:{exist:0,message:''}
    })

    const updateUri = ()=>{
        if(props.type === 'origin'){
            axios.post('/client/editorigin',{
                withCredentials:true,
                project_id:props.project._id,
                uri_id:props.uri._id,
                new_uri:uri.current.value
            }).then(res=>{
                if(res.data.status === 500){
                    setError({...error,adduri:{exist:1,message:'server error'}})
                }else if(res.data.status === 200){
                    props.setOriginURIs(res.data.OriginURIs)
                     setstate('unedit')
                }else if(res.data.status === 422){
                    setError({...error,adduri:{exist:1,message:'Uri doesnot exist'}})
                }else if(res.data.status === 401){
                     setError({...error,adduri:{exist:1,message:'Client doesnot exist'}})
                }
            }).catch(err=>setError({...error,adduri:{exist:1,message:'server error'}}))
        }else{
            axios.post('/client/editredirect',{
                withCredentials:true,
                project_id:props.project._id,
                uri_id:props.uri._id,
                new_uri:uri.current.value
            }).then(res=>{
                if(res.data.status === 500){
                    setError({...error,adduri:{exist:1,message:'server error'}})
                }else if(res.data.status === 200){
                    props.setRedirectURIs(res.data.RedirectURIs)
                    setstate('unedit')
                }else if(res.data.status === 422){
                    setError({...error,adduri:{exist:1,message:'Uri doesnot exist'}})
                }else if(res.data.status === 401){
                     setError({...error,adduri:{exist:1,message:'Client doesnot exist'}})
                }
            }).catch(err=>setError({...error,adduri:{exist:1,message:'server error'}}))
        }
    }

    const deleteUri = ()=>{
        if(props.type === 'origin'){
            console.log('delete')
            axios.post('/client/deleteorigin',{
                withCredentials:true,
                project_id:props.project._id,
                uri_id:props.uri._id,
            }).then(res=>{
                if(res.data.status === 500){
                    setError({...error,adduri:{exist:1,message:'server error'}})
                }else if(res.data.status === 200){
                    console.log(res.data)
                    props.setOriginURIs(res.data.OriginURIs)
                }else if(res.data.status === 422){
                    setError({...error,adduri:{exist:1,message:'Uri doesnot exist'}})
                }
            }).catch(err=>setError({...error,adduri:{exist:1,message:'server error'}}))
        }else{
            axios.post('/client/deleteredirect',{
                withCredentials:true,
                project_id:props.project._id,
                uri_id:props.uri._id
            }).then(res=>{
                if(res.data.status === 500){
                     setError({...error,adduri:{exist:1,message:'server error'}})
                }else if(res.data.status === 200){
                     props.setRedirectURIs(res.data.RedirectURIs)
                }else if(res.data.status === 422){
                     setError({...error,adduri:{exist:1,message:'Uri doesnot exist'}})
                }
            }).catch(err=>setError({...error,adduri:{exist:1,message:'server error'}}))
        }
    }

return (
    <>
    {(state === 'unedit')?<>
    {(error.adduri.exist === 1)?<Alert>{error.adduri.message}</Alert>:<></>}
    <div className='d-flex border-bottom border-gray justify-content-between'>
        <label className='my-auto'>{props.uri.uri}</label>
        <div>
            <IconButton size='small' className='mr-2' onClick={()=>setstate('edit')}>
                <EditIcon fontSize='small' />
            </IconButton>
            <IconButton size='small'  onClick={deleteUri}>
                <DeleteIcon fontSize='small'/>
            </IconButton>
        </div>
    </div></>:
    <>
    {(error.adduri.exist === 1)?<Alert>{error.adduri.message}</Alert>:<></>}
    <div className='d-flex border-bottom border-gray py-2 justify-content-between'>
        <input className='form-control my-auto fm' defaultValue={props.uri.uri} ref={uri}  />
        <div className='d-flex ml-4'>
            <IconButton size='small' className='mr-2' onClick={updateUri}>
                <CheckIcon fontSize='small' />
            </IconButton>
            <IconButton size='small'  onClick={()=>setstate('unedit')}>
                <ClearIcon fontSize='small'/>
            </IconButton>
        </div>
    </div>
    </>
}
    </>
)
}

const mapStateToProps = state=>({
    project:state.project
})

const mapDispatchToProps = dispatch=>({
    setRedirectURIs:array=>dispatch(setRedirectURIs(array)),
    setOriginURIs:array=>dispatch(setOriginURIs(array))
})

export default connect(mapStateToProps,mapDispatchToProps)(UriItem)