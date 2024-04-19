"use client"

import DoctorList from '@/app/_components/DoctorList';
import useAxios from '@/app/_hooks/useAxios';
import axios from '@/app/_utils/GlobalApi2';

import React, { useEffect } from 'react'

function Search({ params }) {

  // useEffect(()=>{
  //   console.log(params);

    

  // }, [])

  // const getDoctors=()=>{

  // }

  const category = params.cname;
  const categoryDisplay = category.replace(/%20/g, " ");
  const [doctorsByCategoryList, error, loading] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: '/doctors?filters[categories][Name][$in]='+categoryDisplay+'&populate=*',
    requestConfig: {
      headers:{
        'Content-Type': 'application/json'
      }
    }
  });

  return (
    <div className="mt-5">
      <DoctorList doctorList={doctorsByCategoryList} heading={categoryDisplay} />
    </div>
  )
}

export default Search