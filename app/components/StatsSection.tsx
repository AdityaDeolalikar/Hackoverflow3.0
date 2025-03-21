import React, { useEffect, useState, useRef } from 'react';

const StatsSection = () => {
  const [treesPlanted, setTreesPlanted] = useState(0);
  const [communitiesEmpowered, setCommunitiesEmpowered] = useState(0);
  const [carbonSequestration, setCarbonSequestration] = useState(0);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const duration = 2000; // 2 seconds
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

  // SVG Icons
  const TreeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 14v6m-3-3h6M8 9l4-4 4 4M8 9v10a1 1 0 001 1h6a1 1 0 001-1V9" />
    </svg>
  );

  const CommunityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );

  const LeafIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22l10-10m10-10l-10 10m-9-1l9-9c3-3 7.5-2.5 9.5 1.5a9 9 0 0 1-6 12.5c-4 1-7.5-.5-9.5-3.5l-3-6z" />
    </svg>
  );

  // Custom stat element to reduce repetition
  const StatElement = ({ value, label, icon }: { value: number, label: string, icon: React.ReactNode }) => (
    <div className="w-full md:w-1/3 px-4 py-6 transition-all duration-300 hover:scale-105">
      <div className="flex flex-col items-center justify-center">
        <div className="text-green-500 mb-3">
          {icon}
        </div>
        <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent mb-2">
          {value.toLocaleString()}+
        </h3>
        <p className="text-lg sm:text-xl text-gray-700 font-medium">{label}</p>
      </div>
    </div>
  );

  // Divider component
  const Divider = () => (
    <div className="hidden md:block w-px bg-gray-400 h-32 mx-2" style={{ width: '2px' }}></div>
  );

  return (
    <div ref={sectionRef} className="w-full py-12 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center text-center gap-8 md:gap-4">
          <StatElement value={treesPlanted} label="Trees Planted" icon={<TreeIcon />} />
          
          <Divider />
          
          <StatElement value={communitiesEmpowered} label="Communities Empowered" icon={<CommunityIcon />} />
          
          <Divider />
          
          <StatElement value={carbonSequestration} label="Tons of CO₂ Sequestered" icon={<LeafIcon />} />
        </div>
      </div>
    </div>
  );
};

export default StatsSection; 