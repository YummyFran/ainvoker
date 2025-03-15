
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom'
import SignUp from '../pages/SignUp.tsx'
import Home from '../pages/Home.tsx'

const AppRoutes = () => {
  return (
    <>
        <HashRouter>
            <Routes>
                <Route path='/signup' element={<SignUp />} />
                <Route path='/' element={<Home />} />
            </Routes>
        </HashRouter>
    </>
  )
}

export default AppRoutes