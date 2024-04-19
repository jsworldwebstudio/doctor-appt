import { Calendar, Clock, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { format } from 'date-fns';
import { toast } from 'sonner';
import CancelAppointment from './CancelAppointment';

function BookingList({bookingList, expired, refreshBookingList}) {
  const API_KEY=process.env.NEXT_PUBLIC_STRAPI_API_KEY;
  
  const onDeleteBooking = async (idToCancel) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${API_KEY}`,
      }
    };

    try {
      const response = await fetch('https://doctor-appt-strapi.onrender.com/api/appointments/' + idToCancel, options);
      const data = await response.json();

      if (!response.ok) {
        console.log(data.description);
        return
      }
      
      toast("Booking Appointment Deleted Successfully!");
      refreshBookingList();

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div>
      {bookingList && bookingList.map((item, index)=>(
        <div className="flex items-center gap-4 p-5 m-3 border rounded-lg">
          <Image
            src={item.attributes?.doctor.data.attributes?.Image?.data?.attributes?.url}
            alt="doctor"
            width={70}
            height={70}
            className="h-[70px] w-[70px] object-cover rounded-full"
          />
          <div className="flex flex-col w-full gap-2">
            <h2 className="font-bold text-[18px] flex justify-between items-center">
              {item.attributes?.doctor.data.attributes?.Name}
              {!expired && <CancelAppointment onCancelAppointment={()=>onDeleteBooking(item.id)} />}
            </h2>
            <h2 className="flex gap-2 text-gray-500">
              <MapPin className="w-5 h-5 text-primary" /> {item.attributes?.doctor.data.attributes?.Address}
            </h2>
            <h2 className="flex gap-2">
              <Calendar className="w-5 h-5 text-primary" /> Appointment On: {format(item.attributes?.Date, 'PPPP')}
            </h2>
            <h2 className="flex gap-2">
              <Clock className="w-5 h-5 text-primary" /> Time: {item.attributes.Time}</h2>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BookingList