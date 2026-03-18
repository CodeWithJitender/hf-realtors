import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import { PreloaderProvider } from "@/context/PreloaderContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "HF Realtors | Smart Property Decisions",
  description: "Smart property decisions. Long-term wealth creation. Real estate advisory and wealth planning.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} antialiased`} style={{ backgroundColor: "#0A1628", color: "#FFFFFF" }}>
        <PreloaderProvider>
          <SmoothScrollProvider>
            <Preloader />
            <Header />
            {children}
            <Footer />
          </SmoothScrollProvider>
        </PreloaderProvider>
      </body>
    </html>
  );
}
