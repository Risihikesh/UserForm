
import React, { useState } from 'react'

import Home from "./components/Home"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create from './components/Create';
import Update from './components/Update';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/create' element={<Create/>}></Route>
      <Route path='/edit/:id' element={<Update/>}></Route>

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
