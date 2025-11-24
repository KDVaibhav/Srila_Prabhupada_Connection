"use client";
import React, { useState } from "react";

export const TestimonialVideos = () => {
  const testimonialVideos = [{ id: "oKD_9S13Aek" }, { id: "t-I2j2ZzFvM" }];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialVideos.length);
  };

  const prevVideo = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonialVideos.length) % testimonialVideos.length
    );
  };

  const getVideoPosition = (index: number) => {
    const totalVideos = testimonialVideos.length;
    const relativeIndex = (index - currentIndex + totalVideos) % totalVideos;

    switch (relativeIndex) {
      case 0:
        return "left";
      case 1:
        return "center";
      case 2:
        return "right";
      default:
        return "hidden";
    }
  };

  return (
    <div className="min-h-96 bg-[url('https://ik.imagekit.io/opiwak7mf/Prabhupada_Network/Courses/tovp%201.jpg?updatedAt=1763966798258')] bg-cover bg-center flex items-center justify-center py-12">
      <div className="w-full max-w-6xl px-4">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-8 font-serif text-center">
          Testimonials
        </h2>

        <div className="relative h-80 md:h-96 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-between px-4 md:px-8">
            {testimonialVideos.map((video, index) => {
              const position = getVideoPosition(index);

              if (position === "hidden") return null;

              return (
                <div
                  key={video.id}
                  className={`relative transition-all duration-500 ease-in-out cursor-pointer ${
                    position === "center"
                      ? "z-20 flex-1 max-w-2xl scale-100 opacity-100 mx-4"
                      : "z-10 w-32 md:w-40 scale-75 opacity-70 hover:opacity-90 hover:scale-80"
                  }`}
                  onClick={() => {
                    if (position === "left") prevVideo();
                    if (position === "right") nextVideo();
                  }}
                >
                  <div
                    className={`relative rounded-lg shadow-2xl overflow-hidden bg-black border-2 transition-all duration-300 ${
                      position === "center"
                        ? "border-white border-opacity-80"
                        : "border-white border-opacity-40 hover:border-opacity-60"
                    }`}
                  >
                    <div
                      className="relative"
                      style={{ paddingBottom: "56.25%" }}
                    >
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}?modestbranding=0&rel=0&controls=1&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&start=0&end=0&playsinline=1&showinfo=0&color=white&autohide=1`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen={false}
                        className="absolute top-0 left-0 w-full h-full"
                      />
                    </div>

                    {/* Click indicator for side videos */}
                    {(position === "left" || position === "right") && (
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
