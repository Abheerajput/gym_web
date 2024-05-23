import React from 'react'
import loading from '../assets/Infinity@1.25x-1.4s-200px-200px.gif'

const Loader = () => {
  return (
    <div style={{
      height:"100vh",
      width:"100vw" 
    }} >
      <p style={{justifyContent:'center', alignItems:'center'}}>
      <img  src={loading} alt='Loding...'></img>
      </p>

    </div>
  )
}

export default Loader 
