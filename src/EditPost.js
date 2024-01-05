// import { useParams } from "react-router-dom";

// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
// import { getFirestore, collection, doc, updateDoc, getDocs, serverTimestamp, query, orderBy } from "firebase/firestore";

// import BrandNameImg from './Img/BrandName.svg'
// import DeleteSectionBtn from './Img/DeleteSectionBtn.svg'

// import { app } from './firebase'
// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';

// import TextareaAutosize from 'react-textarea-autosize';

// import './EditPost.css'

// export default function EditPost() {
//     const { postId } = useParams()
    
//     const [UserSignedIn, setUserSignedIn] = useState(false)
//     const [addNewSection, setAddNewSection] = useState([])

//     const navigate = useNavigate();

//     const auth = getAuth(app)
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//           // User is signed in
//           const uid = user.uid
//           setUserSignedIn(true)
//           // ...
//       } else {
//           // User is signed out
//           setUserSignedIn(false)
//       }
//     });

//     if (UserSignedIn) {
//         return (
//             <EditPostContainer Id={postId} addNewSection={addNewSection} setAddNewSection={setAddNewSection}/>
//         )
//     } else {
//         navigate('/signup')
//     }
// }

// function EditPostContainer({Id, addNewSection, setAddNewSection}) {
//     const [ImgURL, setImgURL] = useState('')
//     const [newImgURL, setNewImgURL] = useState('')
//     const [Title, setTitle] = useState('')
//     const [Description, setDescription] = useState('')
  
//     useEffect(() => {
//         const getData = async () => {
//             const db = await getFirestore();
//             const colRef = await collection(db, 'Posts')
//             const q = await query(colRef, orderBy('TimeStamp'))
//             const querySnapshot = await getDocs(q)
    
//             querySnapshot.docs.forEach((doc) => {
//                 if (doc.data().Id === Id) {
//                     setImgURL(doc.data().URL)
//                     setTitle(doc.data().Title)
//                     // setDescription(doc.data().Description)
//                     setAddNewSection(JSON.parse(doc.data().Description))
//                 }

//                 // if (Description) {
//                 //     setAddNewSection(JSON.parse(Description))
//                 // }
//             });
//         }
    
//         getData()
//     }, [])

//     console.log(addNewSection)

//     // function SetNewImgURL(e) {
//     //     var newURL = e.target.files
//     //     setNewImgURL(newURL[0])
//     // }

//     const UpdatePost = async () => {
//         // const db = getFirestore(app)
//         // const colRef = collection(db, 'Posts')
//         // const newDocRef = doc(colRef)

//         // const storage = getStorage()
//         // const imgRef = ref(storage, `images/headerImages/${Id}`)
//         // await deleteObject(imgRef)
    
//         // if (newImgURL !== '') {
//         //     await uploadBytes(imgRef, newImgURL)
//         // }
    
//         // const URL = await getDownloadURL(imgRef)
//         // const docRef = doc(db, 'Posts', Id)

//         // await updateDoc(docRef, {
//         //     Title: Title,
//         //     Description: Description,
//         //     URL: URL,
//         //     TimeStamp: serverTimestamp()
//         // })
//     }
    
//     async function handleSignOut() {
//         const auth = getAuth(app)
//         await signOut(auth)
//     }

//     if (addNewSection.length !== 0) {
//         return (
//             <div className="EditPostContainer">
//                 <div className='HeaderContainer'>
//                     <div className='Header'>
//                         <img alt='BrandName' src={BrandNameImg}/>
//                         <button onClick={handleSignOut}>Log Out</button>
//                     </div>
//                 </div>
//                 <div className="EditPostSubContainer">
//                     <TextareaAutosize className="textarea EditPostTitle" onChange={(e) => setTitle(e.target.value)} value={Title}/>
//                     <AddSectionDisplay addNewSection={addNewSection} setAddNewSection={setAddNewSection}/>
//                     {/* <TextareaAutosize className="textarea" onChange={(e) => setDescription(e.target.value)} value={Description}/> */}
//                 </div>
//                 <button className="AddPostBtn" onClick={() => UpdatePost()}>Update Blog</button>
//             </div>
//         )
//     }
// }

// const AddSectionDisplay = ({addNewSection, setAddNewSection}) => {
//     function AddNewSectionFunc() {
//         const updatedSections = [...addNewSection, { SectionTitle: '', SectionDescription: '' }]
//         setAddNewSection(updatedSections)
//     }

//     function UpdateSectionTitle(index, value) {
//         const temp = [...addNewSection];
//         temp[index].SectionTitle = value;
//         setAddNewSection(temp);
//     }

//     function UpdateSectionDescription(index, value) {
//         const temp = [...addNewSection];
//         temp[index].SectionDescription = value;
//         setAddNewSection(temp);
//     } 

//     function DeleteSection(index) {
//         const temp = [...addNewSection]
//         temp.splice(index, 1)
//         setAddNewSection(temp)
//     }
      
//     return (
//         <div className="AddNewSectionContainer">
//             {addNewSection.map((item, index) => (
//                 <div key={index} className="AddNewSectionElement">
//                     <TextareaAutosize placeholder="Title" className="textarea addNewSectionTitle" value={item.SectionTitle} onChange={(e) => UpdateSectionTitle(index, e.target.value)}/>
//                     <TextareaAutosize placeholder="Description" className="textarea addNewSectionDescription" value={item.SectionDescription} onChange={(e) => UpdateSectionDescription(index, e.target.value)}/>
//                     <button className="DeleteSectionBtn" onClick={() => DeleteSection(index)}><img alt="Delete" src={DeleteSectionBtn}/></button>
//                 </div>
//             ))}
//             <button className="AddNewSectionButton" onClick={() => AddNewSectionFunc()}>Add New Section</button>
//         </div>
//     )
// }