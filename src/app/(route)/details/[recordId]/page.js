"use client"

import React, { useEffect } from 'react'
import useAxios from '@/app/_hooks/useAxios';
import axios from '@/app/_utils/GlobalApi2';
import DoctorDetail from '../_components/DoctorDetail';

function Details({ params }) {

  useEffect(()=>{
    console.log(params);
  }, [])

  const doctorId = params.recordId;
  const [doctorById, error, loading] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: '/doctors/'+doctorId+'?populate=*',
    requestConfig: {
      headers:{
        'Content-Type': 'application/json'
      }
    }
  });

  {!loading && !error && doctorById &&
    console.log(doctorById);
  }

  return (
    <div className="p-5 md:px-20">
      <h2 className="font-bold text-[22px]">Details</h2>

      <div class="grid grid-cols-1 md:grid-cols-4">
        {/* Doctor Detail */}
        <div className="col-span-3">
        {!loading && !error && doctorById &&
          <DoctorDetail doctor={doctorById} />
        }
        </div>

        {/* Doctor Suggestion */}
        <div>
        </div>
      </div>
      
    </div>
  )
}

export default Details