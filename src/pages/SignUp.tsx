import { Link, useNavigate } from "react-router-dom"
import { IoArrowBackOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { signInWithGoogle, signUp } from "../utils/auth";
import { CredentialsType, FirebaseAuthErrorCode, FirebaseErrorLookup } from "../types/auth";

const capitalize = (str: string | undefined) => str && str.charAt(0).toUpperCase() + str.slice(1);

const SignUp = () => {
  const [credentials, setCredentials] = useState<CredentialsType>({
    name: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState<FirebaseAuthErrorCode>({
    name: null,
    email: null,
    password: null,
  })
  const [signUpButton, setSignUpButton] = useState({
    disabled: true,
    innerText: "Sign up"
  })
  const navigate = useNavigate()

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement> )=> {
    e.preventDefault()

    setSignUpButton(prev => ({...prev, disabled: true, innerText: "Signing up..."}))

    if(credentials.name?.trim() == "" || !credentials.email || !credentials.password) {
      if(credentials.name?.trim() == "") {
        setError(prev => ({...prev, name: 'Display name is required'}))
      }

      if(!credentials.email) {
        setError(prev => ({...prev, email: 'Email is required'}))
      }

      if(!credentials.password) {
        setError(prev => ({...prev, password: 'Password is required'}))
      }

      setSignUpButton(prev => ({...prev, disabled: false, innerText: "Sign up"}))
      return
    }

    const [, err] = await signUp(credentials.email, credentials.password, credentials.name!)

    if(err) {
      if (err.code! in FirebaseErrorLookup.email || err.code! in FirebaseErrorLookup.general) {
        setError(prev => ({...prev, email:  err.code}))
      }

      if (err.code! in FirebaseErrorLookup.password) {
        setError(prev => ({...prev, password: err.code}))
      }

      setSignUpButton(prev => ({...prev, disabled: false, innerText: "Sign up"}))
      return
    }

    navigate("/")
  }

  const handleGoogleSignIn = async () => {
    const [, err] = await signInWithGoogle()

    if(err) {
      return alert("Error signing in")
    }

    navigate('/')
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setError(prev => ({...prev, [e.target.name]: null}))
    setCredentials(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  useEffect(() => {
    setSignUpButton(prev => ({...prev, disabled: Object.values(credentials).some(el => !el)}))
  }, [credentials]);
  
  return (
    <div className="w-full min-h-screen flex justify-center md:justify-start bg-white">
      <form className="w-96 flex flex-col gap-3 mx-12 my-4" onSubmit={e => handleSubmit(e)}>
        <Link to='/' className="mb-4 text-gray-500 text-sm cursor-pointer flex items-center hover:underline w-fit">
          <IoArrowBackOutline className="mr-2"/>
          Back to Home
        </Link>
        <h1 className="text-2xl font-bold text-left pb-4 text-gray-800">Create your account</h1>

        <div className="flex flex-col space-y-2">
          <button type="button" onClick={() => handleGoogleSignIn()}
            className="flex items-center justify-center w-full px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-100">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 mr-2" />
            Sign up with Google
          </button>
          <button type="button" className="flex items-center justify-center w-full px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5 text-gray-900 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.58 2 12.29c0 4.52 2.87 8.37 6.84 9.73.5.1.66-.22.66-.48 0-.24-.01-1.04-.01-1.88-2.48.55-3.01-1.06-3.01-1.06-.45-1.16-1.1-1.47-1.1-1.47-.9-.63.07-.62.07-.62 1 .07 1.52 1.03 1.52 1.03.88 1.57 2.3 1.12 2.86.85.09-.65.34-1.12.62-1.37-1.98-.23-4.06-1-4.06-4.45 0-.98.35-1.78.92-2.41-.09-.23-.4-1.17.09-2.43 0 0 .75-.24 2.46.92a8.44 8.44 0 0 1 2.24-.31c.76 0 1.53.11 2.24.31 1.7-1.16 2.46-.92 2.46-.92.49 1.26.18 2.2.09 2.43.57.63.92 1.43.92 2.41 0 3.47-2.08 4.22-4.06 4.45.35.3.66.89.66 1.8 0 1.3-.01 2.34-.01 2.66 0 .26.16.58.66.48 3.98-1.36 6.84-5.21 6.84-9.73C22 6.58 17.52 2 12 2Z"/>
            </svg>
            Sign up with GitHub
          </button>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">OR</span>
          </div>
        </div>
        
        <div className={`rounded-lg overflow-hidden ${error.name ? 'bg-red-100' : 'bg-light'}`}>   
            {error.name ? 
              <label htmlFor="name" className="block cursor-text px-4 pt-2 text-xs font-medium text-red-500">
                {capitalize(error.name)}
              </label>
            :
              <label htmlFor="name" className="block cursor-text px-4 pt-2 text-xs font-medium text-gray-800">
                Name
              </label>
            }
          <input value={credentials.name} onChange={e => handleChange(e)} type="text" name="name" id="name" placeholder="Enter your name" 
            className={`w-full px-4 pb-2 outline-none text-base bg-transparent ${error.name ? 'text-red-500 autofill-error' : 'text-gray-700 autofill-light'}`}/>
        </div>
        <div className={`rounded-lg overflow-hidden ${error.email ? 'bg-red-100' : 'bg-light'}`}>   
            {error.email ? 
              <label htmlFor="email" className="block cursor-text px-4 pt-2 text-xs font-medium text-red-500">
                {capitalize(error.email?.slice('auth/'.length).split("-").join(" "))}
              </label>
            :
              <label htmlFor="email" className="block cursor-text px-4 pt-2 text-xs font-medium text-gray-800">
                Email
              </label>
            }
          <input value={credentials.email} onChange={e => handleChange(e)} type="email" name="email" id="email" placeholder="Enter your email" 
            className={`w-full px-4 pb-2 outline-none text-base autofill-${error.email ? 'error' : 'light'} bg-transparent ${error.email ? 'text-red-500' : 'text-gray-700'}`}/>
        </div>
        <div className={`rounded-lg overflow-hidden ${error.password ? 'bg-red-100' : 'bg-light'}`}>   
            {error.password ? 
              <label htmlFor="password" className="block cursor-text px-4 pt-2 text-xs font-medium text-red-500">
                {capitalize(error.password?.slice('auth/'.length).split("-").join(" "))}
              </label>
            :
              <label htmlFor="password" className="block cursor-text px-4 pt-2 text-xs font-medium text-gray-800">
                Password
              </label>
            }
          <input value={credentials.password} onChange={e => handleChange(e)} type="password" name="password" id="password" placeholder="Create your password" 
            className={`w-full px-4 pb-2 outline-none text-base bg-transparent ${error.password ? 'text-red-500' : 'text-gray-700'}`}/>
        </div>
        <button disabled={signUpButton.disabled} type="submit" className="bg-accentGrad mt-4 text-white py-3 rounded-lg font-medium hover:brightness-95 disabled:opacity-50">
          {signUpButton.innerText}
        </button> 
      </form>
      <div className="flex-1 min-h-screen bg-accentGrad hidden md:block"></div>
    </div>
  )
}

export default SignUp