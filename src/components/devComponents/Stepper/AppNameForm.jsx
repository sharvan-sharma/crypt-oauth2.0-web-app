import React,{useState,useRef} from 'react';
import Alert from '@material-ui/lab/Alert'
import validation from '../../../../src/utils/validations/index'

function NewProject(props){
    const appname = useRef('')
    const homepage =useRef('')
    const description = useRef('')

    const [error,setError] = useState({
        page:{exist:0,message:''},
        appname:{exist:0,message:''},
        homepage:{exist:0,message:''},
        desc:{value:'',rem:200}
    })


    const setdescription = ()=>{
        if(description.current.value.length <=200){
            setError({...error,desc:{value:description.current.value,rem:200-description.current.value.length}})
        }
    }

    const validateurl = ()=>{
        if(!validation.is_url(homepage.current.value)){
            setError({...error,homepage:{exist:1,message:'invalid url'}})
        }else{
           setError({...error,homepage:{exist:0,message:''}}) 
        }
    }

    const validate = ()=>{
        if(appname.current.value.length < 3){
            if(appname.current.value.includes(' ')){
                setError({...error,appname:{exist:1,message:'Space is not allowed in appname'}})
            }else{
                setError({...error,appname:{exist:1,message:'App Name must contain atleast 3 characters'}})
            }
        }else{
            setError({...error,appname:{exist:0,message:''}})
        }
    }

    const submitForm = (e)=>{
        if(error.appname.exist === 0 && error.homepage.exist === 0){
            props.setdata({...props.data
                        ,projectname:appname.current.value
                        ,homepagelink:homepage.current.value || ''
                        ,description:description.current.value || ''})
            props.next()
        }else{
            setError({...error,page:{exist:1,message:'please remove all error before submitting'}})
        }
        e.preventDefault()
    }

    return (
            <form className='col-12 col-lg-4 col-md-6 m-4' onSubmit={submitForm}>
                <div className="form-group my-2">
                </div>
                <div className="form-group my-2">
                    {(error.page.exist === 1)?<Alert variant='filled' severity='error' >{error.page.message}</Alert>:<></>}
                </div>
                <div className="form-group my-2">
                    <label >Application Name</label>
                    <input type="text" className="form-control mb-2" ref={appname} onBlur={validate} id="projectname" placeholder="Enter Application Name" required/>
                     {(error.appname.exist === 1)?<Alert variant='filled' severity='error' >{error.appname.message}</Alert>:<></>}
                </div>
                <div className="form-group my-2">
                    <label >Homepage  Link</label>
                    <input type="text" className="form-control mb-2" ref={homepage} onBlur={validateurl} id="projectname" placeholder="Enter Homepage Name" />
                     {(error.homepage.exist === 1)?<Alert variant='filled' severity='error' >{error.homepage.message}</Alert>:<></>}
                </div>
                 <div className="form-group my-2">
                    <label>Short Description<small className='text-muted'> character remaining {error.desc.rem}/200</small></label>
                    <input type="text" className="form-control mb-2" ref={description} onChange={setdescription} value={error.desc.value} id="projectname" placeholder="Write something about your app" />
                </div>
                <div className="form-group my-2">
                    <button type="submit" className="btn btn-dark" >
                            Create
                    </button>
                </div>
            </form>
    )
}

export default NewProject;