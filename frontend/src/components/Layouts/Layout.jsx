import React from 'react'
import Header from '../Header/Header'
import Menuheader from '../Menuheader/Menuheader'

const Layout = (props) => {
  return (
    <>
      <Header/>
      <Menuheader/>
      {
        props.children
      }
    </>
  )
}

export default Layout
