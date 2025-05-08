import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Chat from './components/Chat'
import Footer from './components/Footer'

function App() {
 const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
   <Navbar/>
   <Routes>
   <Route path='/App' element={<App/>} />
   <Route path='/Home' element={<Home/>} />
   <Route path='/Chat' element={<Chat/>} />
   <Route path='/' element={ <>
    <div class="emty"></div>
    <div class="box">
      <h1>Well come my app</h1>
    </div> 
     </>} />
  </Routes>
    <Footer/>
  </BrowserRouter>
 
 
  
  )
}

export default App
