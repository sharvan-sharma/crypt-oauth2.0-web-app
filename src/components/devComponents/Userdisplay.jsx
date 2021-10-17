import React,{useState} from 'react';
import GrantedApps from './GrantedApps'
import Store from './Store'
import Fade from '@material-ui/core/Fade'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

function UserDisplay(){

const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
};

return (<div className='d-flex flex-column align-items-center' >
        <div className='user-display'>
                <Paper className="w-100"> 
                        <Tabs
                                value={value}
                                onChange={handleChange}
                        >
                        <Tab label="Store" style={{outline: 'none'}} />
                        <Tab label="Authorized Oauth Apps" style={{outline: 'none'}} />
                        </Tabs>
                </Paper>
                <div className='py-2 mb-5'>
                    {(value === 0)?
                    <Fade in={true}>
                            <Store />
                    </Fade>:
                    <Fade in={true}>
                            <GrantedApps />
                    </Fade>}
                </div>
        </div>
        </div>)
}

export default UserDisplay