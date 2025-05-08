import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
function Navbar() {
  return (
   <div class="Nav">
   
       <Link class="navlink" to="/">App</Link>
       <Link class="navlink" to="/Home">Home</Link>
       <Link class="navlink" to="/Chat">Chat</Link>
  
   </div>
  )
}

export default Navbar