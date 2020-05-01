import React,{useRef,useState} from 'react'
import UriItem from './UriItem'
import {connect} from 'react-redux'
import LinearProgress from '../../linearProgress'
import axios from 'axios'
import {setOriginURIs} from '../../../redux/project/project.actions'
import Alert from '@material-ui/lab/Alert'

function OriginUri(props){
    
    const [flag,setflag] = useState(0)

    const uri = useRef('')

    const [error,setError] = useState({
        uri:{exist:0,message:''}
    })
    const [progress,setprogress] = useState(false)

    const addUri = ()=>{
        setprogress(true)
        axios.post('/client/addorigin',{
            withCredentials:true,
            uri:uri.current.value,
            project_id:props.project_id
        }).then(res=>{
            setprogress(false)
            if(res.data.status === 500){
                setError({...error,uri:{exist:1,message:'server_error'}})
            }else if(res.data.status === 401){
                setError({...error,uri:{exist:1,message:'unrecognised client'}})
            }else if(res.data.status === 422){
                setError({...error,uri:{exist:1,message:'uri already exists'}})
            }else if(res.data.status === 200){
                setError({...error,uri:{exist:0,message:''}})
                props.setOriginURIs(res.data.OriginURIs)
                setflag((flag === 0)?1:0)
            }
        }).catch(err=>{
            setprogress(false)
            setError({...error,uri:{exist:1,message:'server_error'}})
        })
    }
return (
    <form className='my-4'>
                <label className='my-auto h4'>Authorized JavaScript origins </label>
                <p className='text-muted fm my-4'>For use with requests from a browser</p>
                {(progress)?<LinearProgress />:<></>}
                {(error.uri.exist === 1)?<Alert severity='error' variant='filled' >{error.message}</Alert>:<></>}
                <div className='d-flex my-2'>
                    <input type="text" key={flag} className="form-control" ref={uri}  id='origin' placeholder=" Origin URI" />
                    <button type="submit" className="btn btn-dark mx-1 text-nowrap" disabled={progress} onClick={addUri}>ADD URI</button>
                </div>
                <div className='mt-4'>
                    {props.OriginURIs.map((uri,index)=>{
                        return <UriItem key={uri._id} uri={uri} type='origin'/>
                    })}
                </div>
            </form>
        )
}
const mapStateToProps = state=>({
    OriginURIs:state.project.OriginURIs,
    project_id:state.project._id
})

const mapDispatchToProps = dispatch =>({
    setOriginURIs:array=>dispatch(setOriginURIs(array))
})
export default connect(mapStateToProps,mapDispatchToProps)(OriginUri)