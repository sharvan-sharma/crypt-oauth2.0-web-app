import React from 'react'
import {connect} from 'react-redux'

function ReadForm(props){

return (
     <div className='col-12 col-md-6 col-lg-6 my-4'>
                <div className='d-flex align-items-start border-bottom border-gray'>
                    <label className='col-3 h6'>Client ID</label>
                    <label className='col-9 fm text-break'>{props.project.client_id}</label>
                </div>
                <div className='d-flex align-items-start border-bottom border-gray'>
                    <label className='col-3 h6'>Client Secret</label>
                    <label className='col-9 fm text-break'>{props.project.client_secret}</label>
                </div>
                <div className='d-flex align-items-start border-bottom border-gray'>
                    <label className='col-3 h6'>Creation Date</label>
                    <label className='col-9 fm text-break'>{props.project.created_at}</label>
                </div>
            </div>
)
}

const mapStateToProps = state =>({
    project:state.project
})

export default connect(mapStateToProps)(ReadForm)