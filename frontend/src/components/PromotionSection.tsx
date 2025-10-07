"use client";

import { Carousel } from "flowbite-react";

export default function PromotionSection() {
  return (
    <div className="h-56 sm:h-56 xl:h-[25rem]">
      <Carousel slideInterval={5000}>
        <img
          src="https://ik.imagekit.io/opiwak7mf/Prabhupada_Network/Website%20Home%20Banner.png?updatedAt=1739163337702"
          alt="..."
          className="object-contain w-full h-full"
        />

        <img
          src="https://ik.imagekit.io/opiwak7mf/Prabhupada_Network/PrabhupadaConnectBengali?updatedAt=1759838780545"
          alt="..."
          className="object-contain w-full h-full"
        />
      </Carousel>
    </div>
  );
}
