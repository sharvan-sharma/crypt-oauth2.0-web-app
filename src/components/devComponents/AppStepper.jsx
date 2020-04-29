import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Divider from '@material-ui/core/Divider'
import AppNameForm from './Stepper/AppNameForm'
import ApplicationType from './Stepper/ApplicationType'
import Uri from './Stepper/Uri'
import Details from './Stepper/Details'


function getSteps() {
  return [ 'Select Application Type', 'Create Application Name','Add First JavaScript Origin','Add First Redirect Origin'];
}

function getStepContent(stepIndex,next,data,setdata) {
  switch (stepIndex) {
    case 0:
      return  <ApplicationType next={next} />;
    case 1:
      return <AppNameForm next={next}  data={data} setdata={setdata} />;
    case 2:
      return <Uri key='1' type='origin' data={data} setdata={setdata} next={next} />;
    case 3:
      return <Uri key='2' type='redirect' data={data} setdata={setdata} next={next} />;
    default:
      return 'Unknown stepIndex';
  }
}

export default function HorizontalLabelPositionBelowStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [data,setdata] = React.useState({})
 
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };




  return (
    <div  style={{marginTop:'10vh'}}>
        <p className='h6 p-2 mx-2 my-0'>New Application</p>
        <Divider/>
        <div className='overflow-scroll'>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            <div className='d-flex justify-content-center align-items-center col-12'>
                {activeStep === steps.length ? (
                 <Details data={data}/>
                ) : (
                <>{getStepContent(activeStep,handleNext,data,setdata)}</>
                )}
            </div>
        </div>
    </div>
  );
}
