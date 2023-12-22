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
    <div className="h-full bg-teal">
      <div className="flex justify-between bg-white px-4 lg:px-6 py-2.5 align-middle">
        <Image src={BrandNameImg} alt='BrandName' onClick={() => push('/')}/>
      </div>
      <div className="grid grid-cols-4 gap-10 p-10 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {data.map((item, index) => (
          <div className="bg-white border border-black rounded-lg p-2.5" key={index}>
            <img className="rounded-lg h-48 object-cover border border-black" src={item.URL} alt=""/>  
            <h5 id="hideScroll" className="mb-2 text-xl font-medium tracking-tight text-black h-16 overflow-scroll p-5">{item.Title}</h5>
            <button className="text-white border-solid border-2 bg-black border-black2 hover:bg-black2 font-medium rounded-lg text-sm px-4 py-2" onClick={() => push(`post/${item.Id}`)}>Read More</button>
          </div>
        ))}
      </div>
    </div>
  )
}
