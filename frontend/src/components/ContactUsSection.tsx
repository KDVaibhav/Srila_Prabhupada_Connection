"use client";

import { DIcons } from "dicons";
import Link from "next/link";
import Image from "next/image";
import { Button } from "flowbite-react";
import { useState } from "react";
import DataInsertModal from "./ui/DataInsertModal";
import { QueryFields } from "@/app/data";
import axios from "axios";
import { subscribe } from "diagnostics_channel";

const Underline = `hover:-translate-y-1 border rounded-2xl p-1 transition-transform`;

function handleScrollTop() {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
}

const ContactUsSection = () => {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const handleSubscribe = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/subscriber`, {
        email: email,
      });
      alert("Subscribed Successfully");
    } catch (err) {
      console.error("Error in Subscribing:", err);
    }
  };
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between w-full bg-[#17727F] rounded-2xl overflow-hidden mt-2">
      {/* Srila Prabhupada Image and Text */}
      <div className="p-2 flex flex-col items-center text-xs md:text-sm justify-center w-full sm:w-2/5">
        <Image
          src={"/favicon.svg"}
          height={100}
          width={200}
          alt="Srila Prabhupada"
          className="rounded-2xl"
        />
        <span className="text-center text-white max-w-72 md:max-w-96">
          Founder-Acharya His Divine Grace
        </span>
        <span className="text-center text-white max-w-72 md:max-w-96">
          A.C. Bhaktivedanta Swami Prabhupada
        </span>
      </div>
      <div className="hidden sm:flex items-center mx-4">
        <div className="border-r border-white h-40"></div>
      </div>
      {/* Contact Us */}
      <div className="flex flex-col w-full sm:w-3/5 items-center justify-center p-2">
        <div className="text-white flex w-full mb-2 gap-1 justify-start items-center max-w-72 sm:max-w-96 lg:max-w-[424px] text-xs md:text-sm">
          <h1 className="font-bold">Helpful links:</h1>
          <div className="flex gap-1">
            <a
              className="bg-[#cddbdb] rounded-lg p-1 text-fontApp"
              target="_blank"
              href="https://founderacharya.com/"
            >
              founderacharya.com
            </a>
            <a
              className="bg-[#cddbdb] rounded-lg p-1 text-fontApp"
              target="_blank"
              href="https://www.prabhupada.net/"
            >
              prabhupada.net
            </a>
          </div>
        </div>
        <div className="text-white flex flex-col  max-w-72 sm:max-w-96 lg:max-w-[424px] text-xs md:text-sm">
          <h1 className="font-bold">Contact Us</h1>
          <div>
            Srila Prabhupada Connection - Mayapur, Room 102, 1st floor, Lotus
            Building, Iskcon Temple Mayapur, Nadia 741313, West Bengal, India.
          </div>
          <div className="flex flex-col mt-2">
            <div className="flex items-center gap-1">
              <DIcons.Phone className="text-fontApp fill-white rounded-full w-4 h-4" />
              +91 9332892282
            </div>
            <div className="flex items-center gap-1">
              <DIcons.Mail className="text-fontApp fill-white rounded-full w-4 h-4" />
              srilaprabhupadaconnection@iskconmayapur.com
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start max-w-72 sm:max-w-96 lg:max-w-[424px] text-black mt-2">
          <div className="flex items-center justify-center gap-1 ">
            <Link
              aria-label="Logo"
              href="https://www.instagram.com/spcmayapur"
              rel="noreferrer"
              target="_blank"
              className={Underline}
            >
              <DIcons.Instagram strokeWidth={1.5} className="h-6 w-6" />
            </Link>
            {/* <Link
              aria-label="Logo"
              href="https://x.com/prabhupadateam"
              rel="noreferrer"
              target="_blank"
              className={Underline}
              >
              <DIcons.X className="h-6 w-6" />
              </Link> */}
            <Link
              aria-label="Logo"
              href="https://api.whatsapp.com/send?phone=919332892282"
              rel="noreferrer"
              target="_blank"
              className={Underline}
            >
              <DIcons.WhatsApp className="h-6 w-6" />
            </Link>
            <Link
              aria-label="Logo"
              href="https://www.facebook.com/people/Prabhupada-Network/61562961872679/"
              rel="noreferrer"
              target="_blank"
              className={Underline}
            >
              <DIcons.Facebook className="h-6 w-6" />
            </Link>
            <Link
              aria-label="Logo"
              href="https://www.youtube.com/@spcmayapur"
              rel="noreferrer"
              target="_blank"
              className={Underline}
            >
              <DIcons.YouTube className="h-6 w-6" />
            </Link>
          </div>
          <div className="flex items-center justify-between w-1/2 border rounded-2xl ml-1 border-white overflow-hidden">
            <input
              id={email}
              aria-label="Enter email"
              placeholder="Enter email"
              value={email || ""}
              onChange={(event) => setEmail(event.target.value)}
              className="bg-fontApp rounded-2xl w-full pl-2 py-1 text-xs md:text-sm focus:outline-none text-white placeholder:text-white
               [&:-webkit-autofill]:bg-fontApp
               [&:-webkit-autofill]:-webkit-text-fill-color-white
               [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_theme(colors.fontApp)]
               [&:-webkit-autofill]:border-none"
            />
            <button
              onClick={handleSubscribe}
              className="bg-[#F4FCFC] text-fontApp rounded-2xl px-2 py-1 hover:bg-[#cddbdb] ml-[-8px]"
            >
              <DIcons.Bell />
            </button>
          </div>
          <DataInsertModal
            openModal={openModal}
            onCloseModal={() => setOpenModal(false)}
            title="Query"
            fields={QueryFields}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;
