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
    if (props.logged_in) {
      console.log('loggedin routes,c=app')
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
                   console.log(transaction_id)
                   if(transaction_id !== undefined){
                      console.log('transaction_id is',transaction_id)
                      return <Decision transaction_id={transaction_id}/>
                    }else{
                      console.log('someone click oauth/decision without transaction_id')
                      return <Redirect to='/' />
                    }
                  }} />
                <Route path='/' component={DevConsole} />
                <Route >
                  <Redirect to='/' />
                </Route>
              </Switch>)
    } else {
      console.log('not loggedin routes,c=app')
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
                      console.log('login with transcation')
                      return <Authenticate page='login' transaction_id={transaction_id} />
                    }else{
                      console.log('login without transcation')
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