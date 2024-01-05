import { useState } from "react"
import './Forms.css'
import BrandNameImg from './Img/BrandName.svg'

import { app } from './firebase.js'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function LogIn() {
    const [UserSignedIn, setUserSignedIn] = useState(false)
    const navigate = useNavigate();

    const auth = getAuth(app)
    onAuthStateChanged(auth, (user) => {
      if (user) {
          // User is signed in
          setUserSignedIn(true)
          // ...
      } else {
          // User is signed out
          setUserSignedIn(false)
      }
    });

    if (UserSignedIn) {
        return (
            navigate('/dashboard')
        )
    } else {
        return (
            <LogInForm/>
        )
    }
}

function LogInForm() {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const auth = getAuth(app)
        await signInWithEmailAndPassword(auth, Email, Password)
    } 

    return (
        <div className="FormContainer">
            <div className="FormSubContainer">
                <img alt="brandname" src={BrandNameImg}/>
                <form className="Form">
                    <h1>Log In</h1>
                    <input type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} value={Email} required/>
                    <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} value={Password} required/>
                    <button onClick={handleSubmit}>Submit</button>
                </form>
                <div className="LinkTo">
                    Don't have an account? <span onClick={() => navigate('/signup')}>Sign Up</span>
                </div>
            </div>
        </div>
    )
}