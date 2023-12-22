'use client'

import { useRouter } from 'next/navigation.js'
import Image from 'next/image'
import BrandNameImg from '../../../public/BrandName.svg'
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import app from '../../firebase.jsx'

import { useState, useEffect } from "react";

export default function Post({ params }) {
    const { push } = useRouter()
    const [data, setData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
        const db = getFirestore(app);
        const colRef = collection(db, 'Posts')
        const q = query(colRef, orderBy('TimeStamp'))
        const querySnapshot = await getDocs(q)
  
        const fetchedData = [];
        querySnapshot.docs.forEach((doc) => {
            if (doc.data().Id === params.postId)
                setData(doc.data());
            });
        };
  
        fetchData();
    }, []);

    return (
        <div className="h-full bg-teal">
            <div className="flex justify-between bg-white px-4 lg:px-6 py-2.5 align-middle">
                <Image src={BrandNameImg} alt='BrandName' onClick={() => push('/')}/>
            </div>
            <div className="mx-auto w-4/5 py-10">
                <div className="rounded-t-lg bg-white h-48 w-48 border mb-5 border-black rounded-lg">
                    <img className="h-48 w-48 relative object-contain" src={data.URL}/>
                </div>
                <div id="hideScroll" className="text-4xl text-gray-900 text-black mb-5 flex items-center overflow-scroll max-md:text-2xl">
                    {data.Title}
                </div>
                <div id="hideScroll" className="text-xl text-gray-900 text-black overflow-scroll h-3/6 max-md:text-base">
                    {data.Description}
                </div>
            </div>          
        </div>
    )
}
  
  