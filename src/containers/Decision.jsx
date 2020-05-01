import React,{useState,useEffect} from 'react';
import Brand from '../components/LandingPageComponents/Nav/BrandName'
import CircularProgress from '../components/circularProgress'
import axios from 'axios'
import querystring from 'query-string'
import LinearProgress from '../components/linearProgress'


function Descision(props){
    const [progress,setprogress] = useState(false)

    const [uri,seturi]=useState('')

const [state,setstate] =useState({flag:0,projectname:'',scope:''})

const decision = (decision)=>{
    setprogress(true)
    axios.post('/oauth/decision',{
        withCredentials:true,
        query:{
            transaction_id:props.transaction_id,
            decision
        }
    }).then(res=>{
        console.log(res.data)
         setprogress(false)
        if(res.data.status === 500){
            setstate({...state,flag:1})
        }else{
            const queryString = querystring.stringify(res.data)
            const baseurl = uri+'?'+queryString
            window.opener.postMessage(baseurl)
            window.close()
        }
    }).catch(err=>{
        setprogress(false)
        setstate({...state,flag:1})
    })
}

useEffect(()=>{
    axios.post('/oauth/getclient',{
        withCredentials:true,
        transaction_id:props.transaction_id
    }).then(res=>{
        if(res.data.status === 200){
            seturi(res.data.redirect_uri)
            setstate({...state,flag:2,scope:res.data.scope,projectname:res.data.projectname})
        }else{
            setstate({...state,flag:1})
        }
    }).catch(err=>{
        setstate({...state,flag:1})
    })
},[])


if(state.flag ===0){
    return (<div className='fullscreen d-flex justify-content-center align-items-center'>
        <CircularProgress />
    </div>)
}else if(state.flag ===1){
    return (
        <div className='fullscreen d-flex justify-content-center align-items-center'>
            <p>{`message:server_error or Invalid_transaction`}</p>
        </div>
    )
}else{
return (
    <div className='fullscreen d-flex justify-content-center align-items-center'>
        <div className='col-12 col-md-6 col-lg-4 col-xl-4 border border-dark'>
                {(progress)?<LinearProgress/>:<></>}
            <p className='p-4 my-4 text-center'><Brand /></p>
            <p className='text-center'><b>{state.projectname}</b> is seeking access for following scope:</p>
            <p className='d-flex justify-content-center'>
                    {state.scope.map((s,index)=>{return <span key={index}><b>{s}</b></span>})}
            </p>
            <p className='my-2 d-flex justify-content-center'>
               <button className='btn btn-success mr-2' disabled={progress} onClick={()=>{decision('allow')}}>Allow</button> 
               <button className='btn btn-outline-dark' disabled={progress} onClick={()=>{decision('deny')}}>Deny</button>   
            </p>    
        </div>
    </div>
)
}
}

// const mapStateToProps = state=>({
//     transaction_id:state.transaction.transaction_id
// })

// export default connect(mapStateToProps)(Descision)

export default Descision