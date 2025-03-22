'use client'
import { useState } from 'react';
import Link from 'next/link';

const Navbar = ({ toggleSidebar }) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-green-800 text-2xl font-bold">Van Rakshak</div>
      <div className="flex items-center">
        <div className="relative ml-4">
          <button 
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-800">
              <span className="text-lg">👤</span>
            </div>
            <span className="hidden md:block text-gray-700">John Doe</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <Link href="/dashboard/profile">
                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Your Profile
                </div>
              </Link>
              <Link href="/dashboard/settings">
                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Settings
                </div>
              </Link>
              <div className="border-t border-gray-100"></div>
              <Link href="/login">
                <div className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer">
                  Sign out
                </div>
              </Link>
            </div>
          )}
        </div>
        <button className="text-green-800 md:hidden ml-4" onClick={toggleSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

const Sidebar = ({ isOpen, toggleSidebar }) => (
  <div className={`fixed inset-y-0 left-0 bg-white shadow-lg p-4 transform ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 w-16'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-64 z-50`}>
    <button className="text-green-800 md:hidden" onClick={toggleSidebar}>
      {isOpen ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )}
    </button>
    <ul className="mt-8">
      <Link href="/dashboard">
        <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 rounded-lg cursor-pointer">
          <span className="mr-2">📊</span> <span className={`${isOpen ? 'inline' : 'hidden md:inline'}`}>Dashboard</span>
        </li>
      </Link>
      <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 rounded-lg cursor-pointer mt-2 bg-green-100">
        <span className="mr-2">🌳</span> <span className={`${isOpen ? 'inline' : 'hidden md:inline'}`}>Tree selection and plantation</span>
      </li>
      
      <Link href="/dashboard/report">
        <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 rounded-lg cursor-pointer mt-2">
          <span className="mr-2">📄</span> <span className={`${isOpen ? 'inline' : 'hidden md:inline'}`}>Report</span>
        </li>
      </Link>
      
      <Link href="/dashboard/community">
        <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 rounded-lg cursor-pointer mt-2">
          <span className="mr-2">👥</span> <span className={`${isOpen ? 'inline' : 'hidden md:inline'}`}>Community Engagement</span>
        </li>
      </Link>
    </ul>
  </div>
);

const TreeCard = ({ name, scientificName, image, growthRate, carbonSeq, suitableClimate }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <div className="h-48 bg-gray-200 relative">
      <div className="absolute inset-0 flex items-center justify-center text-4xl">{image}</div>
    </div>
    <div className="p-4">
      <h3 className="text-xl font-semibold text-green-800">{name}</h3>
      <p className="text-sm text-gray-600 italic mb-3">{scientificName}</p>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-700">Growth Rate:</span>
          <span className="text-sm font-medium">{growthRate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-700">Carbon Sequestration:</span>
          <span className="text-sm font-medium">{carbonSeq}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-700">Suitable Climate:</span>
          <span className="text-sm font-medium">{suitableClimate}</span>
        </div>
      </div>
      <button className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
        Select Tree
      </button>
    </div>
  </div>
);

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [climateFilter, setClimateFilter] = useState('All');

  const regions = ['All', 'North', 'South', 'East', 'West', 'Central'];
  const climates = ['All', 'Tropical', 'Temperate', 'Mediterranean', 'Continental', 'Arid'];

  const treeData = [
    {
      name: 'Oak',
      scientificName: 'Quercus spp.',
      image: '🌳',
      growthRate: 'Medium',
      carbonSeq: 'High',
      suitableClimate: 'Temperate',
    },
    {
      name: 'Pine',
      scientificName: 'Pinus spp.',
      image: '🌲',
      growthRate: 'Fast',
      carbonSeq: 'Medium',
      suitableClimate: 'Continental',
    },
    {
      name: 'Maple',
      scientificName: 'Acer spp.',
      image: '🍁',
      growthRate: 'Medium',
      carbonSeq: 'Medium',
      suitableClimate: 'Temperate',
    },
    {
      name: 'Cedar',
      scientificName: 'Cedrus spp.',
      image: '🌲',
      growthRate: 'Slow',
      carbonSeq: 'High',
      suitableClimate: 'Mediterranean',
    },
    {
      name: 'Eucalyptus',
      scientificName: 'Eucalyptus spp.',
      image: '🌿',
      growthRate: 'Very Fast',
      carbonSeq: 'Medium',
      suitableClimate: 'Tropical',
    },
    {
      name: 'Birch',
      scientificName: 'Betula spp.',
      image: '🌳',
      growthRate: 'Fast',
      carbonSeq: 'Low',
      suitableClimate: 'Continental',
    },
  ];

  const filteredTrees = treeData.filter(tree => 
    (climateFilter === 'All' || tree.suitableClimate === climateFilter)
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Tree Selection</h1>
          
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Climate Type</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={climateFilter}
                  onChange={(e) => setClimateFilter(e.target.value)}
                >
                  {climates.map((climate) => (
                    <option key={climate} value={climate}>{climate}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Tree Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrees.map((tree, index) => (
              <TreeCard key={index} {...tree} />
            ))}
          </div>
          
          {/* Plantation Planning */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Plantation Planning</h2>
            <p className="text-gray-600 mb-4">
              Select trees from the catalog above to add them to your plantation plan. 
              Our system will analyze your selections and provide planting recommendations.
            </p>
            <div className="flex justify-end">
              <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300">
                Create Plantation Plan
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
