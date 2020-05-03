import React,{useState,useRef} from 'react';
import LinearProgress from '../../linearProgress'
import Alert from '@material-ui/lab/Alert'
import Validations from '../../../utils/validations/index'
import axios from 'axios'
import history from '../../../history'

function Uri(props){
    const uri = useRef('')

    const [error,setError] = useState({
        page:{exist:0,message:''},
        uri:{exist:0,message:''}
    })

    const [progress,setprogress] = useState(false)

    const validate = ()=>{
        if(!Validations.is_url(uri.current.value)){
            setError({...error,uri:{exist:1,message:'Invalid URI'}})
        }else{
            setError({...error,uri:{exist:0,message:''}})
        }
    }

    const submitForm = (e)=>{
        if(error.uri.exist === 0){
            if(props.type === 'origin'){
               props.setdata({...props.data,origin_uri:uri.current.value})
               props.next()
            }else{
                setprogress(true)
               const data = {...props.data,redirect_uri:uri.current.value,type:'ssa'}
                axios.post('/client/createproject',{
                    withCredentials:true,
                    ...data
                }).then(res=>{
                    if(res.data.status === 500){
                        setError({...error,page:{exist:1,message:'SERVER ERROR'}})
                         setprogress(false)
                    }else if(res.data.status === 422){
                        setError({...error,page:{exist:1,message:'App Already Exists'}})
                         setprogress(false)
                    }else if(res.data.status === 200){
                        axios.post('/client/generatecredentials',{
                            withCredentials:true,
                            project_id:res.data.id
                        }).then(res2=>{
                             setprogress(false)
                            if(res2.data.status === 500){
                                setError({...error,page:{exist:1,message:'SERVER ERROR'}})
                            }else  if(res2.data.status === 422){
                                setError({...error,page:{exist:1,message:'URIs are not specified'}})
                            }else if(res2.data.status === 401){
                                setError({...error,page:{exist:1,message:'Client APP Error'}})
                            }else if(res2.data.status === 200){
                                props.setdata({...res2.data})
                                props.next()
                            }
                        }).catch(err2=>{
                             setprogress(false)
                             setError({...error,page:{exist:1,message:'SERVER ERROR'}})
                        })
                    }
                }).catch(err=>{
                    setError({...error,page:{exist:1,message:'SERVER ERROR'}})
                })
            }
        }else{
            setError({...error,page:{exist:1,message:'please remove all error before submitting'}})
        }
        e.preventDefault()
    }

    return (
            <form className='col-12 col-lg-4 col-md-6 m-4' onSubmit={submitForm}>
                <div className="form-group my-2">
                    {(progress)?<LinearProgress/>:<></>}
                </div>
                <div className="form-group my-2">
                    {(error.page.exist === 1)?<Alert variant='filled' severity='error' >{error.page.message}</Alert>:<></>}
                </div>
                <div className="form-group my-2">
                     <label className='h4'>Enter Authorized {(props.type === 'origin')?'JavaScript origins':'Redirect'} URI</label>
                    {(props.type === 'origin')?
                    <p className='fm text-muted'>{`For use with requests from a browser. This is
                                                    the origin URI of the client application. 
                                                    If you're using a nonstandard port, you must include
                                                    it in the origin URI.`}</p>
                    :<p className='fm text-muted'>{`For use with requests from a web server. 
                                                    This is the path in your application that 
                                                    users are redirected to after they have authenticated
                                                     with CryPt. The path will be appended with the authorization 
                                                     code for access. Must have a protocol. Cannot contain URL 
                                                     fragments or relative paths. Cannot be a public IP address.`}</p>}
                    <input type="text" className="form-control mb-2" ref={uri} onBlur={validate} id="projectname" placeholder="Enter Uri" required/>
                     {(error.uri.exist === 1)?<Alert variant='filled' severity='error' >{error.uri.message}</Alert>:<></>}
                </div>
                <div className="form-group my-2">
                    <button type="submit" className="btn btn-dark"  disabled={progress}>
                            Add URI
                    </button>
                    {(props.type !== 'origin')?<button type="button" className="btn btn-outline-dark ml-2" onClick={()=>history.push('/devconsole/newproject')}  disabled={progress}>
                            Reset
                    </button>:<></>}
                </div>
            </form>
    )
}

export default Uri