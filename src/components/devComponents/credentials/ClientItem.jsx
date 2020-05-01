import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import history from '../../../history'
import axios from 'axios'

function ClientItem(props){

    const deleteapp = ()=>{
        axios.post('/client/deleteproject',{
            withCredentials:true,
            project_id:props.project_id
        }).then(res=>{
            if(res.data.status === 500){
                console.log('server_error')
            }else if(res.data.status === 401){
                console.log('client doesnot exist')
            }else if(res.data.status === 200){
                props.setupdate(!props.update)
            }
        }).catch(err=>{
            console.log(err)
        })
    }


    return (
    <tr>
        <td>
                <Checkbox
                    key={(props.update)?0:1}
                    className='p-0'
                    size='small'
                    color="default"
                    checked={props.check}
                    onChange={(e)=>{(e.target.checked)?props.select(props.client.client_id):props.deselect(props.client.client_id)}}
                />
        </td>
        <td>{props.client.projectname}</td>
        <td>{props.client.created_at}</td>
        <td>{props.client.type}</td>
        <td>{props.client.client_id}</td>                        
        <td className='d-flex flex-nowrap'>
            <IconButton size='small' className='mr-2' onClick={()=>history.push(`/devconsole/credentials/edit?project_id=${props.client._id}`)}>
                <EditIcon fontSize='small' />
            </IconButton>
            <IconButton size='small' onClick={deleteapp}>
                <DeleteIcon fontSize='small' />
            </IconButton>
        </td>
    </tr>
    )
}

export default ClientItem