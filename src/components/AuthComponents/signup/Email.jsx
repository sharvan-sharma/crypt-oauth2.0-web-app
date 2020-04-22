import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import validation from  '../../../utils/validations/index'
import LinearProgress from '../../linearProgress'
import axios from 'axios'

function EmailForm(props){

    const email = React.useRef('')
    const [error,setError] = useState({
        email:{exist:0,message:''}
    })

    const [progress,setprogress] = useState(false)
    
    const disableButton = ()=>{
        if(error.email.exist !== 0){
            return true
        }else{
            return false
        }
    }

    const validate = ()=>{
        if(!validation.Required(email.current.value)){
            setError({...error,email:{exist:1,message:'Email is Required'}})
        }else if(!validation.ValidateEmail(email.current.value)){
            setError({...error,email:{exist:1,message:'Invalid Email Address'}})
        }else{
            setError({...error,email:{exist:0,message:''}})
        }
    }

    const submitForm = (e)=>{
        e.preventDefault()
        setprogress(true)
        if(error.email.exist === 1){
            setError({...error,email:{exist:1,message:'Clear All Errors Before Submission'}})
        }else{
            axios.post('/checkemail',{
                email:email.current.value
            }).then(res=>{
                setprogress(false)
                if(res.data.status === 422){
                    setError({...error,email:{exist:1,message:'User Already Registered with this Email'}})
                }else if(res.data.status === 500){
                    setError({...error,email:{exist:1,message:'Something Went Wrong at our End ,Please Try Again Later'}})
                }else if(res.data.status === 200){
                    props.setdata({...props.data,email:email.current.value})
                    props.next()
                }else if(res.data.status === 301){
                    setError({...error,email:{exist:1,message:'Email is blank'}})
                }
            }).catch(err=>{
                setprogress(false)
                setError({...error,email:{exist:1,message:'Something Went Wrong at our End ,Please Try Again Later'}})
            })
        }
      
    }
    return (
        <form className='col-12' onSubmit={submitForm}>
                <div className="form-group">
                    {(progress)?<LinearProgress />:<></>}
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" ref={email} onBlur={validate} defaultValue={props.data.email} id="email" placeholder="Email" required />
                    {(error.email.exist === 1)?<Alert variant="filled" className='my-1 py-0 fsm' severity="error">{error.email.message}</Alert>:<></>}
                </div>
                <div>
                    <Button disabled={props.activeStep === 0} onClick={props.back}>
                        Back
                    </Button>
                    <button className='btn btn-dark ml-2' type='submit' disabled={disableButton()}>
                        {props.activeStep === props.steps.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
        </form>
    )
}

export default EmailForm