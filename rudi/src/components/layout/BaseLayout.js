import React from 'react'
import Navbar from '../Navbar'

const BaseLayout = (props) => {
  return (
    <>
    <Navbar />
    
    {props.children}
    </>
  )
}

export default BaseLayout