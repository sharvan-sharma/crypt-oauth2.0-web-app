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
import Fade from '@material-ui/core/Fade'


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

    const [progress,setprogress] = useState(false)
    const query = useRef('')

    const [data,setdata] = useState({ClientArray:[],flag:0,search:false,deletearray:[]})

    const [update,setupdate] = useState(true)

    const select=(id)=>{
        const arr = data.deletearray
        arr.push(id)
        setdata({...data,deletearray:arr})
    }

    const deselect = (id)=>{
        const arr =  data.deletearray.filter((e)=>{
            if(e !== id){
                return e
            }
        })
        setdata({...data,deletearray:arr})
    }

    const selectall=()=>{
        const arr = data.ClientArray.map(client=>client.client_id)
        setdata({...data,deletearray:arr})
    }

    const deselectall=()=>{
        setdata({...data,deletearray:[]})
        setupdate(!update)
    }

    const deletemultiple = ()=>{
        axios.post('/client/deletemultipleprojects',{
            withCredentials:true,
            array:data.deletearray
        }).then(res=>{
            if(res.data.status === 500){
                setdata({...data,flag:1})
            }else{
                setdata({...data,deletearray:[]})
                setupdate(!update)
            }
        }).catch(err=>{
            setdata({...data,flag:1})
        })
    }

    useEffect(()=>{
        axios.get('/client/readallclients',{
            withCredentials:true
        }).then(res=>{
            if(res.data.status === 500){
                setdata({...data,flag:1})
            }else{
                setdata({...data,flag:2,ClientArray:res.data.array,search:false,deletearray:[]})
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
        setprogress(true)
        axios.post('/client/search',{
            withCredentials:true,
            query:query.current.value
        }).then(res=>{
            setprogress(false)
            if(res.data.status === 500){
                setdata({...data,flag:1})
            }else{
                setdata({...data,flag:2,ClientArray:res.data.array,search:true,deletearray:[]})
            } 
        }).catch(err=>{
            setprogress(false)
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
                    {(data.deletearray.length >0)?<button className='btn btn-light my-1  text-muted fm  text-nowrap' onClick={deletemultiple}>
                           <Badge badgeContent={data.deletearray.length} color="error"><DeleteIcon fontSize='small' /></Badge>
                           <span className='mx-3'>DELETE</span>
                    </button>:<></>}
                </div>
                {(data.search === true && data.ClientArray.length === 0)?
                <p className='h5 text-center col-12'>No Client Application Found</p>
                :<div className="table-responsive">
                    {(progress)?
                        <div className='col-12 d-flex justify-content-center'>
                            <CircularProgress/>
                        </div>:
                        <Fade in={true}>
                        <table className="table fm ">
                            <thead className='bg-light'>
                                <tr>
                                <th scope="col">
                                    <Checkbox 
                                            className='p-0'
                                            size='small'
                                            color="default"
                                            checked={(data.deletearray.length === 0)?false:true}
                                            onChange={(e)=>(e.target.checked)?selectall():deselectall()}
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
                                    if(data.deletearray.includes(client.client_id)){
                                    return <ClientItem key={index} project_id={client._id}
                                                         client={client} setupdate={setupdate} 
                                                         update={update} select={select} check={true}
                                                         deselect={deselect}/>
                                                        }
                                    else{
                                       return <ClientItem key={index} project_id={client._id}
                                                         client={client} setupdate={setupdate} 
                                                         update={update} select={select} check={false}
                                                         deselect={deselect}/>
                                                         
                                    }
                                })}
                            </tbody>
                        </table>
                        </Fade>}
                    </div>
                   }
                    </>)
                }
            }
}

export default ClientsTable