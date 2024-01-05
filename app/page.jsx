'use client'

import { useRouter } from 'next/navigation.js'
import Image from 'next/image'
import BrandNameImg from '../public/BrandName.svg'
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import app from './firebase.jsx'

import { useState, useEffect } from "react";

export default function Home() {
  const { push } = useRouter()
  const [data, setData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
      const db = getFirestore(app);
      const colRef = collection(db, 'Posts')
      const q = query(colRef, orderBy('TimeStamp'))
      const querySnapshot = await getDocs(q)

      const fetchedData = [];
      querySnapshot.docs.forEach((doc) => {
          fetchedData.push(doc.data());
      });

      setData(fetchedData);
      };

      fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-blue">
      <div className="bg-lightBlue px-20 py-5 align-middle max-sm:px-10">
        <Image src={BrandNameImg} alt='BrandName' onClick={() => push('/')}/>
      </div>
      <div className="px-20 py-10 grid grid-cols-3 gap-10 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:px-10">
        {data.map((item, index) => (
          <div className="bg-none border-2 border-lightBlue rounded-lg p-5 hover:border-pink transition-all duration-500" key={index}>
            <div id="hideScroll" className="text-lg font-semibold text-yellow truncate">{item.Title}</div>
            <div id="hideScroll" className="text-sm font-semibold text-white h-20 line-clamp-3">{JSON.parse(item.Description)[0].SectionDescription}</div>
            <button className="text-sm font-semibold text-lightBlue" onClick={() => push(`post/${item.Id}`)}>Read More</button>
          </div>
        ))}
      </div>
    </div>
  )
}
