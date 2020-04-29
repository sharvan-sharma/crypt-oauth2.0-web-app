import React,{useState,useRef,useEffect} from 'react'
import axios from 'axios'
import CircularProgress from '../components/circularProgress'
import Alert from '@material-ui/lab/Alert'
import history from '../history'
import {Link} from 'react-router-dom'
import BrandName  from '../components/LandingPageComponents/Nav/BrandName'
import Tooltip from '@material-ui/core/Tooltip';
import validation from '../utils/validations/index'
import utils from '../utils/index'
import { LinearProgress } from '@material-ui/core'
import {connect} from 'react-redux'
import {setCurrentUser} from '../redux/user/user.actions'

function ResetPassword(props){
    
    const [state,setstate] = useState({flag:0,component:()=><></>,username:null})

    const ServerError = ()=>{
        return (
            <Alert variant='filled' severity='error'>
                <p className='h4'>Something Went Wrong At Our End</p>
                <p>Please try again later</p>
            </Alert>
        )
    }


     const ExpireError = ()=>{
        return (
            <Alert variant='filled' severity='error'>
                <p className='h4'>Link has Expired</p>
                <p>You haven't verify Yourself in given TimeFrame.
                    You Have to signup again.if while signing up you got email or username already exists then 
                    try after an hour </p>
                <p><Link to='/signup' className='btn btn-warning rounded-pill'>Click Here To Signup again</Link></p>
            </Alert>
        )
    }

    const password = useRef('')
    const cnfpassword = useRef('')
    
    const [error,setError] = useState({
        password:{exist:0,message:''},
         page:{exist:0,message:''},
        cnfpassword:{exist:0,message:''}
    })

    const [progress,setprogress] = useState(false)

    const [meter,setmeter] = useState({
        exist:0,
        component:()=><></>
    })
    
    const checkMeter = ()=>{
        if(error.password.exist === 0){
                utils.CheckPasswordPower(password.current.value,(power)=>{
                switch(power){
                    case 2 : { setmeter({exist:1,component:()=><Alert icon={false}  className='my-3 py-0 fsm' severity="error">Password is weak</Alert>})
                              break;}
                    case 3 : { setmeter({exist:1,component:()=><Alert icon={false}  className='my-3 py-0 fsm' severity="warning">Password is Good</Alert>})
                              break;}
                    case 4 : { setmeter({exist:1,component:()=><Alert icon={false}  className='my-3 py-0 fsm' severity="info">Password is Strong</Alert>})
                              break;}
                    case 5 : { setmeter({exist:1,component:()=><Alert className='my-3 py-0 fsm' severity="success">Password is Secure</Alert>})
                              break;}
                    default : { setmeter({exist:0,component:()=><></>})
                                break;}
                }
               })
        }else{
            setmeter({exist:0,component:()=><></>})
        }
    }

    const validatePwd = ()=>{
        if(!validation.inRange(password.current.value,6,25)){
            setError({...error,password:{exist:1,message:'Password length must be range of 6 to 25'}})  
        }else{
            setError({...error,password:{exist:0,message:''}})
        }
    }

    const ValidateCnf = ()=>{
        if(!validation.Compare(password.current.value,cnfpassword.current.value)){
            setError({...error,cnfpassword:{exist:1,message:'Password fields are not Same'}}) 
        }else{
            setError({...error,cnfpassword:{exist:0,message:''}}) 
        }
    }
    useEffect(()=>{
        axios.post('/vpr',{
            withCredentials:true,
            token:props.token
        }).then(res=>{
            if(res.data.status === 500){
                setstate({...state,flag:1,component:()=><ServerError/>,username:null})
            }else if(res.data.status === 422){
                setstate({...state,flag:1,component:()=><ExpireError/>,username:null})
            }else if(res.data.status === 200){
                setstate({...state,flag:2,component:()=><></>,username:res.data.username})
            }
        })
        .catch(err=>{

        })
    },[])


    const submitForm =(e)=>{
        e.preventDefault()
        setprogress(true)
        axios.post('/changepassword',{
            withCredentials:true,
            username:state.username,
            new_password:cnfpassword.current.value
        })
        .then(res=>{
            if(res.data.status === 500){
                setError({...error,page:{exist:1,message:'something went wrong at our end,please try again later'}})  
            }else if(res.data.status === 200 ){
                props.setCurrentUser(res.data)
                history.push('/')
            }
        }).catch(err=>{
            setError({...error,page:{exist:1,message:'something went wrong at our end,please try again later'}})
        })
    }

    if(state.flag === 0){
       return (<div className='fullscreen d-flex justify-content-center align-items-center'>
            <div className='col-12 col-md-6 col-lg-4 col-xl-3 d-flex flex-column justify-content-center align-items-center'>
                <CircularProgress />
            </div>
        </div>)
    }else if(state.flag === 1){
        return (<div className='fullscreen d-flex justify-content-center align-items-center'>
            <div className='col-12 col-md-6 col-lg-4 col-xl-3 d-flex flex-column justify-content-center align-items-center'>
                {state.component()}
            </div>
        </div>)
    }else if(state.flag === 2){
        return (<div className='fullscreen d-flex justify-content-center align-items-center'>
                    <div className='col-12 col-md-6 col-lg-4 col-xl-3 border rounded border-dark d-flex flex-column justify-content-center align-items-center'>
                        <BrandName/>
                         <form className='col-12' onSubmit={submitForm}>
                             <div className="form-group my-2">
                                    Reset Password
                             </div>
                              <div className="form-group my-2">
                                    {(progress)?<LinearProgress />:<></>}
                             </div>
                             <div className="form-group my-2">
                             {(error.page.exist === 1)?<Alert variant="filled" className='my-1 py-0 fsm' severity="error">{error.page.message}</Alert>:<></>}
                           </div>
                            <Tooltip arrow title={
                                <div className='fm text-white'>
                                <p>Do's</p>
                                <ul>
                                    <li>Password must be 8 to 25 characters long</li>
                                    <li>It must contain UpperCase and LowerCase letters</li>
                                    <li>It also contain some special chharcters like @,./#$%^*()! etc</li>
                                    <li>It must have some Integers</li>
                                </ul>
                                <p>Don't</p>
                                <ul>
                                    <li>Never set password as Name of Person or Pet</li>
                                    <li>Never set Birthday's as Password</li>
                                    <li>Don't set passwords like qwerty,123456 etc </li>
                                </ul>
                                </div>
                            }>
                                <p className='fm text-info'>What Exactly is a Strong Password ?</p>
                            </Tooltip>
                            <div className="form-group">
                                {(meter.exist === 1)?meter.component():<></>}
                                <input type="password" className="form-control" onBlur={validatePwd} onChange={checkMeter}  ref={password} id="password" placeholder="Password" required />
                                {(error.password.exist === 1)?<Alert variant="filled" className='my-1 py-0 fsm' severity="error">{error.password.message}</Alert>:<></>}
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" onBlur={ValidateCnf} ref={cnfpassword} id="cnfpassword" placeholder="Confirm Password" required />
                                {(error.cnfpassword.exist === 1)?<Alert variant="filled" className='my-1 py-0 fsm' severity="error">{error.cnfpassword.message}</Alert>:<></>}
                            </div>
                             <div className="form-group d-flex">
                                    <button className='btn btn-outline-dark mr-2' type='button' disabled={progress} onClick={()=>history.push('/login')}>Cancel</button>
                                    <button className='btn btn-dark' disabled={progress} type='submit'>Submit</button>
                             </div>
                        </form>
                    </div>
                </div>)
    }
}

const mapDispatchToProps = dispatch =>({
    setCurrentUser:userObject=>dispatch(setCurrentUser(userObject))
})

export default connect(null,mapDispatchToProps)(ResetPassword);