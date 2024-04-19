"use client"

import GlobalApi from '@/app/_utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function DoctorSuggestionList() {
    const [doctorList,setDoctorList]=useState([]);
    useEffect(()=>{
      getDoctorList();
    },[])
    const getDoctorList=()=>{
      GlobalApi.getDoctorList().then(resp=>{
        console.log(resp.data.data);
        setDoctorList(resp.data.data);
      })
    }
  return (
    <div className=' p-4 border-[1px] mt-5 md:ml-5 rounded-lg '>
        <h2 className='mb-3 font-bold'>Suggestions</h2>

        {doctorList.map((doctor,index)=>(
            <Link href={'/details/'+doctor.id} className='flex items-center w-full gap-3 p-3 mb-4 rounded-lg shadow-sm cursor-pointer hover:bg-slate-100'>
                <Image src={doctor.attributes?.image?.data?.attributes?.url}
                width={70}
                height={70}
                className='w-[70px] h-[70px] rounded-full object-cover'
                />
                <div className='flex flex-col items-baseline gap-1 mt-3'>
                    <h2 className='text-[10px] bg-blue-100 p-1 rounded-full px-2
                     text-primary'>{doctor.attributes.categories?.data[0]?.attributes?.Name}</h2>
                <h2 className='text-sm font-medium'>{doctor.attributes.Name}</h2>
                <h2 className='flex gap-2 text-xs text-primary'>
                    {/* <GraduationCap/> */}
                    {doctor.attributes.Year_of_Experience}</h2>
                    </div>
            </Link>
        ))}
    </div>
  )
}

export default DoctorSuggestionList