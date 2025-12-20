"use client";
import { Button } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
const DonationForm = () => {
  const router = useRouter();
  const handleDonateRoute = () => {
    router.push("/donation");
  };
  return (
    <div className="relative w-full aspect-[3/1] rounded-2xl overflow-hidden">
      <Image
        src="https://ik.imagekit.io/opiwak7mf/Prabhupada_Network/donateBanner.svg?updatedAt=1759838733398"
        alt="Donate Banner"
        fill
        className="object-cover" // switch from object-contain to cover
        priority
      />
      <div className="absolute inset-0 flex flex-col items-end justify-center">
        <div className="flex flex-col items-center w-3/4 justify-center">
          <div className="flex flex-col p-2 text-center text-[#530001] font-donation text-xl sm:text-4xl lg:text-6xl">
            <span>Offer Your Support and </span>
            <span>Be Part of Srila Prabhupada </span>
            <span>Connections - Mayapur</span>
          </div>
          
          <Button
            size="lg"
            onClick={() => handleDonateRoute()}
            className="w-fit bg-primary2 rounded-2xl font-extrabold shadow-slate-200 shadow-2xl"
          >
            Donate Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
