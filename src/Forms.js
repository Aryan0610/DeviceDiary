// import { useState } from "react"
// import './Forms.css'
// import BrandNameImg from './Img/BrandName.svg'

// import { app } from './firebase.js'
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// export default function Forms() {
//     const [LogInUser, setLogInUser] = useState(false)

//     if (LogInUser) {
//         return (
//             <LogInForm setLogInUser={setLogInUser}/>
//         )
//     } else {
//         return (
//             <SignUpForm setLogInUser={setLogInUser}/>
//         )
//     }
// }

// function LogInForm({setLogInUser}) {
//     const [Email, setEmail] = useState('')
//     const [Password, setPassword] = useState('')

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         const auth = getAuth(app)
//         await signInWithEmailAndPassword(auth, Email, Password)
//     } 

//     return (
//         <div className="FormContainer">
//             <div className="FormSubContainer">
//                 <img src={BrandNameImg}/>
//                 <h1>Log In</h1>
//                 <form className="Form">
//                     <input type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} value={Email} required/>
//                     <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} value={Password} required/>
//                     <button onClick={handleSubmit}>Submit</button>
//                 </form>
//                 <div>
//                     Don't have an account? <span onClick={() => setLogInUser(false)}>Sign Up</span>
//                 </div>
//             </div>
//         </div>
//     )
// }

// function SignUpForm({setLogInUser}) {
//     const [Email, setEmail] = useState('')
//     const [Password, setPassword] = useState('')
//     const [ConfirmPassword, setConfirmPassword] = useState('')

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         if (Password === ConfirmPassword) {
//             const auth = getAuth(app)
//             await createUserWithEmailAndPassword(auth, Email, Password)
//         }
//     } 

//     return (
//         <div className="FormContainer">
//             <div className="FormSubContainer">
//                 <img src={BrandNameImg}/>
//                 <form className="Form">
//                     <h1>Sign Up</h1>
//                     <input type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} value={Email} required/>
//                     <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} value={Password} required/>
//                     <input type="password" placeholder="Confrim Password" onChange={(e) => {setConfirmPassword(e.target.value)}} value={ConfirmPassword} required/>
//                     <button onClick={handleSubmit}>Submit</button>
//                 </form>
//                 <div>
//                     Already have an account? <span onClick={() => setLogInUser(true)}>Log In</span>
//                 </div>
//             </div>
//         </div>
//     )
// }