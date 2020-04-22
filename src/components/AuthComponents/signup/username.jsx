import React ,{useRef,useState} from 'react';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import validation from  '../../../utils/validations/index'
import axios from 'axios'
import LinearProgress from '../../linearProgress'

function UsernameForm(props){
    const username = useRef('') 

    const [error,setError] = useState({
        username:{exist:0,message:''}
    })

    const [progress,setprogress] = useState(false)
    
    const disableButton = ()=>{
        if(error.username.exist !== 0){
            return true
        }else{
            return false
        }
    }

    const validate = ()=>{
        if(!validation.Required(username.current.value)){
            setError({...error,username:{exist:1,message:'Username is Required'}})
        }else if(!validation.ValidateUsername(username.current.value)){
            setError({...error,username:{exist:1,message:'Username only contains Alphabets , Integers and These Three Special Characters _,-,.'}})
        }else{
            setError({...error,username:{exist:0,message:''}})
        }
    }

    const submitForm = (e)=>{
        e.preventDefault()
        setprogress(true)
        if(error.username.exist === 1){
            setError({...error,username:{exist:1,message:'Clear All Errors Before Submission'}})
        }else{
            axios.post('/checkusername',{
                username:username.current.value
            }).then(res=>{
                setprogress(false)
                if(res.data.status === 422){
                    setError({...error,username:{exist:1,message:'User Already Registered with this Username'}})
                }else if(res.data.status === 500){
                    setError({...error,username:{exist:1,message:'Something Went Wrong at our End ,Please Try Again Later'}})
                }else if(res.data.status === 200){
                    props.setdata({...props.data,username:username.current.value})
                    props.next()
                }else if(res.data.status === 301){
                    setError({...error,username:{exist:1,message:'username is blank'}})
                }
            }).catch(err=>{
                setprogress(false)
                setError({...error,username:{exist:1,message:'Something Went Wrong at our End ,Please Try Again Later'}})
            })
        }
    }

    return (
        <form className='col-12' onSubmit={submitForm}>
                <div className="form-group">
                    {(progress)?<LinearProgress />:<></>}
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" defaultValue={props.data.username} onBlur={validate} ref={username} id="username" placeholder="Create Username" required />
                    {(error.username.exist === 1)?<Alert variant="filled" className='my-1 py-0 fsm' severity="error">{error.username.message}</Alert>:<></>}
                </div>
                <div className="form-group">
                    <Button disabled={props.activeStep === 0} onClick={props.back}>
                        Back
                    </Button>
                    <button className='btn btn-dark ml-2' type='submit' disabled={disableButton()} >
                        {props.activeStep === props.steps.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
        </form>
    )
}

export default UsernameForm