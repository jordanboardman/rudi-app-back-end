import React from 'react'
import {Link} from 'react-router-dom'
import {AppBar, Toolbar, Typography} from '@mui/material'

const Navbar = () => {
  return (
    <AppBar
        position="static"
    >
        <Toolbar>
            <Typography>
                <Link to="/">Rudi</Link>
            </Typography>

            <Typography>
                <Link to="/about">About</Link>
            </Typography>

            <Typography>
                <Link to="/students">Students</Link>
            </Typography>

            <Typography>
                <Link to="/teachers">Teachers</Link>
            </Typography>
        </Toolbar>

    </AppBar>
  )
}

export default Navbar