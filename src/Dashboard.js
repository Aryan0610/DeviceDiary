import './Dashboard.css'

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, doc, deleteDoc, getDocs, query, orderBy } from "firebase/firestore";

import BrandNameImg from './Img/BrandName.svg'
import { app } from './firebase'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
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
            navigate('/signup')
        }
    });

    if (UserSignedIn) {
        return (
            <DashboardAfterSignIn/>
        )
    }
}

function DashboardAfterSignIn() {
    const [MyPosts, setMyPosts] = useState([])

    const navigate = useNavigate()

    const auth = getAuth(app);
    const user = auth.currentUser;
    const UID = user.uid

    useEffect(() => {
        const fetchData = async () => {
        const db = getFirestore();
        const colRef = collection(db, 'Posts')
        const q = query(colRef, orderBy('TimeStamp'))
        const querySnapshot = await getDocs(q)
  
        const fetchedData = [];
        querySnapshot.docs.forEach((doc) => {
            if (doc.data().UID === UID) {
                fetchedData.push(doc.data())
            }
        });
  
        setMyPosts(fetchedData);
      };
  
      fetchData();
    }, [setMyPosts, UID]);

    async function handleSignOut() {
        const auth = getAuth(app)
        await signOut(auth)
    }

    return (
        <div className='DashboardContainer'>
            <div className='HeaderContainer'>
                <div className='Header'>
                    <img alt='BrandName' src={BrandNameImg}/>
                    <button onClick={handleSignOut}>Log Out</button>
                </div>
            </div>

            <div className='MyPostsHeader'>
                MY BLOGS
                <button onClick={() => navigate('add')}>Add</button>
            </div>

            <DisplayMyPosts MyPosts={MyPosts}/>
        </div>
    )
}

async function HandleDelete(Id) {
    const db = getFirestore(app);
    await deleteDoc(doc(db, "Posts", Id));
}

function DisplayDescription({description}) {
    const temp = JSON.parse(description)
    return (
        <div className='MyPostDivDescription'>{temp[0].SectionDescription}</div>
    )
}   

function DisplayMyPosts({MyPosts}) {
    if (MyPosts.length === 0) {
        return (
            <div className='DisplayMyPosts'>
                You have no posts
            </div>
        )
    } else {
        return (
            <div className='DisplayMyPosts'>
                {MyPosts.map((item, index) => (
                    <div className='MyPostCardContainer' key={index}>
                        <div className='MyPostDivTitle'>{item.Title}</div>
                        <DisplayDescription description={item.Description}/>
                        <div className='MyPostDivButtonContainer'>
                            {/* <button onClick={() => navigate(`${item.Id}`)}>Edit</button> */}
                            <button onClick={() => HandleDelete(item.Id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        )  
    }
}