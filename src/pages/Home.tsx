import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
        <Link to='/signup' className="bg-accentGrad px-8 py-4 rounded-lg m-4">Get Started</Link>
    </div>
  )
}

export default Home