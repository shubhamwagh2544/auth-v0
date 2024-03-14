import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import SignIn from './pages/Signin'
import SignUp from './pages/Signup'
import Profile from './pages/Profile'
import Header from './components/Header'

function App() {

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
