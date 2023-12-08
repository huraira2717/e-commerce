import { useState } from 'react'
import Deshboard from './Components/Pages/Deshboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './/Components/Pages/Login'
// import Modal from './/Components/Header/Cards/app.modal'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index={'/'} element={<Login />} />
        <Route path='/Deshboard' element={<Deshboard /> } />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
