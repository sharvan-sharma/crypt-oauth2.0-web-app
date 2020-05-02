import React , {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {setCurrentUser} from './redux/user/user.actions'
import axios from 'axios'
import CircularProgress from './components/circularProgress'
import ServerError from './components/errorcomponents/serverError'
import Page404 from './components/Page404'
import LandingPage from './containers/LandingPage'
import Authenticate from './containers/Authenticate'
import VerifyEmail from './containers/VerifyEmail'
import ResetPassword from './containers/ResetPassword'
import DevConsole from './containers/DevConsole'
import Decision from './containers/Decision'
import Oauth from './containers/Oauth'
import {Route,Switch,Redirect} from 'react-router-dom'
import querystring from 'query-string'
import 'jquery/src/jquery'
import 'popper.js/dist/popper'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './styles/main.css'


function App(props) {
   const [screen,resetScreen] = useState({loading:true,error:false})

   useEffect(() => {
     axios.get('/checklogin',{
       withCredentials:true
     })
     .then(res=>{
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
    return (<>
              <div className='d-flex justify-content-center align-items-center fullscreen'>
                    <CircularProgress/>
              </div>
            </>)
  }else if (screen.error){
    return <ServerError/>
  } else {
    if (props.logged_in) {
      return (<Switch>
                <Route exact path='/oauth' component={(prop)=>{
                    const query = querystring.parse(prop.location.search)
                    if(query.client_id === undefined || query.redirect_uri === undefined){
                      return <Redirect to='/' />
                    }else{
                      return <Oauth query={query} /> 
                    }
                    }}  />
                <Route exact path='/oauth/decision' component={(prop)=>{
                   const transaction_id = querystring.parse(prop.location.search).transaction_id
                   if(transaction_id !== undefined){
                      return <Decision transaction_id={transaction_id}/>
                    }else{
                      return <Redirect to='/' />
                    }
                  }} />
                <Route path='/' component={DevConsole} />
                <Route >
                  <Redirect to='/' />
                </Route>
              </Switch>)
    } else {
      return (<Switch>
                  <Route exact path='/oauth' component={(prop)=>{
                    const query = querystring.parse(prop.location.search)
                    if(query.client_id === undefined || query.redirect_uri === undefined){
                      return <Redirect to='/' />
                    }else{
                      return <Oauth query={query} /> 
                    }
                    }} />
                 
                  <Route exact path='/' component={LandingPage} />
                  <Route exact path='/login' component={(prop)=>{
                    const transaction_id = querystring.parse(prop.location.search).transaction_id
                    if(transaction_id !== undefined){
                      return <Authenticate page='login' transaction_id={transaction_id} />
                    }else{
                      return <Authenticate page='login' />
                    }
                    }} />
                  <Route exact path='/signup' component={()=><Authenticate page='signup' />}/>
                  <Route exact path='/resetpassword' component={(prop)=>{
                        const val = querystring.parse(prop.location.search)
                        const token = val.pt
                        return <ResetPassword token = {token} />
                      }}/>/>
                  <Route path='/verifyemail' component={(prop)=>{
                        const val = querystring.parse(prop.location.search)
                        const token = val.vt
                        return <VerifyEmail token = {token} />
                      }}/>
                  <Route component={Page404}/>
              </Switch>)
    }
  }
}

const mapStateToProps = (state) => ({
  logged_in: state.user.logged_in,
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: userObject => dispatch(setCurrentUser(userObject)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);