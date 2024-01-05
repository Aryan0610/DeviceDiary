import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

import { app } from './firebase'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import TextareaAutosize from 'react-textarea-autosize';

import BrandNameImg from './Img/BrandName.svg'
import DeleteSectionBtn from './Img/DeleteSectionBtn.svg'

import './AddNewPost.css'

export default function AddNewPost() {    
    const [UserSignedIn, setUserSignedIn] = useState(false)
    const [addNewSection, setAddNewSection] = useState([{SectionTitle: '', SectionDescription: ''}])

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
            <AddNewPostContainer addNewSection={addNewSection} setAddNewSection={setAddNewSection}/>
        )
    } else {
        navigate('/signup')
    }
}

function AddNewPostContainer({addNewSection, setAddNewSection}) {
    const navigate = useNavigate();

    const [Title, setTitle] = useState('')

    const AddPost = async () => {
        const auth = getAuth(app);
        const user = auth.currentUser;
        const UID = user.uid
    
        const db = getFirestore()
        const colRef = collection(db, 'Posts')
        const newDocRef = doc(colRef)
        await setDoc(newDocRef, {
            Title: Title,
            Description: JSON.stringify(addNewSection),
            UID: UID,
            TimeStamp: serverTimestamp()
        })
    
        const docRef = doc(db, 'Posts', newDocRef.id)
        await updateDoc(docRef, {
            Id: newDocRef.id
        })

        navigate('/')
    }

    async function handleSignOut() {
        const auth = getAuth(app)
        await signOut(auth)
    }

    return (
        <div className="AddPostContainer">
            <div className='HeaderContainer'>
                <div className='Header'>
                    <img alt="BrandName" src={BrandNameImg} onClick={() => navigate('/')}/>
                    <button onClick={handleSignOut}>Log Out</button>
                </div>
            </div>
            <div className="AddPostSubContainer">
                <TextareaAutosize placeholder="Blog Title" className="textarea BlogTitle" onChange={(e) => setTitle(e.target.value)} value={Title}/>
                <AddSectionDisplay addNewSection={addNewSection} setAddNewSection={setAddNewSection}/>
            </div>
            <button className="AddPostBtn" onClick={() => AddPost()}>Upload Blog</button>
        </div>
    )
}

const AddSectionDisplay = ({addNewSection, setAddNewSection}) => {
    function AddNewSectionFunc() {
        const updatedSections = [...addNewSection, { SectionTitle: '', SectionDescription: '' }]
        setAddNewSection(updatedSections)
    }

    function UpdateSectionTitle(index, value) {
        const temp = [...addNewSection];
        temp[index].SectionTitle = value;
        setAddNewSection(temp);
    }

    function UpdateSectionDescription(index, value) {
        const temp = [...addNewSection];
        temp[index].SectionDescription = value;
        setAddNewSection(temp);
    } 

    function DeleteSection(index) {
        const temp = [...addNewSection]
        temp.splice(index, 1)
        setAddNewSection(temp)
    }
      
    return (
        <div className="AddNewSectionContainer">
            {addNewSection.map((item, index) => (
                <div key={index} className="AddNewSectionElement">
                    <TextareaAutosize placeholder="Title" className="textarea addNewSectionTitle" value={item.SectionTitle} onChange={(e) => UpdateSectionTitle(index, e.target.value)}/>
                    <TextareaAutosize placeholder="Description" className="textarea addNewSectionDescription" value={item.SectionDescription} onChange={(e) => UpdateSectionDescription(index, e.target.value)}/>
                    <button className="DeleteSectionBtn" onClick={() => DeleteSection(index)}><img alt="Delete" src={DeleteSectionBtn}/></button>
                </div>
            ))}
            <button className="AddNewSectionButton" onClick={() => AddNewSectionFunc()}>
            Add New Section
            </button>
        </div>
    )
}