import React from "react";
import { SPIC_Course, TFAC_Course } from "../../../public/data";
import { TestimonialVideos } from "./testimonialVideos";

const Page = () => {
  return (
    <div>
      {/* SPIC Section */}
      <div>
        <div className="relative">
          {/* 1st Section */}
          <div className="relative ">
            <div className="flex min-h-[450px]">
              {/* right side */}
              <div className="w-full md:w-1/2 bg-[#17727F] flex items-center justify-center ">
                <div className="flex flex-col border border-white p-6 rounded-3xl text-white text-lg lg:text-4xl w-2/3 font-urbanist items-center font-semibold text-center">
                  <span>SRILA PRABHUPADA</span>
                  <span>INTRODUCTORY</span>
                  <span>COURSE</span>
                  <img
                    src="/lotus.png"
                    alt="lotus"
                    className="w-16 mt-4 lg:w-24"
                  />
                </div>
              </div>

              {/* left side */}
              <img
                src="https://ik.imagekit.io/opiwak7mf/Prabhupada_Network/Courses/SPIC_SP.svg?updatedAt=1762239170857"
                className="w-1/2 hidden md:block object-cover"
                alt="SPIC Illustration"
              />
            </div>
          </div>

          {/* Course Intro Section - Overlay */}
          <div className="absolute md:-bottom-60 -bottom-[210px] lg:-bottom-72 xl:-bottom-20 2xl:-bottom-10 3xl:-bottom-0 left-1/2 transform -translate-x-1/2 w-11/12">
            <div className="bg-white shadow-lg rounded-3xl p-6 md:p-10 text-[#17727F]">
              <div className="flex flex-col md:flex-row gap-6 md:gap-4 items-center">
                {SPIC_Course.map((text, idx) => (
                  <div
                    key={idx}
                    className="text-xs md:text-sm lg:text-lg text-center"
                  >
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="h-[210px] md:h-60 lg:h-72 xl:h-20 2xl:h-10 3xl:h-0" />

        <TestimonialVideos />
      </div>

      {/* TFAC */}
      <div>
        <div className="relative">
          {/* 1st Section */}
          <div className="relative ">
            <div className="flex min-h-[450px]">
              {/* right side */}
              <img
                src="https://ik.imagekit.io/opiwak7mf/Prabhupada_Network/Courses/TFAC"
                className="w-1/2 hidden md:block object-cover"
                alt="SPIC Illustration"
              />

              {/* left side */}
              <div className="w-full md:w-1/2 bg-[#17727F] flex items-center justify-center ">
                <div className="flex flex-col border border-white p-6 rounded-3xl text-white text-lg lg:text-4xl w-2/3 font-urbanist items-center font-semibold text-center">
                  <span>THE FOUNDED ACHARYA</span>
                  <span>COURSE</span>
                  <img
                    src="/lotus.png"
                    alt="lotus"
                    className="w-16 mt-4 lg:w-24"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Course Intro Section - Overlay */}
          <div className="absolute md:-bottom-60 -bottom-[210px] lg:-bottom-72 xl:-bottom-20 2xl:-bottom-10 3xl:-bottom-0 left-1/2 transform -translate-x-1/2 w-11/12">
            <div className="bg-white shadow-lg rounded-3xl p-6 md:p-10 text-[#17727F]">
              <div className="flex flex-col md:flex-row gap-6 md:gap-4 items-center">
                {TFAC_Course.map((text, idx) => (
                  <div
                    key={idx}
                    className="text-xs md:text-sm lg:text-lg text-center"
                  >
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="h-[210px] md:h-60 lg:h-72 xl:h-20 2xl:h-10 3xl:h-0" />
      </div>
    </div>
  );
};

export default Page;

{
  /* TFAC Section */
}
