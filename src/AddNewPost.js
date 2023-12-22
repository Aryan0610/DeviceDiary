import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

import { app } from './firebase'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import TextareaAutosize from 'react-textarea-autosize';

import './AddNewPost.css'

export default function AddNewPost() {    
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
            <AddNewPostContainer/>
        )
    } else {
        navigate('/signup')
    }
}

function AddNewPostContainer() {
    const [ImgURL, setImgURL] = useState('')
    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')

    function SetNewImgURL(e) {
        var newURL = e.target.files
        setImgURL(newURL[0])
    }

    const AddPost = async () => {
        const auth = getAuth(app);
        const user = auth.currentUser;
        const UID = user.uid
    
        const db = getFirestore()
        const colRef = collection(db, 'Posts')
        const newDocRef = doc(colRef)
        await setDoc(newDocRef, {
            Title: Title,
            Description: Description,
            UID: UID,
            TimeStamp: serverTimestamp()
        })
    
        const storage = getStorage()
        const imgRef = ref(storage, `images/headerImages/${newDocRef.id}`)
        await uploadBytes(imgRef, ImgURL)
    
        const URL = await getDownloadURL(imgRef)
        const docRef = doc(db, 'Posts', newDocRef.id)
        await updateDoc(docRef, {
            Id: newDocRef.id,
            URL: URL
        })
    }

    return (
        <div className="AddPostContainer">
            <input type="file" onChange={(e) => SetNewImgURL(e)}/>
            <TextareaAutosize placeholder="Title" className="textarea" onChange={(e) => setTitle(e.target.value)} value={Title}/>
            <TextareaAutosize placeholder="Description" className="textarea" onChange={(e) => setDescription(e.target.value)} value={Description}/>
            <div className="ButtonContainer">
                <button onClick={() => AddPost()}>Add</button>
            </div>
        </div>
    )
}