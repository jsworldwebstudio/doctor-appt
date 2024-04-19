"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import useAxios from "./_hooks/useAxios";
import axios from './_utils/GlobalApi2';

export default function Home() {

  const [doctorList, error, loading] = useAxios({
    axiosInstance: axios,
    method: 'GET',
    url: '/doctors?populate=*',
    requestConfig: {
      headers:{
        'Content-Type': 'application/json'
      }
    }
  });

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Category + Search Section */}
      <CategorySearch />

      {/* Popular Doctor List */}
      <DoctorList doctorList={doctorList} heading="Popular Doctors"/>
    </div>
  );
}
