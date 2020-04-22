import React ,{useRef,useState} from 'react';
import Button from '@material-ui/core/Button';
import validation from  '../../../utils/validations/index'
import Alert from '@material-ui/lab/Alert';

function NameForm(props){

    const firstname = useRef('')
    const middlename = useRef('')
    const lastname = useRef('')
    const [error,setError] = useState({
        firstname:{exist:0,message:''},
        middlename:{exist:0,message:''},
        lastname:{exist:0,message:''}
    })

    const validatefname = ()=>{
        if(!validation.Required(firstname.current.value)){
            setError({...error,firstname:{exist:1,message:'Firstname is Required'}})
        }else if(!validation.inRange(firstname.current.value,4,50)){
            setError({...error,firstname:{exist:1,message:'Name must be 4 to 50 Charaters long'}})
        }else if(validation.ContainsSpecialChars(firstname.current.value)){
            setError({...error,firstname:{exist:1,message:'Name must contain only alphabets and Integers'}})
        }else{
            setError({...error,firstname:{exist:0,message:''}})
        }
    }

    const validatemname = ()=>{
        if(validation.ContainsSpecialChars(middlename.current.value)){
             setError({...error,middlename:{exist:1,message:'Name must contain only alphabets and Integers'}})
        }else{
            setError({...error,middlename:{exist:0,message:''}})
        }
    }

    const validatelname = ()=>{
        if(validation.ContainsSpecialChars(lastname.current.value)){
             setError({...error,lastname:{exist:1,message:'Name must contain only alphabets and Integers'}})
        }else{
            setError({...error,lastname:{exist:0,message:''}})
        }
    }


    const disablebutton = ()=>{
        if(error.firstname.exist !==0 || error.middlename.exist !== 0 || error.lastname.exist !== 0){
            return true
        }else{
            return false
        }
    }


    const submitForm = (e)=>{
        const name = {
            firstname:firstname.current.value,
            middlename:middlename.current.value,
            lastname:lastname.current.value
        }
        props.setdata({...props.data,name})
        props.next()
        e.preventDefault()
    }

    return (
        <form className='col-12' onSubmit={submitForm}>
                <div className="form-group">
                    <input type="text" className="form-control" defaultValue={props.data.name.firstname || ''} ref={firstname} onBlur={validatefname} id="fname" placeholder="First Name" required/>
                    {(error.firstname.exist === 1)?<Alert variant="filled" className='my-1 py-0 fsm' severity="error">{error.firstname.message}</Alert>:<></>}
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" defaultValue={props.data.name.middlename || ''} ref={middlename} onBlur={validatemname} id="mname" placeholder="Middle Name" />
                    {(error.middlename.exist === 1)?<Alert variant="filled" className='my-1 py-0 fm' severity="error">{error.middlename.message}</Alert>:<></>}
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" defaultValue={props.data.name.lastname || ''} ref={lastname} id="lname" onBlur={validatelname} placeholder="Last Name" />
                    {(error.lastname.exist === 1)?<Alert variant="filled" className='my-1 py-0 fm' severity="error">{error.lastname.message}</Alert>:<></>}
                </div>
                <div className="form-group">
                    <Button disabled={props.activeStep === 0} onClick={props.back}>
                        Back
                    </Button>
                    <button className='btn btn-dark ml-2' type='submit' disabled={disablebutton()} >
                        {props.activeStep === props.steps.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
        </form>
    )
}

export default NameForm