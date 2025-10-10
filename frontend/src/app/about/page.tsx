"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import DataInsertModal from "@/components/ui/DataInsertModal";
import { Button } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import { JoinUsFields, TEAM_MEMBERS } from "../data";

export default function AboutUs() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="mt-2">
      <Image
        src="AboutUsHero.svg"
        alt="lotus"
        width={100}
        height={20}
        className="w-full rounded-xl"
      />
      <div
        className="w-full p-2  bg-[url('/aboutUsContentBg.svg')] bg-no-repeat bg-cover rounded-xl"
        aria-label="lotus background"
      >
        {/* Your content goes here */}
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>BACKGROUND</AccordionTrigger>
            <AccordionContent>
              <div className="relative">
                <div className="float-right ml-4 mb-4 lg:ml-32 lg:mb-10 w-full max-w-[200px] md:max-w-[250px] lg:max-w-[300px]">
                  <Image
                    src="https://ik.imagekit.io/opiwak7mf/Prabhupada_Network/AboutUs/AboutUs1.svg?updatedAt=1760084514014"
                    alt="About Us"
                    width={300}
                    height={300}
                    className="w-full h-auto rounded-lg object-contain"
                  />
                </div>
                <div className="content-text gap-4 flex flex-col">
                  <p>
                    <span className="font-bold">
                      The Srila Prabhupada Connection initiative
                    </span>{" "}
                    is the evolution of an effort that began in 2006 at a
                    special meeting of the GBC dedicated to strategic planning
                    for the future of ISKCON. At that time, several key
                    initiatives were identified for immediate focus. One of
                    these was Srila Prabhupada's position.{" "}
                    <span className="font-bold">
                      The Srila Prabhupada Position Committee (SPPC)
                    </span>{" "}
                    was formed and began working, with a primary focus on
                    developing an official document.
                  </p>
                  <p>
                    In 2014, the GBC accepted the draft document compiled by
                    Ravindra Swarup Prabhu and resolved that it be disseminated
                    widely A website was created called Founderacharya.com, and
                    the GBC resolved in 2014:
                  </p>
                </div>
              </div>
              <div className="mt-4 gap-4 flex flex-col">
                <p>
                  310:{" "}
                  <a
                    href="https://gbc.iskcon.org/gbc_res/GBCRES14.html#:~:text=310%3A%20%E2%80%9CSrila,%5BGuideline%5D"
                    target="_blank"
                    className="underline hover:underline-offset-2 font-bold"
                  >
                    "Srila Prabhupada: The Founder-Acarya of ISKCON"{" "}
                  </a>
                  on{" "}
                  <a
                    href="https://founderacharya.com/"
                    className="underline hover:underline-offset-2"
                    target="_blank"
                  >
                    founderacharya.com [Guideline]
                  </a>
                </p>
                <p>
                  Whereas the booklet,{" "}
                  <a
                    href="https://founderacharya.com/wp-content/uploads/2024/12/Founder_Acharya_GBC_Press.pdf"
                    className="underline hover:underline-offset-2 font-bold"
                    target="_blank"
                  >
                    "Srila Prabhupada: The Founder-Acarya of ISKCON," {""}
                  </a>
                  released by Ravindra Svarupa Das and published by the ISKCON
                  GBC Press, is approved by the GBC body as the foundational
                  document on this topic;
                </p>
                <p>
                  Whereas the booklet is now available for free download on the
                  website {""}
                  <a
                    href="https://founderacharya.com/"
                    className="underline hover:underline-offset-2 font-bold"
                    target="_blank"
                  >
                    www.founderacharya.com
                  </a>
                </p>
                <p>
                  Whereas making the booklet widely available is essential for
                  the future of ISKCON, because establishing Srila Prabhupada's
                  position of Founder-Acarya will benefit devotees generation
                  after generation
                </p>
                <p className="font-bold">RESOLVED:</p>
                <p>
                  That every ISKCON project website should have a link to{" "}
                  <a
                    href="https://founderacharya.com/"
                    className="underline hover:underline-offset-2 font-bold"
                    target="_blank"
                  >
                    www.founderacharya.com
                  </a>
                </p>
                <p>
                  As the committee had accomplished its initial mandate,
                  attention turned to developing educational efforts. His Grace
                  Suresvara Prabhu developed a workshop and began to present it
                  around the world.
                </p>
                <p>
                  However, with the sudden departure of Bhakti Caru Maharaj, who
                  was the leading coordinator, the committee was basically wound
                  up, considering its primary mandate fulfilled.
                </p>
                <p>
                  Meanwhile, the COVID-19 pandemic and other factors led to a
                  transition for the GBC Strategic Planning Team (SPT), which
                  had been facilitating various GBC strategic initiatives.
                </p>
                <p>
                  By the end of 2024, a new team was in place and had identified
                  strategic initiatives to focus on. One of the most prominent
                  is to continue the work that the SPPC began.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>THE NEW EFFORT</AccordionTrigger>
            <AccordionContent>
              <div className="relative">
                <div className="float-right ml-4 mb-4 lg:ml-32 lg:mb-10 w-full max-w-[200px] md:max-w-[250px] lg:max-w-[300px]">
                  <Image
                    src="https://ik.imagekit.io/opiwak7mf/Prabhupada_Network/AboutUs/AboutUs2.svg?updatedAt=1760084514057"
                    alt="About Us"
                    width={300}
                    height={300}
                    className="w-full h-auto rounded-lg object-contain"
                  />
                </div>
                <div className="content-text gap-4 flex flex-col">
                  <p>
                    To give it new life and urgency, the initiative has been
                    named {""}
                    <span className="font-bold">
                      Srila Prabhupada Connection,
                    </span>{" "}
                    Here are the strategic vision and mission:
                  </p>
                  <p className="font-bold">Vision Statement</p>
                  <p>
                    A globally inspired and enlivened ISKCON community deeply
                    and personally connected to Śrīla Prabhupāda and the
                    paramparā, ensuring Śrīla Prabhupāda’s enduring presence as
                    the Founder-Ācārya in the heart and practice of every
                    devotee across present and future generations.
                  </p>
                </div>
              </div>
              <div className="mt-4 gap-4 flex flex-col">
                <p className="font-bold">Mission Statement</p>
                <p>
                  To cultivate and strengthen the personal connection between
                  ISKCON members and Śrīla Prabhupāda through events,
                  publications, education, websites, and social media, and
                  support of global, local, and individual initiatives that
                  deepen appreciation, understanding, and connection to Śrīla
                  Prabhupāda within ISKCON and the world.
                </p>
                <p>
                  In pursuance of this mission, the SPT has formed the Srila
                  Prabhupada Connection Seva Team, drawing from devotees
                  worldwide. There are currently 12 members of the team focusing
                  on these core areas of effort:
                </p>
                <p>
                  <span className="font-bold">Position:</span> Reviewing and
                  clarifying, and then promoting the existing document,
                  including a simplified version, along with developing further
                  documents on Srila Prabhupada’s position.
                </p>
                <p>
                  <span className="font-bold">Websites and Social Media:</span>
                  Revitalize existing websites and social media pages and
                  promote them to their respective audiences.
                </p>
                <p>
                  <span className="font-bold">Education:</span>Create and
                  introduce courses, competitions, and book study campaigns on
                  Srila Prabhupada. This includes conducting surveys and focus
                  groups to identify areas of weakness in understanding and
                  connecting with Srila Prabhupada amongst ISKCON members.
                </p>
                <p>
                  <span className="font-bold">Events:</span>
                  Taking a leading role in developing a global strategy and
                  supporting activities for observing the 60th anniversary of
                  Srila Prabhupada, incorporating ISKCON in New York City in
                  2025, and the 50th anniversary of Srila Prabhupada’s Tirobhava
                  in 2027. This will include training and resources for ongoing
                  events, like Vyasa-puja, and promoting other regional and
                  local events, like the Srila Prabhupada Connect days organized
                  in Sri Mayapur.
                </p>
                <p>
                  <span className="font-bold">Collaboration:</span>
                  Working with other projects like Vanipedia, the Srila
                  Prabhupada movie, and the Srila Prabhupada memories series, as
                  well as promoting and supporting local teams like the Mayapur
                  team. This also includes exploring ways to secure ongoing
                  access to the wealth of literature, video material, and other
                  content about Srila Prabhupada produced independently of the
                  BBT.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>MOVING FORWARD</AccordionTrigger>
            <AccordionContent>
              <div className="relative">
                <div className="float-right ml-4 mb-4 lg:ml-32 lg:mb-10 w-full max-w-[200px] md:max-w-[250px] lg:max-w-[300px]">
                  <Image
                    src="https://ik.imagekit.io/opiwak7mf/Prabhupada_Network/AboutUs/AboutUs3.svg?updatedAt=1760084514245"
                    alt="About Us"
                    width={300}
                    height={300}
                    className="w-full h-auto rounded-lg object-contain"
                  />
                </div>
                <div className="content-text gap-4 flex flex-col">
                  <p>
                    The
                    <span className="font-bold">
                      Srila Prabhupada Connection Seva Team
                    </span>{" "}
                    is currently meeting regularly and making progress in each
                    of these areas.
                  </p>
                  <p>
                    For the significant event of the{" "}
                    <span className="font-bold">
                      50th anniversary of Srila Prabhupada’s Tirobhava,
                    </span>{" "}
                    the Srila Prabhupada Connection team is connected with the
                    60 50 Global Commemoration Committee, recently established
                    by the GBC, to support both{" "}
                    <span className="font-bold">
                      ISKCON’s 60th anniversary and Srila Prabhupada’s Tirobhava
                      50th anniversary.
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-4 gap-4 flex flex-col">
                <p>
                  We welcome participation from more devotees eager to achieve
                  the vital mission of this initiative.
                </p>
                <p className="font-bold mb-4">
                  The Srila Prabhupada Connection - Mayapur Seva Team will
                  arrange:
                </p>
                <ul className="space-y-3 list-none pl-0">
                  <li>
                    <span className="font-semibold">Courses and Retreats:</span>
                    <ul className="mt-1 space-y-1 list-disc pl-6">
                      <li>Śrīla Prabhupāda Introductory Course</li>
                      <li>The Founder-Acharya Course</li>
                    </ul>
                  </li>
                  <li>
                    <span className="font-semibold">
                      Śrīla Prabhupāda Connect Days and Mahotsavas:
                    </span>
                    <p className="mt-1">
                      Events featuring senior devotees, cultural programs, and
                      competitions
                    </p>
                  </li>
                  <li>
                    <span className="font-semibold">
                      Srila Prabhupada Connection - Mayapur website and social
                      media:
                    </span>
                    <p className="mt-1">
                      Promoting events and weekly podcasts featuring senior
                      Vaishnavas from around the world
                    </p>
                  </li>
                  <li>
                    <span className="font-semibold">
                      Developing a replicable model:
                    </span>
                    <p className="mt-1">
                      For other communities to implement, thus assisting in
                      strengthening Śrīla Prabhupāda's teachings and mission
                    </p>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col items-center mt-2 font-urbanist">
        <h1 className="text-3xl  text-[#16717F] m-2">Mayapur Seva Team</h1>
        <div className="grid sm:grid-col-2 md:grid-col-3 m-4 lg:grid-col-4 text-white">
          {TEAM_MEMBERS.map((MEMBER) => (
            <div
              key={MEMBER.name}
              className={`${
                MEMBER.index % 2 ? "bg-[#16717F] " : "bg-[#164B7F]"
              }px-4 pt-4 pb-2 rounded-[50] flex flex-col items-center gap-2 w-48 sm:w-56 md:w-64`}
            >
              <div className="flex flex-col gap-2">
                <Image
                  src={MEMBER.imgUrl}
                  className=""
                  alt={MEMBER.name}
                  width={220}
                  height={120}
                />
                <span className="text-2xl text-center ">{MEMBER.name}</span>
              </div>
              <span className="text-xs text-center">{MEMBER.description}</span>
              <Image
                src="https://ik.imagekit.io/opiwak7mf/Prabhupada_Network/AboutUs/lotus.png?updatedAt=1760091317811"
                className=""
                alt={MEMBER.name}
                width={40}
                height={40}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <Image
          src="https://ik.imagekit.io/opiwak7mf/Prabhupada_Network/AboutUs/aboutUSBottom.svg?updatedAt=1760090571596"
          className="w-full rounded-xl"
          alt="aboutUs bottom"
          width={220}
          height={120}
        />
      </div>
    </div>
  );
}

// <div className="flex flex-col items-center text-xl text-[#16717F] bg-[#E4E9E9] rounded-b-[50]">
//         <div className="flex flex-col items-center text-2xl font-light font-SubHeading">
//           <span>Strengthening Our Spiritual Bonds</span>
//           <span>with Srila Prabhupada</span>
//         </div>
//         <Image
//           src="lotus.svg"
//           alt="lotus"
//           width={100}
//           height={20}
//           className=""
//         />
//         <div className="flex flex-col items-center">
//           <span className=" font-extrabold ">
//             Srila Prabhupada Connection - Mayapur Seva Team
//           </span>
//           <span>is part of the global</span>
//         </div>
//         <div className="flex flex-col items-center">
//           <span className=" font-extrabold">
//             Srila Prabhupada Connection - Seva Team
//           </span>
//           <span>described in the following overview</span>
//         </div>
//         <div>
//           <Image
//             src="/SPCM_Logo.png"
//             alt="SPCM_Logo"
//             width={150}
//             height={150}
//           />
//         </div>
//       </div>
//       <div>
//         <Image src="/SPCM_Logo.png" alt="SPCM_Logo" width={150} height={150} />
//       </div>
// <div className="bg-bgApp mt-4 text-gray-800">
//   {/* Banner Section */}
//   <div className="relative rounded-2xl isolate w-full h-60 md:h-72 flex items-center justify-center overflow-hidden">
//     <img
//       src="https://ik.imagekit.io/opiwak7mf/Prabhupada_Network/About-us(PN).webp?updatedAt=1754812796023"
//       alt="AboutUs Image"
//       className="absolute inset-0 h-full w-full object-cover"
//     />
//     <div className="absolute inset-0 bg-gradient-to-r from-primary2/85 to-orange-400/70 mix-blend-multiply" />
//     <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden md:block">
//       <div className="h-40 w-40 rounded-full bg-white/10 blur-3xl" />
//     </div>
//     <div className="relative z-10 text-center px-4">
//       <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-tight">
//         Srila Prabhupada Connection Mayapur: Strengthening Our Spiritual
//         Bonds
//       </h1>
//     </div>
//   </div>

//   {/* Content Section */}
//   <section className="bg-bgApp2 mt-2 rounded-2xl px-6 py-12 text-lg text-fontApp leading-relaxed">
//     <p>
//       Understanding the importance of profoundly connecting with Śrīla
//       Prabhupāda, strengthening our relationships with our śikṣā and
//       dīkṣā-gurus, and embracing Prabhupāda's desire that we cooperate in
//       his physical absence, the Srila Prabhupāda Connection Team will
//       facilitate:
//     </p>

//     <ul className="list-disc list-inside mt-6 space-y-4">
//       <li>
//         <strong>Enhanced care for devotees and community building</strong>:
//         We will arrange in September and October, 2025 the Devotee Care
//         Course offered by Radha Gopinath and Damodar Prabhus, as well as the
//         Community Development Course offered by Sridham Prabhu and Kisori
//         Mataji.
//       </li>
//       <li>
//         <strong>Additional courses</strong>: Launched the Śrīla Prabhupāda Introductory Course in July, 2025.
//       </li>
//       <li>
//         <strong>Śrīla Prabhupāda Connect Days</strong>: Events featuring
//         senior devotees, cultural programs, and competitions, scheduled as
//         follows:
//         <ul className="list-disc list-inside ml-6">
//           <li>February 20, 2025 – Gaura Purnima Festival (English)</li>
//           <li>March 13, 2025 – Gaura Purnima Festival (Bengali)</li>
//           <li>August 17, 2025 – Śrīla Prabhupāda’s Vyāsa-pūjā</li>
//           <li>October 25, 2025 – Śrīla Prabhupāda’s Tirobhāva</li>
//         </ul>
//       </li>
//       <li>
//         <strong>
//           Srila Prabhupada Connection - Mayapur website and social media
//         </strong>
//         : Promoting events and weekly podcasts featuring senior Vaiṣṇavas
//         worldwide.
//       </li>
//       <li>
//         <strong>Developing a replicable model</strong> for other communities
//         to implement, assisting in strengthening Śrīla Prabhupāda’s
//         teachings and mission.
//       </li>
//     </ul>
//   </section>

//   {/* Call to Action */}
//   <section className="bg-bgApp2 mt-2 text-fontApp py-10 text-center rounded-2xl bg">
//     <h2 className="text-3xl font-semibold">Join Us</h2>
//     <p className="max-w-3xl mx-auto text-lg mt-4">
//       Be part of the movement! Connect with us, attend courses, and help
//       spread Śrīla Prabhupāda’s teachings.
//     </p>
//     <div className="flex justify-center">
//       <Button
//         onClick={() => setOpenModal(!openModal)}
//         className="bg-primary2"
//       >
//         Get Involved
//       </Button>
//     </div>
//     <DataInsertModal
//       openModal={openModal}
//       onCloseModal={() => setOpenModal(false)}
//       title="Join-Us"
//       fields={JoinUsFields}
//     />
//   </section>

//   {/* Team */}
//   <section className="bg-bgApp2 flex flex-col md:flex-row justify-center  mt-2 rounded-2xl text-fontApp">
//     <div className="flex flex-col items-center p-2 md:w-1/4">
//       <img
//         src="https://ik.imagekit.io/opiwak7mf/Prabhupada_Network/AboutUs/HG_Ramanipati_Pr.webp?updatedAt=1743596499872"
//         className="w-32 h-36 rounded-2xl"
//       />
//       <div className="flex flex-col items-center">
//         <div className="font-extrabold text-center">Ramanipati Prabhu</div>
//         <div className="font-extralight">COMPETITIONS</div>
//         <div className="text-center">
//           Competitions Cultural Events Facilitate Meetings Onsite Promotions
//         </div>
//       </div>
//     </div>
//     <div className="flex flex-col items-center p-2 md:w-1/4">
//       <img
//         src="https://ik.imagekit.io/opiwak7mf/Prabhupada_Network/AboutUs/WhatsApp%20Image%202025-08-14%20at%2019.18.05.jpeg?updatedAt=1755328650858"
//         className="w-32 h-36 rounded-2xl"
//       />
//       <div className="flex flex-col items-center">
//         <div className="font-extrabold text-center">Janmastami Dasa</div>
//         <div className="font-extralight">Team Servant</div>
//         <div>Team Servant</div>
//       </div>
//     </div>
//     <div className="flex flex-col items-center p-2 md:w-1/4">
//       <img
//         src="https://ik.imagekit.io/opiwak7mf/Prabhupada_Network/AboutUs/HG_Krishna_Vijay_Pr.webp?updatedAt=1743596500054"
//         className="w-32 h-36 rounded-2xl"
//       />
//       <div className="flex flex-col items-center">
//         <div className="font-extrabold text-center">
//           Krishna Vijay Prabhu
//         </div>
//         <div className="font-extralight">Event Managment</div>
//         <div>Event Managment</div>
//       </div>
//     </div>
//   </section>
// </div>
