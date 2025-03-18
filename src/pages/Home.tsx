import { Link } from "react-router-dom"
import { getAuth } from "firebase/auth"
import { logOut } from "../utils/auth"

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
        <Link to='/signup' className="bg-accentGrad px-8 py-4 rounded-lg m-4">Get Started</Link>
        {
          getAuth().currentUser ? (
            <button onClick={() =>logOut()} className="bg-red-300 px-4 py-2 rounded-md">Sign out</button>
          ) : ''
        }
    </div>
  )
}

export default Home