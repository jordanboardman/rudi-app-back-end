import React from 'react'
import Navbar from '../Navbar'

const BaseLayout = () => {
  return (
    <>
    <Navbar />
    
    {props.children}
    </>
  )
}

export default BaseLayout