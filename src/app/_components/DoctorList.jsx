import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function DoctorList({doctorList, heading}) {

  return (
    <div className="px-10 mb-10">
      <h2 className="text-xl font-bold">{heading}</h2>
      <div
        className="grid grid-cols-2 mt-4 sm:grid-cols-2 md:grid-cols-3 gap-7 lg:grid-cols-4"
      >
        {doctorList.length>0 ? doctorList.map((doctor)=>(
          <div key={doctor.id} className="border-[1px] rounded-lg p-4 cursor-pointer
            hover:border-primary hover:shadow-sm transition-all ease-in-out"
          >
            <Image
              src={doctor.attributes?.Image?.data?.attributes?.url}
              alt="doctor"
              width={500}
              height={200}
              className="h-[200px] w-full object-cover rounded-lg"
            />
            <div className="flex flex-col gap-1 mt-3 item-baseline">
              <h2 className="text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary">
                {doctor.attributes?.categories.data[0].attributes?.Name}
              </h2>
              <h2 className="font-bold">{doctor.attributes?.Name}</h2>
              <h2 className="text-sm text-primary">{doctor.attributes?.Years_of_Experience}</h2>
              <h2 className="text-sm text-gray-500">{doctor.attributes?.Address}</h2>

              <Link href={'/details/' + doctor?.id} className="w-full">
                <h2 className="p-2 px-3 border-[1px] border-primary text-primary
                  rounded-full w-full text-center text-[11px] mt-2 cursor-pointer
                  hover:bg-primary hover:text-white"
                >
                  Book Now
                </h2>
              </Link>
            </div>
          </div>
        ))
        :
        // Skeleton Effect
        [1,2,3,4,5,6].map((item,index)=>(
          <div key={index} className="h-[220px] bg-slate-100 w-full rounded-lg animate-pulse">
          </div>
        ))
        
        }
      </div>
    </div>
  )
}

export default DoctorList