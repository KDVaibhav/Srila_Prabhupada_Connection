import EventSection from "@/components/EventSection";
import QuotesSection from "@/components/QuotesSection";
import { BlogSection } from "@/components/BlogSection";
import DonationForm from "@/components/DonationForm";
import ContactUsSection from "@/components/ContactUsSection";
import PromotionSection from "@/components/PromotionSection";
import HeroVideo from "@/components/HeroVidoe";

export default function App() {
  return (
    <div className="flex flex-col mt-4 gap-componentSpacing">
      <div className="flex md:flex-row-reverse flex-col gap-componentSpacing ">
        <HeroVideo />
        <QuotesSection />
      </div>
      <PromotionSection />
      {/* <FlipCalendar/> */}
      <EventSection />
      <BlogSection />
      <DonationForm />
    </div>
  );
}
