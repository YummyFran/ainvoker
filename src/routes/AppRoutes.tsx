
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from '../pages/SignUp.tsx'
import Home from '../pages/Home.tsx'

const AppRoutes = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/signup' element={<SignUp />} />
                <Route path='/' element={<Home />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default AppRoutes