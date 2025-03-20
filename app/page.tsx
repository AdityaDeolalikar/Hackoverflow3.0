// 
// Import the video as a static asset
'use client'
import { Navbar } from "./components/Navbar"
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImpactSection from "./components/ImpactSection";
import KeyFeatures from "./components/KeyFeatures";
import Testimonials from "./components/Testimonials";
import { Footer } from "./components/Footer";
gsap.registerPlugin(ScrollTrigger); 

export default function Home() {
  useEffect(() => {
    gsap.fromTo(
      ".number",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".number",
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <>
      <div className="relative">
        <div className="relative w-full h-screen">
          <video
            // Use a string path instead of the imported module
            src="/videos/sample2.mp4"
            autoPlay
            loop
            muted
            className="w-full h-screen object-cover"
          />
          <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
            <h1 className="text-white text-center font-bold px-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
              Reimagine Reforestation: Intelligent Solutions for a Sustainable Future.
            </h1>
            <p className="text-white/90 text-center font-medium px-4 max-w-4xl text-base sm:text-lg md:text-xl lg:text-2xl">
              Empowering communities and farmers with data-driven insights for sustainable reforestation and agriculture.
            </p>
            <button 
              onClick={() => window.location.href = '/Mainmaps'}
              className="mt-8 px-6 py-3 text-base sm:text-lg md:text-xl bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out border-2 border-green-500 hover:border-green-600 cursor-pointer"
            >
              Explore the Map & Plant Now
            </button>
          </div>
        </div>
        <Navbar />
        <ImpactSection />
        <KeyFeatures />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
}
