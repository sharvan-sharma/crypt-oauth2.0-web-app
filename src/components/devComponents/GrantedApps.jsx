import React,{useEffect,useState} from 'react';
import Divider from '@material-ui/core/Divider'
import CircularProgress from '../circularProgress'
import ApplicationItem from './grantedapps/ApplicationItems'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'

function GrantedApps(){

    const [state,setstate] = useState({flag:0,apps:[]})
    const [c,setc] = useState(true)

    useEffect(()=>{
        axios.get('/readapprovedclients',{
            withCredentials:true
        }).then(res=>{
            if(res.data.status === 200){
                setstate({...state,flag:2,apps:res.data.array})
            }else{
                setstate({...state,flag:1,apps:[]})
            }
        }).catch(err=>{
            setstate({...state,flag:1,apps:[]})
        })
    },[c,])

    if(state.flag === 0){
        return (<div className='col-12 d-flex justify-content-center align-items-center' style={{height:'60vh'}}>
                <CircularProgress />
        </div>)
    }else if(state.flag === 1){
        return (<div className='col-12 d-flex justify-content-center align-items-center' style={{height:'60vh'}}>
                <p>{`message:{error:'server_error'}`}</p>
        </div>)
    }else if(state.flag === 2){
        return (
            <div className='d-flex justify-content-center overflow-scroll' style={{marginTop:'15vh',height:'70vh'}}>
                <div className='col-12 col-md-6 col-lg-6 col-xl-6 d-flex flex-column'>
                    <p className='h4'>Access Granted Applications</p>
                    <Divider/>
                    {(state.apps.length === 0)?
                    <Alert severity='info' className='my-4'>You haven't given access to Any Registered CryPt Application</Alert>:
                    <></>}
                    {
                        state.apps.map((app,index)=>{
                            return <ApplicationItem app={app} key={index} setc={setc} c={c} />
                        })
                    }
                </div>
            </div>
        )
    }
}

export default GrantedApps