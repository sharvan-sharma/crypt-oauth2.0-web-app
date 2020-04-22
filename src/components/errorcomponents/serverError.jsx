import React from 'react'

function ServerError(){
    return (<div className='d-flex justify-content-center align-items-center fullscreen'>
                  <div className='col-10 col-lg-4 col-md-4 col-xl-4'>
                        <p><span><b>message</b></span><span>&#58;</span><span>&#123;</span></p>
                        <p><span>error</span><span>&#58;</span><span>server_error</span></p>
                        <p><span>error_description</span><span>&#58;</span><span>Something Went Wrong on our End</span></p>
                        <p><span>&#125;</span></p>
                  </div>
            </div>)
}

export default ServerError