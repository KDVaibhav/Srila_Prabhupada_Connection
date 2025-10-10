"use client";

import { Carousel } from "flowbite-react";

export default function PromotionSection() {
  return (
    <div className="h-56 sm:h-56 xl:h-[25rem]">
      <Carousel slideInterval={5000}>
        <img
          src="https://ik.imagekit.io/opiwak7mf/Prabhupada_Network/SPCMPromoEnglish.jpg?updatedAt=1760099642795"
          alt="..."
          className="object-contain w-full h-full"
        />

        <img
          src="https://ik.imagekit.io/opiwak7mf/Prabhupada_Network/SPCMPromoBengali.jpg?updatedAt=1760099643087"
          alt="..."
          className="object-contain w-full h-full"
        />
      </Carousel>
    </div>
  );
}
