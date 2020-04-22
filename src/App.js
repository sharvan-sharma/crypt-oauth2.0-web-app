import React , {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {setCurrentUser} from './redux/user/user.actions'
import axios from 'axios'
import CircularProgress from './components/circularProgress'
import ServerError from './components/errorcomponents/serverError'
import Page404 from './components/Page404'
import LandingPage from './containers/LandingPage'
import Authenticate from './containers/Authenticate'
import {Route,Switch,Redirect} from 'react-router-dom'
import 'jquery/src/jquery'
import 'popper.js/dist/popper'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './styles/main.css'


function App(props) {
   const [screen,resetScreen] = useState({loading:true,error:false})

   useEffect(() => {
     console.log('axios call to check login,c=app')
     axios.get('/checklogin',{
       withCredentials:true
     })
     .then(res=>{
          console.log(res.data)
          if(res.data.logged_in){
              props.setCurrentUser(res.data)
              resetScreen({...screen,loading:false})
          }else{
            setTimeout(()=>{
            resetScreen({...screen,loading:false})
            },2000)
          }
     })
     .catch(err=>{
        resetScreen({loading:false,error:true})
     })
   },[])

  if (screen.loading) {
    console.log('loading,c=app')
    return (<>
              <div className='d-flex justify-content-center align-items-center fullscreen'>
                    <CircularProgress/>
              </div>
            </>)
  }else if (screen.error){
    console.log('error show server_error screen,c=app')
    return <ServerError/>
  } else {
    if (props.user.logged_in) {
      console.log('loggedin routes,c=app')
      return (<Switch>
                <Route exact path='/' component={()=>(<div>user home</div>)} />
                <Route >
                  <Redirect to='/' />
                </Route>
              </Switch>)
    } else {
      console.log('not loggedin routes,c=app')
      return (<Switch>
                  <Route exact path='/' component={LandingPage} />
                  <Route exact path='/login' component={()=><Authenticate page='login' />} />
                  <Route exact path='/signup' component={()=><Authenticate page='signup' />}/>
                  <Route component={Page404}/>
              </Switch>)
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: userObject => dispatch(setCurrentUser(userObject))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);