import { Poppins } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata = {
  title: "HF Realtors | Smart Property Decisions",
  description: "Smart property decisions. Long-term wealth creation. Real estate advisory and wealth planning.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased bg-[#1A1A1A] text-[#F9F8F6]`}>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
