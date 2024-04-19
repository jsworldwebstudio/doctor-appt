"use client"

import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import BookingList from './_components/BookingList';

function MyBooking() {
  const [bookingList, setBookingList] = useState();
  const [upcomingBookingList, setUpcomingBookingList] = useState(null);
  const [pastBookingList, setPastBookingList] = useState(null);
  const {user} = useKindeBrowserClient();
  const API_KEY=process.env.NEXT_PUBLIC_STRAPI_API_KEY;

  useEffect(()=>{
    user &&
    getUserBookingList();
  },[user]);

  useEffect(()=>{
    setUpcomingBookingList(filterUserBooking('upcoming'));
    setPastBookingList(filterUserBooking('past'));
  },[bookingList]);

  const getUserBookingList = async () => {

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${API_KEY}`,
      }
    };

    try {
      // const response = await fetch('https://doctor-appt-strapi.onrender.com/api/appointments?[filters][Email][$eq]='+userEmail+'&populate=*', options);
      // const response = await fetch('https://doctor-appt-strapi.onrender.com/api/appointments?[filters][Email][$eq]='+userEmail+'&populate[doctor][populate][Image][populate][0]=url&populate=*', options);
      const response = await fetch('https://doctor-appt-strapi.onrender.com/api/appointments?[filters][Email][$eq]='+user?.email+'&populate[doctor][populate][0]=Image&populate=*', options);
      const data = await response.json();

      if (!response.ok) {
        console.log(data.description);
        return
      }

      console.log(data);
      setBookingList(data.data);

    } catch (error) {
      console.log(error);
    }
  }

  const filterUserBooking=(type)=>{
    console.log(`Coming in for: ${type}, bookingList = ${bookingList}`);
    const result=bookingList?.filter(item=>
      type=='upcoming'? new Date(item.attributes.Date) >= new Date()
      : new Date(item.attributes.Date) < new Date()
      )
    console.log(`${type} booking list = ${result}`);
    return result;
  }

  return (
    <div className="px-4 mt-10 sm:px-10">
      <h2 className="text-2xl font-bold">My Booking</h2>

      <Tabs defaultValue="upcoming" className="w-full mt-5">
        <TabsList className="justify-start w-full">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          {upcomingBookingList &&
            <BookingList bookingList={upcomingBookingList}
              expired={false} refreshBookingList={()=>getUserBookingList()} />
          }
          {!upcomingBookingList &&
            <h3>NO UPCOMING BOOKINGS TO DISPLAY!</h3>
          }
        </TabsContent>
        <TabsContent value="past">
        {pastBookingList ?
          <BookingList bookingList={pastBookingList}
            expired={true} refreshBookingList={()=>getUserBookingList()} />
        :
          <h3>NO PAST BOOKINGS TO DISPLAY!</h3>
        }
        </TabsContent>
      </Tabs>

    </div>
  )
}

export default MyBooking