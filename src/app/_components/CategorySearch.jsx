"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import useAxios from '../_hooks/useAxios';
import axios from '../_utils/GlobalApi2';
import Link from 'next/link'

function CategorySearch() {

  const [categoryList, error, loading] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: '/categories?populate=*',
    requestConfig: {
      headers:{
        'Content-Type': 'application/json'
      }
    }
  });
  
  return (
    <div className="flex flex-col items-center gap-2 px-5 mb-10">
      <h2 className="text-4xl font-bold tracking-wide">
        Search <span className="text-primary">Doctors</span>
      </h2>
      <h2 className="text-xl text-gray-500">Search Your Doctor and Book Appointment in one click</h2>

      <div className="flex items-center w-full max-w-sm mt-3 space-x-2">
        <Input type="text" placeholder="Search..." />
        <Button type="submit">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>

      {/*  Display List of Categories  */}

      <div className="grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-6">
      {loading &&
        // Skeleton Effect
        [1,2,3,4,5,6].map((item,index)=>(
          <div key={index}
            className="w-[130px] h-[110px] bg-slate-200 rounded-lg
              animate-pulse gap-2 m-2 flex flex-row items-center text-center"
          >
          </div>
        ))
      }
      </div>

      {!loading && error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-6">
      {!loading && !error && categoryList &&
        categoryList.map((item, index)=>index<6 && (
          <Link key={item.id} href={'/search/' + item?.attributes?.Name}
            className="flex flex-col items-center gap-2 p-5 m-2 text-center transition-all ease-in-out rounded-lg cursor-pointer bg-blue-50 hover:scale-110"
          >
            <Image src={item.attributes?.Icon?.data.attributes?.url}
              alt="icon"
              width={40}
              height={40}
            />
            <label className="text-sm text-blue-600">{item?.attributes?.Name}</label>
          </Link>
        ))
      }
      </div>

      {!loading && !error && !categoryList && <p className="text-red-600">No categories to display</p>}
    </div>
  )
}

export default CategorySearch