import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';

function CancelAppointment({ onCancelAppointment }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="outline" className="text-red-600 border-red-600 hover:text-red-600">Cancel Appointment</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your appointment
            and remove the appointment data from our system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>onCancelAppointment()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      
    </AlertDialog>

  )
}

export default CancelAppointment