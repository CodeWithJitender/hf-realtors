import ServicesHero from '@/components/ServicesHero';
import HowWeEngage from '@/components/HowWeEngage';

export const metadata = {
  title: 'Services | HF Realtors',
  description: 'Explore our comprehensive range of real estate advisory and wealth planning services.',
};

export default function ServicesPage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#163548] text-[#EDEDED] font-sans overflow-hidden">
      <ServicesHero />
      <HowWeEngage />
    </main>
  );
}
