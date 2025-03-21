import React, { useEffect, useState, useRef } from 'react';
import StatsSection from './StatsSection';

const ImpactSection = () => {
  const [treesPlanted, setTreesPlanted] = useState(0);
  const [communitiesEmpowered, setCommunitiesEmpowered] = useState(0);
  const [landRestored, setLandRestored] = useState(0);
  const [waterSaved, setWaterSaved] = useState(0);
  const [farmersBenefited, setFarmersBenefited] = useState(0);
  const [carbonSequestration, setCarbonSequestration] = useState(0);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const duration = 3000; // 2 seconds
    const frameDuration = 1000 / 60; // 60 frames per second
    const totalFrames = Math.round(duration / frameDuration);

    const countUp = (setFunction: React.Dispatch<React.SetStateAction<number>>, targetValue: number) => {
      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentValue = Math.round(targetValue * progress);
        setFunction(currentValue);

        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, frameDuration);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          countUp(setTreesPlanted, 300);
          countUp(setCommunitiesEmpowered, 150);
          countUp(setLandRestored, 500);
          countUp(setWaterSaved, 1000000);
          countUp(setFarmersBenefited, 200);
          countUp(setCarbonSequestration, 10000);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div id="impact">
      {/* Stats Section with 3 key stats and dividers */}
      
      {/* Main Impact Section */}
      <div ref={sectionRef} className="mt-10">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-green-600 text-center font-bold px-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Our Impact: Growing a Greener Tomorrow, Today.
          </h2>
        </div>
        
      <StatsSection />
      </div>
    </div>
  );
};

export default ImpactSection; 