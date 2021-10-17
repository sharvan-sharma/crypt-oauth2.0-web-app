import React,{useEffect,useState} from 'react'
import axios from 'axios'
import CircularProgress from '../circularProgress'
import Alert from '@material-ui/lab/Alert'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCode} from '@fortawesome/free-solid-svg-icons'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

const Application = ({ app }) => {
    return (
        <Card className="bg-dark mx-2">
            <CardMedia component={()=> 
                <Box 
                    className="application-card-media" 
                    display="flex" 
                    justifyContent="center" 
                    color="white" 
                    alignItems="center">
                        <FontAwesomeIcon icon={faCode} size="2x" />
                </Box>
            }/>
            <CardContent className="text-white pt-0" >
                <Link 
                  variant="h6" 
                  target="_blank" 
                  rel="noopener" 
                  color="inherit" 
                  className="text-decoration-none"
                  href={app.homepagelink} 
                >
                    <span className="text-white">{app.projectname}</span>
                </Link>
                <Typography variant="subtitle2">
                    {app.description}
                </Typography>
            </CardContent>
        </Card>
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
            <p className='px-2 flg mt-2'>Popular Apps</p>
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