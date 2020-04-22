import React from 'react';

const CopyRight = ()=>{
    const Year = new Date().getFullYear()
    return (<>
    <span className='text-secondary'>&copy; {Year} | <b>C</b>ry<b>P</b>t</span>
    </>)
}

export default CopyRight