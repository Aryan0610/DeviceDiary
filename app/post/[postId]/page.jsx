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
        <div className="min-h-screen bg-blue">
            <div className="bg-lightBlue px-20 py-5 align-middle max-sm:px-10">
                <Image src={BrandNameImg} alt='BrandName' onClick={() => push('/')}/>
            </div>
            <div className="px-20 py-10 max-sm:px-10">
                <div id="hideScroll" className="text-4xl font-semibold text-yellow py-10 max-sm:text-2xl">
                    {data.Title}
                </div>
                {data && JSON.parse(data.Description).map((item, index) => (
                    <div key={index} className="py-5">
                        <div className="text-2xl font-semibold text-lightBlue py-2 max-sm:text-xl">{item.SectionTitle}</div>
                        <div className="text-xl font-normal text-white max-sm:text-base">{item.SectionDescription}</div>
                    </div>
                ))}
            </div>          
        </div>
    )
}
  
  