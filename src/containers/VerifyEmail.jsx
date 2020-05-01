import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import {setCurrentUser} from '../redux/user/user.actions'
import {setTransaction} from '../redux/transaction/transaction.actions'
import CircularProgress from '../components/circularProgress'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import history from '../history'
import {Link} from 'react-router-dom'

function VerifyEmail(props){
    const [state,setstate] = useState({flag:0,component:()=><></>})

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

    const UserDoesNotExist = ()=>{
        return (
            <Alert variant='filled' severity='error'>
                <p className='h4'>User DoesNot Exist</p>
                <p>This can happen because of Not verifying within Given Time,Please Register Again </p>
                <p><Link to='/signup' className='btn btn-warning'>Click here to Register</Link></p>
            </Alert>
        )
    }
    
    
    useEffect(()=>{
        if(props.token !== ''){
            console.log('verifyemail executed')
            axios.post('/vu',{
                withCredentials:true,
                token:props.token
            }).then(res=>{
                switch(res.data.status){
                    case 200 : {
                        if(res.data.transaction_id != null){
                            props.setCurrentUser(res.data)
                            props.setTransaction(res.data.transaction_id)
                            history.push(`/oauth/decision?transation_id=${res.data.transaction_id}`)
                        }else{
                            props.setCurrentUser(res.data)
                            history.push('/')
                        }
                                break;}
                    case 422 : {
                            setstate({...state,flag:1,component:()=><ExpireError />})
                            break;
                    }
                    case 500 :{
                        setstate({...state,flag:1,component:()=><ServerError/>})
                        break;
                    }
                    case 423 :{
                        setstate({...state,flag:1,component:()=><UserDoesNotExist/>})
                        break;
                    }
                    default:setstate({...state,flag:0,component:()=><></>})
                }
            })
            .catch(err=>{
                setstate({...state,flag:1,component:()=><ServerError/>})
            })
        }else{
            history.push('/')
        }
    },[])

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
    }

}

const mapDispatchToProps = dispatch=>({
setCurrentUser:userObject=>dispatch(setCurrentUser(userObject)),
setTransaction:transaction_id=>dispatch(setTransaction(transaction_id))
})

export default connect(null,mapDispatchToProps)(VerifyEmail)