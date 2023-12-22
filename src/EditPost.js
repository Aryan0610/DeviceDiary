import { useParams } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getFirestore, collection, doc, updateDoc, getDocs, serverTimestamp, query, orderBy } from "firebase/firestore";

import BrandNameImg from './Img/BrandName.svg'
import { app } from './firebase'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import TextareaAutosize from 'react-textarea-autosize';

import './EditPost.css'

export default function EditPost() {
    const { postId } = useParams()
    
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
            <EditPostContainer Id={postId}/>
        )
    } else {
        navigate('/signup')
    }
}

function EditPostContainer({Id}) {
    const [ImgURL, setImgURL] = useState('')
    const [newImgURL, setNewImgURL] = useState('')
    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
  
    useEffect(() => {
        const getData = async () => {
            const db = await getFirestore();
            const colRef = await collection(db, 'Posts')
            const q = await query(colRef, orderBy('TimeStamp'))
            const querySnapshot = await getDocs(q)
    
            querySnapshot.docs.forEach((doc) => {
                if (doc.data().Id === Id) {
                    setImgURL(doc.data().URL)
                    setTitle(doc.data().Title)
                    setDescription(doc.data().Description)
                }
            });
        }
    
        getData()
    }, [])

    function SetNewImgURL(e) {
        var newURL = e.target.files
        setNewImgURL(newURL[0])
    }

    const UpdatePost = async () => {
        const db = getFirestore(app)
        const colRef = collection(db, 'Posts')
        const newDocRef = doc(colRef)

        const storage = getStorage()
        const imgRef = ref(storage, `images/headerImages/${Id}`)
        await deleteObject(imgRef)
    
        if (newImgURL !== '') {
            await uploadBytes(imgRef, newImgURL)
        }
    
        const URL = await getDownloadURL(imgRef)
        const docRef = doc(db, 'Posts', Id)

        await updateDoc(docRef, {
            Title: Title,
            Description: Description,
            URL: URL,
            TimeStamp: serverTimestamp()
        })
    }

    return (
        <div className="EditPostContainer">
            <div className="EditPostImgContainer">
                <img src={ImgURL}/>
            </div>
            <input type="file" onChange={(e) => SetNewImgURL(e)}/>
            <TextareaAutosize className="textarea" onChange={(e) => setTitle(e.target.value)} value={Title}/>
            <TextareaAutosize className="textarea" onChange={(e) => setDescription(e.target.value)} value={Description}/>
            <div className="ButtonContainer">
                <button onClick={() => UpdatePost()}>Update</button>
            </div>
        </div>
    )
}