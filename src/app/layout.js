import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "HF Realtors | Smart Property Decisions",
  description: "Smart property decisions. Long-term wealth creation. Real estate advisory and wealth planning.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${playfair.variable} font-sans antialiased bg-[#163548] text-[#EDEDED]`}>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
