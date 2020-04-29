import React,{useRef,useState} from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import validation from  '../../../utils/validations/index'
import utils from '../../../utils/index'

function PasswordForm(props){
    const password = useRef('')
    const cnfpassword = useRef('')
    
    const [error,setError] = useState({
        password:{exist:0,message:''},
        cnfpassword:{exist:0,message:''}
    })

    const [meter,setmeter] = useState({
        exist:0,
        component:()=><></>
    })
    
    const disableButton = ()=>{
        if(error.password.exist !== 0 || error.cnfpassword.exist !==0){
            return true
        }else{
            return false
        }
    }

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

    const submitForm = (e)=>{
        props.setdata({...props.data,password:cnfpassword.current.value})
        props.next()
        e.preventDefault()
    }

    return (
        <form className='col-12' onSubmit={submitForm}>
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
                <div className="form-group">
                   <Button disabled={props.activeStep === 0} onClick={props.back}>
                        Cancel
                    </Button>
                    <button className='btn btn-dark ml-2' type='submit' disabled={disableButton()} >
                        {props.activeStep === props.steps.length - 1 ? 'Finish' : 'Next'}
                    </button>
              </div>
        </form>
    )
}

export default PasswordForm