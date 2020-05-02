import React,{useEffect,useState} from 'react'
import Divider from '@material-ui/core/Divider'
import axios from 'axios'
import CircularProgress from '../circularProgress'
import Alert from '@material-ui/lab/Alert'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCode} from '@fortawesome/free-solid-svg-icons'

function Application(props){
    return (
        <div className='col-12 col-lg-4 col-md-4 col-xl-4 p-2'>
            <div className=' border border-black rounded p-2 bg-dark text-white'>
                <FontAwesomeIcon icon={faCode} />
                <a className = 'btn btn-link h5 text-white' href={props.app.homepagelink}>{props.app.projectname}</a>
                <p className='fm text-break'>
                    {(props.app.description >= 50)?props.app.description.substring(0,50)+'...':props.app.description}
                </p>
            </div>
        </div>
    )
}

function Store(){

    const [state,setstate] = useState({flag:0,AppsArray:[]})

        useEffect(()=>{
            axios.get('/store/allclients',{withCredentials:true})
            .then(res=>{
                if(res.data.status === 500){
                    setstate({...state,flag:1})
                }else{
                    setstate({...state,flag:2,AppsArray:res.data.array})
                }
            }).catch(err=>{
                setstate({...state,flag:1})
            })
        },[])

        if(state.flag===0){
            return (<div className='d-flex justify-content-center align-items-center' style={{height:'30vh'}}>
                <CircularProgress/>
                </div>)
        }else if(state.flag ===1){
                return (<div>
                    <Alert severity='error'>ERROR While Loading Content</Alert>
                </div>)
        }else if(state.flag === 2){

        return (<>
            <p className='h4'>Applications Registered With CryPt</p>
            <Divider/>
            {(state.AppsArray.length === 0)?<Alert severity='info' className='mt-4'>No Application Registered Yet </Alert>:<></>}
            <div className='d-flex flex-wrap'>
                
            {
             state.AppsArray.map((app,index)=>{
                return <Application app={app} key = {index} />
             })   
            }
            </div>
        </>)
        }
}

export default Store