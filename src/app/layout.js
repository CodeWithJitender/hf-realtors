import "./globals.css";
import Preloader from "@/components/Preloader";
import { PreloaderProvider } from "@/context/PreloaderContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export const metadata = {
  title: "HF Realtors | Smart Property Decisions",
  description: "Smart property decisions. Long-term wealth creation. Real estate advisory and wealth planning.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ backgroundColor: "#0A1628", color: "#FFFFFF", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
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
