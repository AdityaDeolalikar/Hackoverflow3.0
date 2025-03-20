import React, { useEffect, useState, useRef } from 'react';

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
    <div ref={sectionRef}>
      <div className="flex flex-col items-center justify-center mt-10 ">
        <h2 className="text-green-600 text-center font-bold px-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          Our Impact: Growing a Greener Tomorrow, Today.
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 px-4">
        <div className="bg-green-600 rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-4xl font-bold text-white number">{treesPlanted}+</h3>
          <p className="text-white mt-2">Trees Planted</p>
          <p className="text-white mt-2">Empowering reforestation efforts globally.</p>
        </div>
        <div className="bg-green-600 rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-4xl font-bold text-white number">{communitiesEmpowered}+</h3>
          <p className="text-white mt-2">Communities Empowered</p>
          <p className="text-white mt-2">Supporting sustainable development.</p>
        </div>
        <div className="bg-green-600 rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-4xl font-bold text-white number">{landRestored}+</h3>
          <p className="text-white mt-2">Hectares of Land Restored</p>
          <p className="text-white mt-2">Revitalizing ecosystems worldwide.</p>
        </div>
        <div className="bg-green-600 rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-4xl font-bold text-white number">{waterSaved}+</h3>
          <p className="text-white mt-2">Water Saved (Liters)</p>
          <p className="text-white mt-2">Conserving water resources efficiently.</p>
        </div>
        <div className="bg-green-600 rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-4xl font-bold text-white number">{farmersBenefited}+</h3>
          <p className="text-white mt-2">Farmers Benefited</p>
          <p className="text-white mt-2">Enhancing agricultural productivity.</p>
        </div>
        <div className="bg-green-600 rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-4xl font-bold text-white number">{carbonSequestration}+</h3>
          <p className="text-white mt-2">Carbon Sequestration (Tons)</p>
          <p className="text-white mt-2">Reducing carbon footprint effectively.</p>
        </div>
      </div>
    </div>
  );
};

export default ImpactSection; 