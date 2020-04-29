import React,{useState,useRef} from 'react';
import Divider from '@material-ui/core/Divider'
import history from '../../../history'
import LinearProgress from '../../linearProgress'
import Alert from '@material-ui/lab/Alert'

function NewProject(props){
    const appname = useRef('')

    const [error,setError] = useState({
        page:{exist:0,message:''},
        appname:{exist:0,message:''}
    })

    const [progress,setprogress] = useState(false)

    const validate = ()=>{
        if(appname.current.value.length < 3){
            if(appname.current.value.includes(' ')){
                setError({...error,appname:{exist:1,message:'Space is not allowed in appname'}})
            }else{
                setError({...error,appname:{exist:1,message:'App Name must contain atleast 3 characters'}})
            }
        }else{
            setError({...error,appname:{exist:0,message:''}})
        }
    }

    const submitForm = (e)=>{
        if(error.appname.exist === 0){
            props.setdata({...props.data,projectname:appname.current.value})
            props.next()
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
                    <label >Application Name</label>
                    <input type="text" className="form-control mb-2" ref={appname} onBlur={validate} id="projectname" placeholder="Enter Application Name" required/>
                     {(error.appname.exist === 1)?<Alert variant='filled' severity='error' >{error.appname.message}</Alert>:<></>}
                </div>
                <div className="form-group my-2">
                    <button type="submit" className="btn btn-dark"  disabled={progress}>
                            Create
                    </button>
                </div>
            </form>
    )
}

export default NewProject;