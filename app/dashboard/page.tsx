'use client'
import { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => (
  <nav className="bg-white shadow-md p-4 flex justify-between items-center">
    <div className="text-green-800 text-2xl font-bold">EcoForest</div>
    <button className="text-green-800 md:hidden" onClick={toggleSidebar}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </nav>
);

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => (
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
      <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 rounded-lg cursor-pointer bg-green-100">
        <span className="mr-2">📊</span> <span className={`${isOpen ? 'inline' : 'hidden md:inline'}`}>Dashboard</span>
      </li>
      <Link href="/dashboard/tree-selection">
        <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 rounded-lg cursor-pointer mt-2">
          <span className="mr-2">🌳</span> <span className={`${isOpen ? 'inline' : 'hidden md:inline'}`}>Tree selection and plantation</span>
        </li>
      </Link>
      <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 rounded-lg cursor-pointer mt-2">
        <span className="mr-2">🌡️</span> <span className={`${isOpen ? 'inline' : 'hidden md:inline'}`}>Microclimate</span>
      </li>
      <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 rounded-lg cursor-pointer mt-2">
        <span className="mr-2">📄</span> <span className={`${isOpen ? 'inline' : 'hidden md:inline'}`}>Report</span>
      </li>
      <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 rounded-lg cursor-pointer mt-2">
        <span className="mr-2">🎓</span> <span className={`${isOpen ? 'inline' : 'hidden md:inline'}`}>Certificates</span>
      </li>
      <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 rounded-lg cursor-pointer mt-2">
        <span className="mr-2">👥</span> <span className={`${isOpen ? 'inline' : 'hidden md:inline'}`}>Community Engagement</span>
      </li>
    </ul>
  </div>
);

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  subtext?: string;
}

const StatCard = ({ title, value, icon, subtext }: StatCardProps) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
    <div className="flex items-center mb-4">
      <span className="text-2xl mr-3">{icon}</span>
      <h3 className="text-gray-700 font-medium text-sm uppercase">{title}</h3>
    </div>
    <div className="mt-auto">
      <p className="text-3xl font-bold text-green-800">{value}</p>
      {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
    </div>
  </div>
);

interface ProgressCardProps {
  title: string;
  percentage: number;
  color: string;
}

const ProgressCard = ({ title, percentage, color }: ProgressCardProps) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h3 className="text-gray-700 font-medium text-sm uppercase mb-2">{title}</h3>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className={`h-2.5 rounded-full ${color}`} 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
    <p className="text-right mt-1 text-sm text-gray-500">{percentage}%</p>
  </div>
);

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard = ({ title, children }: ChartCardProps) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h3 className="text-gray-700 font-medium text-sm uppercase mb-4">{title}</h3>
    <div className="mt-2">
      {children}
    </div>
  </div>
);

interface DataTableProps {
  title: string;
  headers: string[];
  data: string[][];
}

const DataTable = ({ title, headers, data }: DataTableProps) => (
  <div className="bg-white rounded-xl shadow-md p-6 overflow-hidden">
    <h3 className="text-gray-700 font-medium text-sm uppercase mb-4">{title}</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, i) => (
              <th key={i} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Mock data visualization component (in a real app, you would use a charting library)
const MockBarChart = () => (
  <div className="flex items-end space-x-2 h-40">
    <div className="w-1/6 h-1/4 bg-green-300 rounded-t-lg"></div>
    <div className="w-1/6 h-2/4 bg-green-400 rounded-t-lg"></div>
    <div className="w-1/6 h-3/4 bg-green-500 rounded-t-lg"></div>
    <div className="w-1/6 h-1/3 bg-green-600 rounded-t-lg"></div>
    <div className="w-1/6 h-1/2 bg-green-700 rounded-t-lg"></div>
    <div className="w-1/6 h-4/5 bg-green-800 rounded-t-lg"></div>
  </div>
);

const MockPieChart = () => (
  <div className="flex justify-center">
    <div className="w-32 h-32 rounded-full border-8 border-green-500 border-r-green-300 border-b-green-700 border-l-green-600"></div>
  </div>
);

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Reforestation Dashboard</h1>
          
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard 
              title="Total Trees Planted" 
              value="158,342" 
              icon="🌳" 
              subtext="+12,456 this year"
            />
            <StatCard 
              title="Area Covered" 
              value="127 ha" 
              icon="📏" 
              subtext="1,000 trees/ha"
            />
            <StatCard 
              title="Species Count" 
              value="27" 
              icon="🌿" 
              subtext="85% native species"
            />
            <StatCard 
              title="Survival Rate" 
              value="92%" 
              icon="📈" 
              subtext="After first year"
            />
          </div>
          
          {/* Middle Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <ChartCard title="Annual Planting Rate">
              <MockBarChart />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>2018</span>
                <span>2019</span>
                <span>2020</span>
                <span>2021</span>
                <span>2022</span>
                <span>2023</span>
              </div>
            </ChartCard>
            <ChartCard title="Species Diversity">
              <MockPieChart />
              <div className="grid grid-cols-2 mt-4 gap-2 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Native (85%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-300 rounded-full mr-2"></div>
                  <span>Non-native (15%)</span>
                </div>
              </div>
            </ChartCard>
          </div>
          
          {/* Progress Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <ProgressCard 
              title="Carbon Sequestration Target" 
              percentage={68} 
              color="bg-green-600"
            />
            <ProgressCard 
              title="Biodiversity Goal" 
              percentage={75} 
              color="bg-green-500"
            />
            <ProgressCard 
              title="Community Engagement" 
              percentage={92} 
              color="bg-green-700"
            />
          </div>
          
          {/* Tables Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <DataTable 
              title="Tree Species Performance"
              headers={["Species", "Count", "Survival Rate", "Growth (cm/year)"]}
              data={[
                ["Oak", "35,421", "94%", "45"],
                ["Pine", "28,652", "89%", "62"],
                ["Maple", "22,145", "91%", "38"],
                ["Cedar", "18,563", "87%", "51"],
                ["Birch", "15,721", "93%", "42"],
              ]}
            />
            <DataTable 
              title="Site Characteristics"
              headers={["Factor", "Value", "Status"]}
              data={[
                ["Soil Type", "Loamy", "Optimal"],
                ["Rainfall", "850mm/year", "Adequate"],
                ["Temperature", "15.2°C avg", "Ideal"],
                ["Humidity", "65% avg", "Good"],
                ["Elevation", "320-450m", "Varied"],
              ]}
            />
          </div>
          
          {/* Growth Metrics Chart */}
          <div className="mb-6">
            <ChartCard title="Tree Height Growth Over Time">
              <div className="h-60 w-full bg-gray-50 rounded flex items-end p-4">
                <div className="flex-1 flex items-end space-x-8">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-6 bg-green-300 rounded-t"></div>
                    <span className="text-xs mt-2">Year 1</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-20 w-6 bg-green-400 rounded-t"></div>
                    <span className="text-xs mt-2">Year 2</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-28 w-6 bg-green-500 rounded-t"></div>
                    <span className="text-xs mt-2">Year 3</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-36 w-6 bg-green-600 rounded-t"></div>
                    <span className="text-xs mt-2">Year 4</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-44 w-6 bg-green-700 rounded-t"></div>
                    <span className="text-xs mt-2">Year 5</span>
                  </div>
                </div>
              </div>
            </ChartCard>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
