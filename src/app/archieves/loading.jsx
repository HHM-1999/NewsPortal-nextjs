import React from 'react'
import Loading from '../../assets/media/common/loading.gif'

const loading = () => {
  return (
    <div className='loader-section'>
        <img src={Loading} alt="Loading" title="Loading ....."  />
    </div>
  )
}

export default loading