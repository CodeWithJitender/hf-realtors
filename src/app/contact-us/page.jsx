import ContactHero from "@/components/ContactHero";

export const metadata = {
  title: "Contact Us | HF Realtors",
  description: "Get in touch with HF Realtors for bespoke real estate advisory and portfolio management services.",
};

export default function ContactUsPage() {
  return (
    <main className="flex flex-col min-h-screen 'Helvetica Neue', Helvetica, Arial, sans-serif overflow-hidden">
      <ContactHero />
    </main>
  );
}
