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

const setHomepage = (homepage)=>({
    type:projectActionTypes.SET_HOMEPAGE,
    payload:homepage
})

const setDescription = (description)=>({
    type:projectActionTypes.SET_DESCRIPTION,
    payload:description
})

const ResetProject = ()=>({
    type:projectActionTypes.RESET_PROJECT,
    payload:{}
})

export {setCurrentProject,setOriginURIs,setRedirectURIs,setAppName,setSecret,setHomepage,setDescription,ResetProject}