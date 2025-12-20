"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import DataInsertModal from "./ui/DataInsertModal";
import { QuoteFields } from "@/app/data";
import { motion, AnimatePresence } from "framer-motion";

import { ChevronLeft, ChevronRight } from "dicons";

const QuotesSection = () => {
  const [quotes, setQuotes] = useState<
    { _id: string; quote: string; date: string; location: string }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2000);

  const { isAuthenticated } = useSelector(
    (state: { auth: { isAuthenticated: boolean } }) => state.auth
  );

  const fetchQuotes = async (day: number, month: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/quote/by-date/${month}/${day}`
      );
      setQuotes(response.data);
      setCurrentIndex(0);
    } catch (error) {
      console.error(error);
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchQuotes(day, month);
  }, [day, month]);

  useEffect(() => {
    const date = new Date();
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    setDay(day);
    setMonth(month);
    setYear(year);
    fetchQuotes(day, month);
  }, []);

  const nextQuote = async () => {
    const newDate = new Date(year, month - 1, day + 1);
    setDay(newDate.getDate());
    setMonth(newDate.getMonth() + 1);
    setYear(newDate.getFullYear());
  };

  const prevQuote = async () => {
    const newDate = new Date(year, month - 1, day - 1);
    setDay(newDate.getDate());
    setMonth(newDate.getMonth() + 1);
    setYear(newDate.getFullYear());
  };

  return (
    <div>
      <div className="relative bg-white">
        <img
          src="https://ik.imagekit.io/opiwak7mf/Prabhupada_Network/SPCMHeroImage.jpg"
          alt="SP_HERO_IMAGE"
          className="bg-cover rounded-t-xl"
        />
        <div className="absolute -bottom-24 sm:-bottom-28 md:-bottom-36 lg:-bottom-20 left-1/2 transform -translate-x-1/2 w-5/6 md:w-11/12 max-w-[800px]">
          {/* Quote Card */}
          <div className="flex flex-col items-center w-full">
            <div className="relative w-full bg-[#FCFBF9] rounded-3xl shadow-2xl border-2 border-gray-300 py-2 flex flex-col items-center">
              <h2 className="text-sm md:text-xl font-bold text-fontApp text-center">
                Srila Prabhupada Quote
              </h2>
              <div className="flex items-center justify-end w-full">
                <button
                  onClick={prevQuote}
                  disabled={loading}
                  className="transition disabled:opacity-50"
                >
                  <ChevronLeft className="h-10 w-10 text-fontApp" />
                </button>
                {/* Fixed height scrollable quote area - FIXED */}
                <div className="w-full h-14 md:h-16 mt-1 scrollbar-hide overflow-y-auto">
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <div className="flex items-center justify-center h-full w-full">
                        <div className="text-fontApp text-xs md:text-lg">
                          Loading...
                        </div>
                      </div>
                    ) : quotes.length > 0 ? (
                      <motion.div
                        key={currentIndex}
                        className="text-center text-fontApp font-urbanist text-xs md:text-lg md:px-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                      >
                        {quotes[currentIndex].quote}
                      </motion.div>
                    ) : (
                      <div className=" text-center text-fontApp font-urbanist text-xs md:text-lg md:px-2">
                        If one can please a pure devotee of the Lord, such
                        action means immediate satisfaction of the Lord, even
                        though such a person is not officially qualiﬁed to
                        receive the mercy of the Lord.
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={nextQuote}
                  disabled={loading}
                  className="transition disabled:opacity-50"
                >
                  <ChevronRight className="h-10 w-10 text-fontApp" />
                </button>
              </div>
              {/* Date & Location */}
              <div className="flex gap-1 text-xs md:text-lg text-fontApp mt-1">
                <span>
                  {quotes[currentIndex]?.date.split("T")[0] || "12-Jan-1976"},
                </span>
                <span>{quotes[currentIndex]?.location || "Boston, USA"}</span>
              </div>
            </div>

            {/* Upload Quotes Button */}
            {isAuthenticated && (
              <button
                onClick={() => setOpenModal(true)}
                className="mt-4 bg-primary2 text-white p-2 rounded-2xl shadow-md font-bold hover:text-fontApp2"
              >
                Upload Quotes
              </button>
            )}

            {/* Modal */}
            <DataInsertModal
              openModal={openModal}
              onCloseModal={() => setOpenModal(false)}
              title="Quote"
              fields={QuoteFields}
            />
          </div>
        </div>
      </div>
      <div className="h-24 sm:h-28 md:h-36 lg:h-20 bg-white rounded-b-xl" />
    </div>
  );
};

export default QuotesSection;
