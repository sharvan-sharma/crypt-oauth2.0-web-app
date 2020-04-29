import axios from 'axios'

function originServerCall(uri,cb){
    axios.post('/client/addorigin',{
        withCredentials:true,
        uri
    }).then(res=>cb(res.data,1))
    .catch(err=>cb(err,0))    
}

export default originServerCall