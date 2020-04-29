import React,{useEffect,useState} from 'react';
import axios from 'axios'
import querystring from 'query-string'
import history from '../history'
import CircularProgress from '../components/circularProgress'
import {setTransaction} from '../redux/transaction/transaction.actions'
import {connect} from 'react-redux'


function Oauth(props){

    const [state,setstate] = useState({flag:0,logged_in:false,error:{}})
    useEffect(()=>{
        axios.post('/oauth/authorization',{
            withCredentials:true,
            query:props.query
        }).then(res=>{
        if(res.data.status === 500){
            setstate({flag:1,error:res.data})
        }else if(res.data.status === 401){
             setstate({flag:1,error:res.data})
        }else if(res.data.status === 422){
            const jsonObject={
                error:res.data.error,
                error_description:res.data.error_description,
                error_uri:res.data.error_uri
            }
            const queryString = querystring.stringify(jsonObject)
            const baseurl = props.query.redirect_uri+'?'+queryString
            history.push(baseurl)
        }else if(res.data.status === 200){
                window.addEventListener('message', event =>window.location = event.data, false);
            if(res.data.logged_in){
                window.open(`http://localhost:3000/oauth/decision?transaction_id=${res.data.transaction_id}`, 'Decision', 'width=400,height=600,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no')
            }else{
                window.open(`http://localhost:3000/login?transaction_id=${res.data.transaction_id}`, 'Authenticate', 'width=400,height=600,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no') 
            }   
        }
    }).catch(err=>{
        setstate({flag:1,error:{message:'server_error'}})
    })
},[])

if(state.flag === 0){
    return (<div className='fullscreen d-flex justify-content-center align-items-center'>
                <CircularProgress />
            </div>)
}else if(state.flag === 1){
   return (<div className='fullscreen d-flex justify-content-center align-items-center'>
                <p>{console.log(state.error)}</p>
           </div>)
}
}



// const mapDispatchToProps = dispatch=>({
//    setTransaction:transaction_id=>(dispatch(setTransaction(transaction_id))) 
// })

const mapStateToProps = state=>({
    logged_in:state.user.logged_in
})

export default connect(mapStateToProps)(Oauth)