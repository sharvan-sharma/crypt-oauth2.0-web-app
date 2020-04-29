import projectActionTypes from './project.types'

const setCurrentProject = (projectObj)=>({
    type:projectActionTypes.SET_CURRENT_PROJECT,
    payload:projectObj
})

const setRedirectURIs = (array)=>({
    type:projectActionTypes.SET_REDIRECT_URIS,
    payload:array
})

const setOriginURIs = (array)=>({
    type:projectActionTypes.SET_ORIGIN_URIS,
    payload:array
})
const setAppName = (name)=>({
    type:projectActionTypes.SET_APP_NAME,
    payload:name
})

const setSecret = (secret)=>({
    type:projectActionTypes.SET_SECRET,
    payload:secret
})

export {setCurrentProject,setOriginURIs,setRedirectURIs,setAppName,setSecret}