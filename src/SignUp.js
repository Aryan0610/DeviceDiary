import { useState } from "react"
import './Forms.css'
import BrandNameImg from './Img/BrandName.svg'

import { app } from './firebase.js'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [UserSignedIn, setUserSignedIn] = useState(false)
    const navigate = useNavigate();

    const auth = getAuth(app)
    onAuthStateChanged(auth, (user) => {
      if (user) {
          // User is signed in
          const uid = user.uid
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
            <SignUpForm/>
        )
    }
}

function SignUpForm() {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (Password === ConfirmPassword) {
            const auth = getAuth(app)
            await createUserWithEmailAndPassword(auth, Email, Password)
            navigate('/')
        }
    } 

    return (
        <div className="FormContainer">
            <div className="FormSubContainer">
                <img src={BrandNameImg}/>
                <h1>Sign Up</h1>
                <form className="Form">
                    <input type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} value={Email} required/>
                    <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} value={Password} required/>
                    <input type="password" placeholder="Confrim Password" onChange={(e) => {setConfirmPassword(e.target.value)}} value={ConfirmPassword} required/>
                    <button onClick={handleSubmit}>Submit</button>
                </form>
                <div>
                    Already have an account? <span onClick={() => navigate('/login')}>Log In</span>
                </div>
            </div>
        </div>
    )
}