import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faChevronUp } from '@fortawesome/free-solid-svg-icons'
import history from '../../history'
import axios from 'axios'
import {connect} from 'react-redux'
import {setCurrentUser} from '../../redux/user/user.actions'
import CircularProgress from '../circularProgress'
import {ResetProject}  from '../../redux/project/project.actions'

function ProfileMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [progress,setprogress] = React.useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = ()=>{
    setprogress(true)
    axios.get('/logout',{
      withCredentials:true
    })
    .then(res=>{
      setprogress(false)
      if(res.data.status === 200){
        props.setCurrentUser({
          name:{
            fistname:null,
            lastname:null,
            middlename:null
          },
          username:null,
          email:null,
          logged_in:false
        })
        props.ResetProject()
        history.push('/')
      }
    })
    .catch(err=>{
       setprogress(false)
    })
  }

  const magic =(name)=>{
    return name.substring(0,1).toUpperCase()+name.substring(1).toLowerCase()
  }

  const beautifyname = (name)=>{
    const middlename = (name.middlename === (undefined || null ))?'':magic(name.middlename)+' '
    const fullname = magic(name.firstname)+' '+middlename+magic(name.lastname) 
    return (fullname.length >= 12)?fullname.substring(0,12)+'...':fullname
  }

  return (
    <div>
      <button className='btn btn-light rounded-circle' aria-controls="simple-menu" size='small' aria-haspopup="true" onClick={handleClick}>
        <FontAwesomeIcon icon={faUser} />
      </button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <FontAwesomeIcon icon={faChevronUp} />
        </MenuItem>
        <MenuItem><b>Welcome {beautifyname(props.user.name)}</b></MenuItem>
        <MenuItem><span className='fm'>CryPt Username : <strong>{props.user.username}</strong></span></MenuItem>
        <MenuItem >
                {(progress)?
                <div className='d-flex justify-content-center fm'><CircularProgress/></div>
                :<button onClick={logout}  className='btn btn-dark' disabled={progress}>Logout</button>}
        </MenuItem>
      </Menu>
    </div>
  );
}

const mapStateToProps = state=>({
  user:state.user
})

const mapDispatchToProps = dispatch=>({
setCurrentUser:userObject=>dispatch(setCurrentUser(userObject)),
ResetProject: ()=>dispatch(ResetProject())
})

export default connect(mapStateToProps,mapDispatchToProps)(ProfileMenu)