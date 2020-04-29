import React from 'react'
import Alert from '@material-ui/lab/Alert'



function AppType(props){

     const submitForm = (e)=>{
        props.next()
        e.preventDefault()
    }

    return (
        <form  className='col-12 col-lg-4 col-md-6 m-4' onSubmit={submitForm}>
             <div className="form-group my-2 h5">
                 Select the Type of Application
             </div>
             <div className="form-group my-2">
                <Alert severity='info'>Currently We are Providing services for Server Side Applications</Alert>
             </div>
            <div className="form-check mt-4">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" readOnly checked />
                <label className="form-check-label" >
                    SSA (Server Side Application)
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" disabled />
                <label className="form-check-label" >
                    SPA (Single Page Aplication)
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" disabled/>
                <label className="form-check-label">
                    Android Application
                </label>
            </div>
            <div className="form-check mb-4">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" disabled/>
                <label className="form-check-label" >
                   iOS Application
                </label>
            </div>
            <div className="form-group my-2">
                <button type="submit" className="btn btn-dark"  >
                    Next
                </button>
            </div>
        </form>
    )
}

export default AppType;