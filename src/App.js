import React , {useState,useEffect,Suspense} from 'react'
import {connect} from 'react-redux'
import {setCurrentUser} from './redux/user/user.actions'
import axios from 'axios'
import CircularProgress from './components/circularProgress'
import ServerError from './components/errorcomponents/serverError'
import {Route,Switch,Redirect} from 'react-router-dom'
import querystring from 'query-string'
import 'jquery/src/jquery'
import 'popper.js/dist/popper'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './styles/main.css'
const DevConsole = React.lazy(() => import('./containers/DevConsole'))
const Oauth = React.lazy(() => import('./containers/Oauth'))
const Contact = React.lazy(() => import('./containers/Contact'))
const Authenticate = React.lazy(() => import('./containers/Authenticate'))
const Page404 = React.lazy(()=>import('./components/Page404'))
const LandingPage = React.lazy(() => import('./containers/LandingPage'))
const VerifyEmail = React.lazy(() => import('./containers/VerifyEmail'))
const ResetPassword = React.lazy(() => import('./containers/ResetPassword'))
const Decision = React.lazy(()=>import('./containers/Decision'))


const CenterCircle = () => (
  <div className='d-flex justify-content-center align-items-center fullscreen'>
                    <CircularProgress/>
  </div>
)

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
              <CenterCircle/>
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
                      return (<Suspense fallback={<CenterCircle/>}>
                                <Oauth query={query} /> 
                              </Suspense>)
                    }
                    }}  />
                <Route exact path='/oauth/decision' component={(prop)=>{
                   const transaction_id = querystring.parse(prop.location.search).transaction_id
                   if(transaction_id !== undefined){
                      return (<Suspense fallback={<CenterCircle/>}>
                                <Decision transaction_id={transaction_id}/>
                              </Suspense>)
                    }else{
                      return <Redirect to='/' />
                    }
                  }} />
                <Route path='/' component={()=>(<Suspense fallback={<CenterCircle/>}><DevConsole/></Suspense>)} />
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
                      return (<Suspense fallback={<CenterCircle/>}>
                                <Oauth query={query} /> 
                              </Suspense>)
                    }
                    }} />
                 
                  <Route exact path='/' component={()=>(
                    <Suspense fallback={<CenterCircle/>}>
                      <LandingPage/>
                    </Suspense>)} />
                  <Route exact path='/login' component={(prop)=>{
                    const transaction_id = querystring.parse(prop.location.search).transaction_id
                    if(transaction_id !== undefined){
                      return (
                        <Suspense fallback={<CenterCircle/>}>
                          <Authenticate page='login' transaction_id={transaction_id} />
                        </Suspense>)
                    }else{
                      return (
                        <Suspense fallback={<CenterCircle/>}>
                          <Authenticate page='login' />
                        </Suspense>)
                    }
                    }} />

                  <Route exact path='/signup' component={()=>(
                    <Suspense fallback={<CenterCircle/>}>
                      <Authenticate page='signup' />
                    </Suspense>)} 
                  />
                  
                  <Route exact path='/resetpassword' component={(prop)=>{
                        const val = querystring.parse(prop.location.search)
                        const token = val.pt
                        return (
                         <Suspense fallback={<CenterCircle/>}>
                           <ResetPassword token = {token} />
                         </Suspense>)
                      }}/>
                  <Route path='/verifyemail' component={(prop)=>{
                        const val = querystring.parse(prop.location.search)
                        const token = val.vt
                        return (<Suspense fallback={<CenterCircle/>}>
                                  <VerifyEmail token = {token} />
                                </Suspense>)
                      }}/>
                  <Route exact path='/contact' component={()=>(
                    <Suspense fallback={<CenterCircle/>}>
                      <Contact/>
                    </Suspense>)} />
                  <Route component={()=>(
                    <Suspense fallback={<CenterCircle/>}>
                      <Page404/>
                    </Suspense>)} />
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