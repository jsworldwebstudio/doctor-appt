"use client"

import { Button } from '@/components/ui/button'
import { LoginLink, LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function Header() {
    const Menu=[
      {
        id:1,
        name:'Home',
        path:'/'
      },
      {
        id:2,
        name:'Expore',
        path:'/'
      },
      {
        id:3,
        name:'Contact Us',
        path:'/'
      },
    ]

    const {user} = useKindeBrowserClient();

    useEffect(()=>{
      console.log(user);
    },[user])

  return (
    <div className="flex items-center justify-between p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="logo" width={180} height={80} />

        <ul className="hidden gap-8 md:flex">
          {Menu.map((item, index)=> (
            <Link key={item.id} href={item.path}>
              <li className="transition-all ease-in-out cursor-pointer hover:text-primary hover:scale-105"
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex gap-5">
        { user ?
          <Popover>
            <PopoverTrigger>
              <Image src={user.picture}
                alt="profile-picture"
                width={50}
                height={50}
                className="rounded-full"
              />
            </PopoverTrigger>
            <PopoverContent className="w-44">
              <ul className="flex flex-col gap-2">
                <li
                  className="p-2 rounded-md cursor-pointer hover:bg-slate-100"
                >
                  Profile
                </li>
                <li className="p-2 rounded-md cursor-pointer hover:bg-slate-100">
                  <Link href={'/my-booking'}>
                    My Booking
                  </Link>
                </li>
                <li
                  className="p-2 rounded-md cursor-pointer hover:bg-slate-100"
                >
                  <LogoutLink>Logout</LogoutLink>
                </li>
              </ul>
            </PopoverContent>
          </Popover>

        :
          <LoginLink><Button>Get Started</Button></LoginLink>
        }
      </div>
    </div>
  )
}

export default Header