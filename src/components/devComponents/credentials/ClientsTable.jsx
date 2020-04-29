import React,{useState,useEffect,useRef} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import ClientItem from './ClientItem'
import axios from 'axios'
import CircularProgress from '../../circularProgress'
import Alert from '@material-ui/lab/Alert'
import history from '../../../history'
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import DeleteIcon from '@material-ui/icons/Delete';
import Badge from '@material-ui/core/Badge'


function FirstAlert(){
    return (
            <Alert severity='info' className='col-12 my-2'>
                    <label className='my-auto'>
                    To Getting Start Register Your First App with us 
                    </label>
                    <button className='btn btn-light text-info ml-2' onClick={()=>{history.push('/devconsole/newproject')}}>Create Application</button>
            </Alert>
                  
    )
}

function ClientsTable(){

    const query = useRef('')

    const [data,setdata] = useState({ClientArray:[],flag:0,search:false})

    const [update,setupdate] = useState(true)

    useEffect(()=>{
        axios.get('/client/readallclients',{
            withCredentials:true
        }).then(res=>{
            if(res.data.status === 500){
                setdata({...data,flag:1})
            }else{
                setdata({...data,flag:2,ClientArray:res.data.array,search:false})
            } 
        }).catch(err=>{
            setdata({...data,flag:1})
        })
    },[update,])

    const checkSearch = ()=>{
        if(query.current.value.length%3 === 0){
            search()
        }
    }

    const search = ()=>{
        axios.post('/client/search',{
            withCredentials:true,
            query:query.current.value
        }).then(res=>{
            if(res.data.status === 500){
                setdata({...data,flag:1})
            }else{
                setdata({...data,flag:2,ClientArray:res.data.array,search:true})
            } 
        }).catch(err=>{
            setdata({...data,flag:1})
        })
    }

    if(data.flag === 0){
        return (<div className='d-flex col-12 justify-content-center align-items-center'  style={{height:'60vh'}}>
                    <CircularProgress />
                </div>)
    }else if(data.flag === 1){
        return (
            <Alert severity='error' >Something Went Wrong while loading data</Alert>
        )
    }else if(data.flag === 2){
           if(data.ClientArray.length === 0 && data.search === false){
                return <FirstAlert/>
           }else{
               return (<>
               <div className='d-flex justify-content-between flex-wrap py-2'>
                    <p className='h5 text-muted my-auto'>OAuth 2.0 Client IDs</p>
                    <p className='d-flex justify-content-start my-auto p-0 col-lg-8 col-12 '>
                        <input type='text' className='border-0 bg-light px-2 col-11 rounded-left' onChange={checkSearch} ref={query} placeholder='Enter Client Name'/>
                        <button className='btn btn-light rounded-right' onClick={search}>
                            <FontAwesomeIcon icon={faSearch}  size='sm'/>
                        </button>
                    </p>
                    <button className='btn btn-light my-1  text-muted fm  text-nowrap'>
                           <Badge badgeContent={4} color="error"><DeleteIcon fontSize='small' /></Badge>
                           <span className='mx-3'>DELETE</span>
                    </button>
                </div>
                {(data.search === true && data.ClientArray.length === 0)?
                <p className='h5 text-center col-12'>No Client Application Found</p>
                :<div className="table-responsive">
                        <table className="table fm ">
                            <thead className='bg-light'>
                                <tr>
                                <th scope="col">
                                    <Checkbox 
                                            className='p-0'
                                            size='small'
                                            color="default"
                                    />
                                </th>
                                <th scope="col" className='text-nowrap'>Name</th>
                                <th scope="col" className='text-nowrap'>Creation date</th>
                                <th scope="col">Type</th>
                                <th scope="col" className='text-nowrap' colSpan='2'>Client ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.ClientArray.map((client,index)=>{
                                    return <ClientItem key={client._id} project_id={client._id} client={client} setupdate={setupdate} update={update}/>
                                })}
                            </tbody>
                        </table>
                    </div>
                   }
                    </>)
                }
            }
}

export default ClientsTable