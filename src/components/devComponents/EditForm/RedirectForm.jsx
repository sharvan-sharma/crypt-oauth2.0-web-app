import React,{useRef,useState} from 'react';
import UriItem from './UriItem'
import {connect} from 'react-redux'
import LinearProgress from '../../linearProgress'
import axios from 'axios'
import {setRedirectURIs} from '../../../redux/project/project.actions'
import Alert from '@material-ui/lab/Alert'
function RedirectForm(props){

    const [flag,setflag] = useState(0)
    const uri = useRef('')

    const [progress,setprogress] = useState(false)

    const [error,setError] = useState({
        uri:{exist:0,message:''}
    })

    const addUri = ()=>{
        setprogress(true)
        axios.post('/client/addredirect',{
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
                props.setRedirectURIs(res.data.RedirectURIs)
                setflag((flag === 0)?1:0)
            }
        }).catch(err=>{
            setprogress(false)
            setError({...error,uri:{exist:1,message:'server_error'}})
        })
    }

return (
    <form className='my-4'>
                <label className='my-auto h4'>Authorized redirect URIs </label>
                <p className='text-muted fm my-4'>For use with requests from a browser</p>
                {(progress)?<LinearProgress />:<></>}
                {(error.uri.exist === 1)?<Alert severity='error' variant='filled' >{error.message}</Alert>:<></>}
                <div className='d-flex my-2'>
                    <input type="text" className="form-control" key={flag} ref={uri} id='appname' placeholder="Enter Redirect URI" />
                    <button type="submit" className="btn btn-dark mx-1 text-nowrap" disabled={progress} onClick={addUri}>ADD URI</button>
                </div>
                <div className='my-4'>
                    {props.RedirectURIs.map((uri,index)=>{
                        return <UriItem key={uri._id} uri={uri} type='redirect'/>
                    })}
                </div>
    </form>
)
}

const mapStateToProps = state=>({
    RedirectURIs:state.project.RedirectURIs,
    project_id:state.project._id
})

const mapDispatchToProps = dispatch =>({
    setRedirectURIs:array=>dispatch(setRedirectURIs(array))
})

export default connect(mapStateToProps,mapDispatchToProps)(RedirectForm)