import EventSection from "@/components/EventSection";
import { BlogSection } from "@/components/BlogSection";
import DonationForm from "@/components/DonationForm";
import QuotesSection from "@/components/QuotesSection";

export default function App() {
  return (
    <div className="flex flex-col mt-4 gap-componentSpacing">
      <QuotesSection />
      <EventSection />
      <BlogSection />
      <DonationForm />
    </div>
  );
}
