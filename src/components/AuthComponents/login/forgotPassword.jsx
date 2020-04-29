import React,{useRef,useState} from 'react'
import LinearProgress from '../../linearProgress'
import Fade from '@material-ui/core/Fade';
import Validation from '../../../utils/validations/index'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'

function ForgotPassword(props){

    const email = useRef('')

    const [Switch,setswitch] = useState(false)

    const [progress,setprogress] = useState(false)

    const [error,setError] = useState({exist:0,message:''})

    const validate = ()=>{
        if(!Validation.ValidateEmail(email.current.value)){
            setError({...error,exist:1,message:'Invalid Email Address'})
        }else{
            setError({...error,exist:0,message:''})
        }
    }

    const submitForm= (e)=>{
        e.preventDefault()
        if(error.exist === 0){
            setprogress(true)
            axios.post('/forgotpwd',{
                withCredentials:true,
                email:email.current.value
            }).then(res=>{
                setprogress(false)
                if(res.data.status === 422){
                    setError({...error,exist:1,message:'Email Not Registered with us'})
                }else if(res.data.status === 500){
                    setError({exist:1,message:'Something went wrong at our end please try again later'})
                }else if(res.data.status === 200){
                    setswitch(true)
                }else if(res.data.status === 423)(
                    setError({...error,exist:1,message:'Email Not verified yet'})
                )
            }).catch(err=>{
                setError({exist:1,message:'Something went wrong at our end please try again later'})
            })

        }else{
            setprogress(false)
            setError({...error,exist:1,message:'clear all errors'})
        }

    }

    return (
        <Fade in={true}>
            {(Switch)?
            <div className='col-12 my-4'>
                <Alert variant='filled' severity='info'>
                    <p className='h5'>Password Rest Link has been Sent to {email.current.value}</p>
                    <p>email with link to reset password has been sent to your email,
                        it is going to expire after 10 minutes<strong>-check it now!</strong>
                    </p>
                </Alert>
            </div>
            :<form className='col-12 my-4' onSubmit={submitForm}>
                    <div className="form-group">
                        {(progress)?<LinearProgress />:<></>}
                    </div>
                    <div className="form-group">
                        <p className='h3 my-4'>Enter Your Registered Email</p>
                    </div>
                    <div className="form-group my-2">
                        {(error.exist === 1)?<Alert variant='filled'  severity='error'>{error.message}</Alert>:<></>}
                    </div>
                    <div className="form-group my-2">
                        <input type="email" required className="form-control" ref={email} onBlur={validate} id="username" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group d-flex justify-content-start ">
                        <button type='Submit' className='btn btn-dark mr-2' disabled={progress}>Send Recovery Email</button>
                        <button type="button" className="btn btn-outline-dark" disabled={progress} onClick={()=>props.setflag(true)}>Cancel</button>
                    </div> 
            </form>
            }
         </Fade>
    )
}

export default ForgotPassword