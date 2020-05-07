import React from 'react';
import axios from 'axios';
import Fade from '@material-ui/core/Fade';
import { useRef ,useState } from 'react';
import {connect} from 'react-redux'
import {setCurrentUser} from '../../../redux/user/user.actions'
import history from '../../../history'
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '../../linearProgress'

function LoginForm(props){

    const username = useRef('')
    const password = useRef('')

    const [progress,setprogress] = useState(false)

    const [error,setError] = useState({
        page:{exist:0,message:''},
        password:{exist:0,message:''}
    })

    function checkPassword(e){
        if(password.current.value.length >=6){
            setError({...error,password:{exist:0,message:''}})
        }else{
            setError({...error,password:{exist:1,message:'Invalid Password'}})
        }
    }

    function submitLoginForm(e){
         e.preventDefault()
        if(error.page.exist === 0 || error.password.exist === 0){
                setprogress(true)
                axios.post('/login',{
                    withCredentials:true,
                    username:username.current.value,
                    password:password.current.value
                }).then(res=>{
                    setprogress(false)
                    if(res.data.status === 200){
                        if(props.transaction_id !== undefined){
                            console.log('decsion with transcation')
                            props.setCurrentUser(res.data)
                            history.push(`/oauth/decision?transaction_id=${props.transaction_id}`)
                        }else {
                            console.log('decision without transcation')
                            props.setCurrentUser(res.data)
                            history.push('/')
                        }
                    }else if(res.data.status === 401){
                        console.log(res.data)
                        setError({...error,page:{exist:1,message:'Invalid Credentials'}})
                    }else if(res.data.status === 422){
                        setError({...error,page:{exist:1,message:'User Not Verified!'}})
                    }else{
                        setError({...error,page:{exist:1,message:'Something went Wrong on our End'}})
                    }
                }).catch(err=>{

                    setprogress(false)
                    setError({...error,page:{exist:1,message:'Something went Wrong on our End'}})
                })
        }else{
            setError({...error,page:{exist:1,message:'Please Clear all errors before Submiting'}})
        }
    }

    return (
        <Fade in={true}>
            <form className='col-12' onSubmit={submitLoginForm}>
                <div className="form-group" >
                    {(progress)?<LinearProgress />:<></>}
                </div>
                <p className='h3 my-4'>Log in to your account</p>
                <div className="form-group" >
                    {(error.page.exist === 1)?<Alert variant="filled" className='my-1 py-0 fsm' severity="error">{error.page.message}</Alert>:<></>}
                </div>
                <div className="form-group my-2">
                    <label >Username</label>
                    <input type="text" className="form-control" id="username" ref={username} aria-describedby="emailHelp" placeholder="Enter Username" required />
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" onBlur={checkPassword} id="password" ref={password} placeholder="Password" required/>
                    {(error.password.exist === 1)?<Alert variant="filled" className='my-1 py-0 fsm' severity="error">{error.password.message}</Alert>:<></>}
                    <button type='button' className='btn btn-link btn-sm p-0' onClick={()=>props.setflag(false)}>Forgot password ?</button>
                </div>
                <div className="form-group">
                   <button type="submit" className="btn btn-block btn-dark" disabled={progress}>Login</button>
                </div>
            </form>
        </Fade>
    )
}

// const mapStateToProps =state=>({
//     transaction_id:state.transaction.transaction_id
// })

const mapDispatchToProps = dispatch=>({
 setCurrentUser:userObject=>dispatch(setCurrentUser(userObject))
})

export default connect(null,mapDispatchToProps)(LoginForm)
