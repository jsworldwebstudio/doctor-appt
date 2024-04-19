"use client"

import useAxios from '@/app/_hooks/useAxios';
import axios from '@/app/_utils/GlobalApi2';
import React from 'react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

function CategoryList() {

  const params = usePathname();
  const category = params.split('/')[2];
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
    <div className="flex flex-col h-screen mt-5 mb-10">

      <Command className="overflow-visible">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="overflow-visible">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
          {!loading && !error && categoryList &&
            categoryList.map((item, index)=>(
              <CommandItem key={index}>
                <Link href={'/search/' + item?.attributes?.Name}
                  className={`flex gap-2 p-2 text-[14px] text-blue-600 rounded-md items-center
                    cursor-pointer w-full ${category==item?.attributes?.Name&&'bg-blue-100'}`}
                  >
                  <Image src={item.attributes?.Icon?.data.attributes?.url}
                    alt="icon"
                    width={25}
                    height={25}
                  />
                  <label>{item.attributes?.Name}</label>
                </Link>
              </CommandItem>
            ))
          }
          </CommandGroup>
          
        </CommandList>
      </Command>

    </div>
  )
}

export default CategoryList