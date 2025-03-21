'use client'
import { useState } from 'react';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => (
  <nav className="bg-white shadow-md p-4 flex justify-between items-center">
    <div className="text-green-800 text-lg font-bold">Brand</div>
    <button className="text-green-800 md:hidden" onClick={toggleSidebar}>
      Menu
    </button>
  </nav>
);

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => (
  <div className={`fixed inset-y-0 left-0 bg-white shadow-lg p-4 transform ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-16'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
    <button className="text-green-800 md:hidden" onClick={toggleSidebar}>
      {isOpen ? '🔒' : '🔓'}
    </button>
    <ul className="mt-8">
      <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 cursor-pointer">
        <span className="mr-2">🌳</span> {isOpen && 'Tree selection and plantation'}
      </li>
      <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 cursor-pointer">
        <span className="mr-2">📊</span> {isOpen && 'Environmental monitoring'}
      </li>
      <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 cursor-pointer">
        <span className="mr-2">🌿</span> {isOpen && 'Carbon Sequestration'}
      </li>
      <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 cursor-pointer">
        <span className="mr-2">💧</span> {isOpen && 'Water allocation Report'}
      </li>
      <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 cursor-pointer">
        <span className="mr-2">🌾</span> {isOpen && 'Crop suitability'}
      </li>
      <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 cursor-pointer">
        <span className="mr-2">👥</span> {isOpen && 'Community'}
      </li>
    </ul>
  </div>
);

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 bg-gray-100 p-4">
          {/* Main content goes here */}
        </main>
      </div>
    </div>
  );
};

export default Page;
