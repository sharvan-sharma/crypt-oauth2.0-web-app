import projectActionTypes from './project.types'

const INITIAL_STATE={
    _id:null,
    projectname:null,
    client_id:null,
    client_secret:null,
    created_at:null,
    RedirectURIs:[],
    OriginURIs:[],
    type:null
}

const projectReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case projectActionTypes.SET_CURRENT_PROJECT : return ({...action.payload})
        case projectActionTypes.SET_ORIGIN_URIS : return ({...state,OriginURIs:action.payload})
        case projectActionTypes.SET_REDIRECT_URIS :return ({...state,RedirectURIs:action.payload})
        case projectActionTypes.SET_APP_NAME: return ({...state,projectname:action.payload})
        case projectActionTypes.SET_SECRET: return ({...state,client_secret:action.payload})
        default : return state
    }
}

export default projectReducer