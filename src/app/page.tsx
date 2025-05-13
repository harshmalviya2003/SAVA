"use client";

import Footer from "@/components/footer/footer";
import Hero from "@/components/Home/Hero";
import ProblemSection from "@/components/Home/probem";
import ReservationSection from "@/components/Home/ReservationSection";
import SolutionSection from "@/components/Home/solution";
import SplitTextAnimationWithStyles from "@/components/Home/text";

import AdvancedVisionSection from "@/components/Home/vision";
export default function Home() {
  return (
    <main className="min-h-screen pt-20">
      <Hero/>
      <SplitTextAnimationWithStyles/>
      <AdvancedVisionSection/>
      <ProblemSection/>
      <SolutionSection/>
      <ReservationSection/>
      <Footer/>
      
    </main>
  );
}