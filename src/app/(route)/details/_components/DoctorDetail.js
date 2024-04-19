import { GraduationCap, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import BookAppointment from './BookAppointment';

function DoctorDetail({doctor}) {
  const socialMediaList=[
    {
      id:1,
      icon:'/youtube.png',
      url:''
    },
    {
      id:2,
      icon:'/linkedin.png',
      url:''
    },
    {
      id:3,
      icon:'/x.png',
      url:''
    },
    {
      id:4,
      icon:'/facebook.png',
      url:''
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg">

        {/* Doctor Image */}
        <div>
          <Image
            src={doctor.attributes?.Image?.data?.attributes?.url}
            alt="doctor-image"
            width={200}
            height={200}
            className="rounded-lg w-full h-[280px] object-cover"
          />
        </div>
        
        {/* Doctor Info */}
        <div className="flex flex-col items-baseline col-span-2 gap-3 mt-5 md:px-10">
          <h2 className="text-2xl font-bold">{doctor.attributes?.Name}</h2>
          <h2 className="flex gap-2 text-gray-500 text-md">
            <GraduationCap />
            <span>{doctor.attributes?.Years_of_Experience} of Experience</span>
          </h2>
          <h2 className="flex gap-2 text-gray-500 text-md">
            <MapPin />
            <span>{doctor.attributes?.Address}</span>
          </h2>
          <h2 className="text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary">
            {doctor.attributes?.categories.data[0].attributes?.Name}
          </h2>
          <div className="flex gap-3">
            {socialMediaList.map((item) => (
              <Image
                key={item.id}
                width={30}
                height={30}
                src={item.icon}
              />
            ))}
          </div>
          <BookAppointment doctorId={doctor.id} />
        </div>
      </div>
      {/* About Doctor */}
      <div className="p-3 border-[1px] rounded-lg mt-5">
        <h2 className="font-bold text-[20px]">About Me</h2>
        <p className="mt-2 tracking-wide text-gray-500">{doctor.attributes?.About}</p>
      </div>
    </>
  )
}

export default DoctorDetail