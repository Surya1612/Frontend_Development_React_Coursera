import React from 'react'

 function Loader() {
  return (
    <div className='col-12 text-center'>
        <span className='fa fa-spinner fa-pulse fa-3x fa-fw text-primary' ></span>
        <p>Loading . . .</p>
    </div>
  )
}

export default Loader;
