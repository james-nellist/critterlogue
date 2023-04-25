import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './components/Home.js'
import CreatePost from './components/pages/CreateAnimal'
import CreateSighting from './components/pages/CreateSighting.js'
import Register from './components/auth/Register.js'
import PageNavbar from './components/common/PageNavBar.js'
import PageNotFound from './components/common/PageNotFound.js'
import SingleAnimal from './components/pages/SingleAnimal.js'
import Login from './components/auth/Login.js'

const App = () => {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/animals/') // * <-- replace with your endpoint
      console.log(data)
    }
    getData()
  })

  return (
    <div className='main-container'>
      <BrowserRouter>
        <PageNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animals/:id" element={<SingleAnimal />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/animals" element={<CreatePost />} />
          <Route path="/animals/:id/sightings" element={<CreateSighting />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
