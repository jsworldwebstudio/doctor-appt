"use client"

import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { toast } from 'sonner';
// import { format } from 'date-fns';

function BookAppointment({doctorId}) {
  const [date, setDate] = useState(new Date())
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [note,setNote]=useState();
  const {user} = useKindeBrowserClient();
  const API_KEY=process.env.NEXT_PUBLIC_STRAPI_API_KEY;

  useEffect(()=>{
    getTime();
  },[]);

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ':00 AM'
      })
      timeList.push({
        time: i + ':30 AM'
      })
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ':00 PM'
      })
      timeList.push({
        time: i + ':30 PM'
      })
    }

    setTimeSlot(timeList)
  }

  const sendEmail = async () => {
    // const formattedDate = format(date, 'PPPP');
    const data={
      data:{
        UserName:user.given_name+" "+user.family_name,
        Email:user.email,
        Date:date,
        Time:selectedTimeSlot,
        Note:note,
        doctor:doctorId
      }
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${API_KEY}`,
      },
      body: JSON.stringify(data)
    };

    try {
      const response = await fetch('https://doctor-appt-strapi.onrender.com/api/sendEmail', options);
      const data = await response.json();

      if (!response.ok) {
        console.log(data.description);
        return
      }

      toast("Booking Confirmation sent on Email");

    } catch (error) {
      console.log(error);
    }
  }

  const saveBooking = async () => {
    // const formattedDate = format(date, 'PPPP');
    const data={
      data:{
        UserName:user.given_name+" "+user.family_name,
        Email:user.email,
        Date:date,
        Time:selectedTimeSlot,
        Note:note,
        doctor:doctorId
      }
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${API_KEY}`,
      },
      body: JSON.stringify(data)
    };

    try {
      const response = await fetch('https://doctor-appt-strapi.onrender.com/api/appointments/', options);
      const data = await response.json();

      if (!response.ok) {
        console.log(data.description);
        return
      }
      
      // sendEmail();
      toast("Booking Confirmation sent on Email");

    } catch (error) {
      console.log(error);
    }
  }

  const isPastDay=(day)=>{
    return day<=new Date();
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-3 rounded-full">Book Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            <div>
              <div className="grid grid-cols-1 mt-5 md:grid-cols-2">
                {/* Calendar */}
                <div className="flex flex-col items-baseline gap-3">
                  <h2 className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-primary"/>
                    Select Date 
                  </h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={isPastDay}
                    className="border rounded-md"
                  />
                </div>

                {/* Time Slot */}
                <div className="mt-3 md:mt-0">
                  <h2 className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-primary" />
                    Select Time Slot
                  </h2>
                  <div className="grid grid-cols-3 gap-2 p-5 border rounded-lg">
                    {timeSlot?.map((item, index)=>(
                      <h2 key={index}
                        className={`p-2 text-center border rounded-full cursor-pointer
                        hover:bg-primary hover:text-white
                        ${item.time==selectedTimeSlot&&"bg-primary text-white"}`}
                        onClick={()=>setSelectedTimeSlot(item.time)}
                        >{item.time}</h2>
                    ))}
                  </div>
                </div>

              </div>
              <Textarea className="mt-3" placeholder="Note" onChange={(e)=>setNote(e.target.value)} />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
              <Button type="button" variant="outline"
                className="text-red-500 border-red-400"
              >
                Close
              </Button>
          </DialogClose>
          <DialogClose asChild>
              <Button type="button" disabled={!(date&&selectedTimeSlot)} onClick={()=>saveBooking()}>
                Submit
              </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default BookAppointment