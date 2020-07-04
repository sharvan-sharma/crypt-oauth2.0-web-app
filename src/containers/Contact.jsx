import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade'
import axios from 'axios'
import isEmail from '../utils/validations/isEmail'
import Tooltip from '@material-ui/core/Tooltip'
import ErrorIcon from '@material-ui/icons/Error'
import Alert from '@material-ui/lab/Alert'
import CircularProgress from '@material-ui/core/CircularProgress'
import SendIcon from '@material-ui/icons/Send';
import {Link} from 'react-router-dom'

const validateName = (name)=>{
    if(name.length < 3 || name.includes(' ')){
        return false
    }else{
        return true
    }
}

function Contact(){

    const [state,setstate] = useState({
        error:{
            name:{exist:false,msg:''},
            email:{exist:false,msg:''},
            server:{exist:false,msg:''}
        },
        success:{exist:false,msg:''},
        name:'',
        email:'',
        message:{val:'',rem:500},
        progress:false
    })

    const submitForm = (e)=>{
        e.preventDefault()
        if(!isEmail(state.email)){
            setstate({...state,error:{...state.error,email:{exist:true,msg:'Invalid Email address'}}})
        }else if(!validateName(state.name.split(' ')[0])){
            setstate({...state,error:{...state.error,name:{exist:true,msg:'Name must contain atleast 3 characters without space in starting.'}}})
        }else{
            setstate({...state,progress:true})
            const data = {
                form_client_id:'5efc6a98b3b91100048c09bf-5f006259cb732e0004ccf541-1593860713161-inquiry-scuttle-form',
                inquiry:{
                    name:{
                        firstname:state.name.split(' ')[0],
                        middlename:'',
                        lastname:''
                    },
                    email:state.email,
                    message:state.message.val
                }
            }
            axios.post('https://inquiry-scuttle.herokuapp.com/clientapi/create/inquiry?form_type=csa',data)
            .then(result =>{
                switch(result.data.status){
                    case 200:{
                        setstate({
                            progress:false,
                            error:{
                               name:{exist:false,msg:''},
                                email:{exist:false,msg:''},
                                server:{exist:false,msg:''} 
                            },
                            success:{exist:true,msg:'Successfully recieved your message. We will get back to you as soon as We can.'},
                            message:{val:'',rem:500},
                            name:'',
                            email:''
                        });
                        break;
                    }
                    case 423:setstate({...state,progress:false,error:{...state.error,server:{exist:true,msg:`data validation error type: ${result.data.type}`}}});break
                    case 422:setstate({...state,progress:false,error:{...state.error,server:{exist:true,msg:`Page Under Maintenance`}}});break;
                    case 500:setstate({...state,progress:false,error:{...state.error,server:{exist:true,msg:'something went wrong at scuttle end.'}}});break;
                    default:console.log('contact page default exec')
                }
            }).catch(err=>{
                setstate({...state,progress:false,error:{...state.error,server:{exist:true,msg:'something went wrong at scuttle end.'}}})
            })
        }
    }

    const clearError = (type) => {
        switch(type){
            case 'name':setstate({...state,error:{...state.error,name:{exist:false,msg:''}}});break;
            case 'email':setstate({...state,error:{...state.error,email:{exist:false,msg:''}}});break;
            case 'server':setstate({...state,
                success:{exist:false,msg:''},
                error:{
                    name:{exist:false,msg:''},
                    email:{exist:false,msg:''},
                    server:{exist:false,msg:''}
                }
            });break;
            default : console.log('def exec')
        }
    }

    const handleMessageChange = (e)=>{
        const m = e.target.value
        if(m.length <= 500){
            if(m.length === 0 ){
                setstate({...state,message:{val:'',rem:500,open:false}})
            }else{
                setstate({...state,message:{val:m,rem:500-m.length,open:true}})
            }
        }
    }

return (
    <div className='d-flex justify-content-center align-items-center p-4' style={{minHeight:'100vh'}}>
        <Fade in={true} timeout={{enter:500,appear:500,exit:500}}>
        <div className = 'col-12 col-lg-8 col-md-10 col-xl-8 p-0 d-flex flex-wrap bg-black   shadow-lg rounded'>
            <div className='col-12 col-md-4 col-lg-6 d-flex justify-content-center align-items-center text-white'>
                <div  className='py-2'>
                    <div className='text-white'>
                        <Link className="text-white text-decoration-none" to="/">
                            <span className='fl'>
                                <b>C</b>
                                <span className='text-white-50'>ry</span>
                                <b>P</b>
                                <span className='text-white-50'>t</span>
                            </span>
                            <span className='text-muted fm'> OAuth2.0</span>
                        </Link>
                    </div>
                    <div className='mt-4 mb-2 fxl'><b>Contact Us.</b></div>
                    <div className='text-white mb-4 '>Let us know your thoughts about our services.</div>
                    <p className='py-2 text-white-50 fsm m-0 pc'>
                        Powered by  
                        <a href='https://inquiryscuttle.web.app' className='text-decoration-none text-white ml-2'>
                            <b>I</b>nquiry <b>S</b>cuttle
                        </a>
                    </p>
                </div>
            </div>
           <form onSubmit={submitForm} className='col-12 col-lg-6 col-md-8 bg-white p-4'>
               
            <div className='form-group my-4 d-flex align-items-center'>
                <TextField
                    size='small'
                    required
                    id="name"
                    label="Name"
                    placeholder='Enter Your Name'
                    variant="standard"
                    inputProps={{
                        minLength:3,
                        maxLength:20
                    }}
                     fullWidth
                     required
                     value={state.name}
                     onChange={(e)=>setstate({...state,name:e.target.value})}
                     onFocus={()=>clearError('name')}
                    />
                {
                    (state.error.name.exist)?
                    <Tooltip title={state.error.name.msg} arrow>
                        <ErrorIcon className='text-warning'/>
                    </Tooltip>:<></>
                }
            </div>
            <div className='form-group my-4 d-flex align-items-center'>
                <TextField
                    required
                    size='small'
                     fullWidth
                     inputProps={{
                         type:'email'
                     }}
                    id="email"
                    label="Email"
                    placeholder='Enter Your Email'
                    variant="standard"
                    required
                    value={state.email}
                     onChange={(e)=>setstate({...state,email:e.target.value})}
                     onFocus={()=>clearError('email')}
                    />
                {
                    (state.error.email.exist)?
                    <Tooltip title={state.error.email.msg} arrow>
                        <ErrorIcon className='text-warning'/>
                    </Tooltip>:<></>
                }
            </div>
            {
                (state.message.rem !== 500)?
                <p className='text-muted' style={{fontSize:'0.8rem'}}>Remaining Characters {state.message.rem}/500</p>
                :<></>
            }
            <div className='form-group my-4'>
                <TextField
                    fullWidth
                    required
                    id="mail"
                    size='small'
                    inputProps={{
                        maxLength:500
                    }}
                    label="Tell Us About It"
                    placeholder='Write your query here'
                    value={state.message.val}
                    onChange={handleMessageChange}
                    variant="standard"
                    rowsMax='6'
                    multiline
                    />
            </div>
            <div className='form-group my-4 d-flex justify-content-end'>
                {
                    (state.progress)?
                    <CircularProgress size={20}/>:
                    <div className='d-flex align-items-center'>
                        {(state.error.server.exist)?
                        <Tooltip arrow title = {state.error.msg}>
                            <ErrorIcon className='text-warning' />
                        </Tooltip>
                        :<></>
                        }
                        <button 
                        type='submit' 
                        onFocus={()=>clearError('server')}
                        disabled={state.progress} 
                        className = 'btn btn-dark'>
                           <SendIcon className='text-white'/> SEND
                        </button>
                    </div>
                }
            </div>
            {
                (state.success.exist)?
                <div className='form-group my-4'>
                    <Alert variant='outlined' type='success'>{state.success.msg}</Alert>
                </div>
                :<></>
            }
            <p className='py-2 text-muted fsm m-0 mbl'>
                        Powered by  
                <a href='https://inquiryscuttle.web.app' className='text-decoration-none text-dark ml-2'>
                    <b>I</b>nquiry <b>S</b>cuttle
                </a>
            </p>
        </form>
        </div>
     </Fade>
    </div>
)
}

export default Contact