import React ,{useState} from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import NameForm from './NameForm'
import EmailForm from './Email'
import UserNameForm from './username'
import PasswordForm from './Password'
import axios from 'axios'
import LinearProgress from '../../linearProgress'
import Alert from '@material-ui/lab/Alert';


function getSteps() {
  return ['Enter Your Name', 'Enter a Valid Email', 'Create a Username','Create a Secure Password'];
}

function getStepContent(stepIndex,back,next,steps,data,setdata) {
  switch (stepIndex) {
    case 0:
      return <NameForm steps={steps} data={data} setdata={setdata} activeStep={stepIndex} back={back} next={next} />;
    case 1:
      return <EmailForm steps={steps} data={data} setdata={setdata} activeStep={stepIndex} back={back} next={next} />;
    case 2:
      return <UserNameForm steps={steps} data={data} setdata={setdata} activeStep={stepIndex} back={back} next={next} />
    case 3:
      return <PasswordForm steps={steps} data={data} setdata={setdata} activeStep={stepIndex} back={back} next={next} />;
    default:
      return 'Unknown stepIndex';
  }
}


function HorizontalLabelPositionBelowStepper(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const [error,setError] = useState({exist:0,message:''})

  const [progress,setprogress] = React.useState(false)

  const [data,setdata] = React.useState({name:{},username:'',email:'',password:''})

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setdata({name:{},username:'',email:'',password:''})
    setActiveStep(0);
  };

  const submitSignUpForm=()=>{
    setprogress(true)
    axios.post('/register',{
      withCredentials:true,
      data:{...data,transaction_id:(props.transaction_id === undefined)?null:props.transaction_id }
    }).then(res=>{
      setprogress(false)
      if(res.data.status === 401){
        setError({...error,exist:1,message:'User Already Exists'})
      }else if(res.data.status === 200){
        props.Switch({flag:false,email:data.email})
      }else if(res.data.status === 500){
        setError({...error,exist:1,message:'Something Went wrong At our End,Please try again later'})
      }
    }).catch(err=>{
      setError({...error,exist:1,message:'Something Went wrong At our End,Please try again later'})
    })
  }

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className='d-flex flex-column align-items-center'>
        {activeStep === steps.length ? 
        (<>
            {(error.exist)?<Alert icon={false}  className='my-3 py-0 fsm' severity="error">{error.message}</Alert>:<></>}
            {(progress)?
            <div className='col-12 my-2'>
              <LinearProgress/>
            </div>:<></>}
            <p>All steps completed </p>
            <p className='d-flex justify-content-center'>
                <button className='btn btn-dark mr-2' type='button' disabled={progress} onClick={submitSignUpForm}>Sign up</button>
                <button className='btn btn-outline-dark' disabled={progress} onClick={handleReset}>Reset</button>
            </p>
        </>) : 
        (<>
            <div className='col-12'>{getStepContent(activeStep,handleBack,handleNext,steps,data,setdata)}</div>
        </>)}
      </div>
    </div>
  );
}



export default HorizontalLabelPositionBelowStepper