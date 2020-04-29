import axios from 'axios'

function redirectServerCall(uri,cb){
    axios.post('/client/addredirect',{
        withCredentials:true,
        uri
    }).then(res=>cb(res.data,1))
    .catch(err=>cb(err,0))    
}

export default redirectServerCall