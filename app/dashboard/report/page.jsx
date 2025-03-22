'use client'
import { useState, useEffect, useRef } from 'react';
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
      <Link href="/dashboard/tree-selection">
        <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 rounded-lg cursor-pointer mt-2">
          <span className="mr-2">🌳</span> <span className={`${isOpen ? 'inline' : 'hidden md:inline'}`}>Tree selection and plantation</span>
        </li>
      </Link>
      
      <Link href="/dashboard/report">
        <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 rounded-lg cursor-pointer mt-2 bg-green-100">
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

// New components for the report page
const ReportCard = ({ title, icon, children }) => (
  <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
    <div className="flex items-center mb-4">
      <span className="text-2xl mr-3">{icon}</span>
      <h3 className="text-gray-700 font-semibold">{title}</h3>
    </div>
    <div className="mt-2">
      {children}
    </div>
  </div>
);

const ReportStat = ({ label, value, unit, change }) => (
  <div className="flex flex-col">
    <span className="text-gray-500 text-sm">{label}</span>
    <div className="flex items-baseline">
      <span className="text-2xl font-bold text-green-800">{value}</span>
      <span className="ml-1 text-gray-600">{unit}</span>
      {change && (
        <span className={`ml-2 text-sm ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
        </span>
      )}
    </div>
  </div>
);

const ProgressBar = ({ label, value, max, color }) => (
  <div className="mt-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="text-sm font-medium text-gray-700">{value}/{max}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className={`h-2.5 rounded-full ${color}`} 
        style={{ width: `${(value/max) * 100}%` }}
      ></div>
    </div>
  </div>
);

const ChartPlaceholder = ({ type }) => (
  <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64 w-full">
    <div className="text-center">
      <div className="text-3xl mb-2">📊</div>
      <p className="text-gray-500">{type} Chart Placeholder</p>
    </div>
  </div>
);

const ActivityTable = ({ activities }) => (
  <div className="overflow-x-auto mt-4">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {activities.map((activity, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.date}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.impact}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                activity.status === 'Completed' ? 'bg-green-100 text-green-800' :
                activity.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {activity.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ReportFilter = ({ onFilter, reportData }) => {
  const [timeframe, setTimeframe] = useState('monthly');
  const [exportFormat, setExportFormat] = useState('json');
  const [showExportOptions, setShowExportOptions] = useState(false);
  const exportDropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(event.target)) {
        setShowExportOptions(false);
      }
    }
    
    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [exportDropdownRef]);
  
  const handleChange = (e) => {
    setTimeframe(e.target.value);
    onFilter(e.target.value);
  };
  
  const handleExport = () => {
    // Create data to export based on the current timeframe
    const dataToExport = {
      timeframe,
      date: new Date().toISOString(),
      data: reportData
    };
    
    const currentDate = new Date().toLocaleDateString().replace(/\//g, '-');
    const fileName = `sustainability-report-${timeframe}-${currentDate}`;
    
    switch(exportFormat) {
      case 'json':
        exportAsJSON(dataToExport, fileName);
        break;
      case 'csv':
        exportAsCSV(dataToExport, fileName);
        break;
      case 'pdf':
        exportAsPDF(dataToExport, fileName);
        break;
      default:
        exportAsJSON(dataToExport, fileName);
    }
    
    // Close export options dropdown after export
    setShowExportOptions(false);
  };
  
  const exportAsJSON = (data, fileName) => {
    // Convert data to JSON string
    const jsonData = JSON.stringify(data, null, 2);
    
    // Create a blob and download link
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create and trigger download
    downloadFile(url, `${fileName}.json`);
  };
  
  const exportAsCSV = (data, fileName) => {
    // Convert complex data to flattened CSV
    // Header row
    let csvContent = "Category,Metric,Value,Unit,Change\n";
    
    // Carbon offset
    csvContent += `Carbon Offset,Total,${data.data.carbonOffset.total},${data.data.carbonOffset.unit},${data.data.carbonOffset.change}%\n`;
    csvContent += `Carbon Offset,Progress to Goal,${data.data.carbonOffset.total}/${data.data.carbonOffset.goal},${data.data.carbonOffset.unit},\n`;
    
    // Trees planted
    csvContent += `Trees Planted,Total,${data.data.treesPlanted.total},${data.data.treesPlanted.unit},${data.data.treesPlanted.change}%\n`;
    csvContent += `Trees Planted,Survival Rate,${data.data.treesPlanted.survivalRate},${"%"},\n`;
    
    // Biodiversity
    csvContent += `Biodiversity,Index Improvement,${data.data.biodiversityImpact.indexImprovement},${data.data.biodiversityImpact.unit},${data.data.biodiversityImpact.change}%\n`;
    csvContent += `Biodiversity,Species Recovery,${data.data.biodiversityImpact.speciesRecovery.current}/${data.data.biodiversityImpact.speciesRecovery.target},,\n`;
    
    // Water conservation
    csvContent += `Water Conservation,Water Saved,${data.data.waterConservation.saved},${data.data.waterConservation.unit},${data.data.waterConservation.change}%\n`;
    csvContent += `Water Conservation,Efficiency,${data.data.waterConservation.efficiency},${"% of goal"},\n`;
    
    // Activities section
    csvContent += "\nActivities\nDate,Activity,Impact,Status\n";
    data.data.activities.forEach(activity => {
      csvContent += `${activity.date},${activity.name},${activity.impact},${activity.status}\n`;
    });
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Create and trigger download
    downloadFile(url, `${fileName}.csv`);
  };
  
  const exportAsPDF = (data, fileName) => {
    // For PDF, we'll simply alert the user that this would generate a PDF in production
    // In a real implementation, you would use a library like jsPDF or a server-side solution
    alert("In a production environment, this would generate a PDF report with all your sustainability data.");
    
    // For demonstration purposes only - this would be replaced with actual PDF generation
    const demoText = `This is a sample PDF export for ${fileName}.pdf\n\n` +
                     `Report timeframe: ${data.timeframe}\n` +
                     `Generated on: ${new Date(data.date).toLocaleString()}\n\n` +
                     `Would contain formatted data for:\n` +
                     `- Carbon Offset: ${data.data.carbonOffset.total} ${data.data.carbonOffset.unit}\n` +
                     `- Trees Planted: ${data.data.treesPlanted.total}\n` +
                     `- Biodiversity Impact: ${data.data.biodiversityImpact.indexImprovement}%\n` +
                     `- Water Conservation: ${data.data.waterConservation.saved} liters\n` +
                     `- Activities: ${data.data.activities.length} entries\n` +
                     `- Recommendations: ${data.data.recommendations.length} items`;
    
    const blob = new Blob([demoText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create and trigger download as text (for demo only)
    downloadFile(url, `${fileName}-demo.txt`);
  };
  
  const downloadFile = (url, filename) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-green-800">Sustainability Reports</h1>
      <div className="flex gap-4">
        <select 
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={timeframe}
          onChange={handleChange}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
        
        <div className="relative" ref={exportDropdownRef}>
          <button 
            onClick={() => setShowExportOptions(!showExportOptions)}
            className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-lg flex items-center"
          >
            <span className="mr-2">📥</span> Export Report
          </button>
          
          {showExportOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="p-2">
                <div className="text-sm text-gray-700 font-medium mb-2">Export Format:</div>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-green-600"
                      name="exportFormat"
                      value="json"
                      checked={exportFormat === 'json'}
                      onChange={() => setExportFormat('json')}
                    />
                    <span className="ml-2 text-sm text-gray-700">JSON</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-green-600"
                      name="exportFormat"
                      value="csv"
                      checked={exportFormat === 'csv'}
                      onChange={() => setExportFormat('csv')}
                    />
                    <span className="ml-2 text-sm text-gray-700">CSV</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-green-600"
                      name="exportFormat"
                      value="pdf"
                      checked={exportFormat === 'pdf'}
                      onChange={() => setExportFormat('pdf')}
                    />
                    <span className="ml-2 text-sm text-gray-700">PDF</span>
                  </label>
                </div>
                
                <button 
                  onClick={handleExport}
                  className="mt-3 w-full py-2 px-4 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeframe, setTimeframe] = useState('monthly');
  
  // Mock data for demonstration
  const activities = [
    { date: '2023-05-15', name: 'Tree Planting', impact: 'Carbon reduction: 2.5 tons', status: 'Completed' },
    { date: '2023-06-02', name: 'Wildlife Monitoring', impact: 'Biodiversity index: +12%', status: 'Completed' },
    { date: '2023-06-20', name: 'Soil Restoration', impact: 'Area: 5 hectares', status: 'In Progress' },
    { date: '2023-07-10', name: 'Water Conservation', impact: 'Water saved: 15,000 liters', status: 'Planned' },
  ];

  // Prepare report data for export
  const reportData = {
    carbonOffset: {
      total: 256,
      unit: "tons",
      change: 12,
      goal: 500
    },
    treesPlanted: {
      total: 1876,
      unit: "trees",
      change: 8,
      survivalRate: 92
    },
    biodiversityImpact: {
      indexImprovement: 18.3,
      unit: "%",
      change: 5,
      speciesRecovery: {
        current: 12,
        target: 20
      }
    },
    waterConservation: {
      saved: 325000,
      unit: "liters",
      change: -3,
      efficiency: 78
    },
    activities: activities,
    recommendations: [
      {
        title: "Increase Drought-Resistant Species",
        description: "Consider planting more drought-resistant species to prepare for changing climate conditions."
      },
      {
        title: "Implement Rainwater Harvesting",
        description: "Installing rainwater harvesting systems could reduce water usage by approximately 25%."
      },
      {
        title: "Community Engagement Opportunity",
        description: "Organize a community tree planting event to increase local participation and awareness."
      }
    ]
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <ReportFilter onFilter={setTimeframe} reportData={reportData} />
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <ReportCard title="Carbon Offset" icon="🌿">
              <ReportStat label="Total" value="256" unit="tons" change={12} />
              <ProgressBar label="Progress to Annual Goal" value={256} max={500} color="bg-green-500" />
            </ReportCard>
            
            <ReportCard title="Trees Planted" icon="🌳">
              <ReportStat label="Total" value="1,876" unit="trees" change={8} />
              <ProgressBar label="Survival Rate" value={92} max={100} color="bg-green-500" />
            </ReportCard>
            
            <ReportCard title="Biodiversity Impact" icon="🦋">
              <ReportStat label="Index Improvement" value="18.3" unit="%" change={5} />
              <ProgressBar label="Species Recovery" value={12} max={20} color="bg-blue-500" />
            </ReportCard>
            
            <ReportCard title="Water Conservation" icon="💧">
              <ReportStat label="Water Saved" value="325,000" unit="liters" change={-3} />
              <ProgressBar label="Efficiency" value={78} max={100} color="bg-blue-500" />
            </ReportCard>
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ReportCard title="Carbon Offset Trends" icon="📈">
              <ChartPlaceholder type="Line" />
            </ReportCard>
            
            <ReportCard title="Environmental Impact Distribution" icon="📊">
              <ChartPlaceholder type="Pie" />
            </ReportCard>
          </div>
          
          {/* Activity Log */}
          <div className="mb-6">
            <ReportCard title="Recent Sustainability Activities" icon="📝">
              <ActivityTable activities={activities} />
              <div className="mt-4 text-right">
                <button className="text-green-700 hover:text-green-800 text-sm font-medium">
                  View All Activities →
                </button>
              </div>
            </ReportCard>
          </div>
          
          {/* Recommendations */}
          <ReportCard title="Sustainability Recommendations" icon="💡">
            <div className="space-y-4 mt-2">
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <h4 className="font-medium text-green-800 mb-1">Increase Drought-Resistant Species</h4>
                <p className="text-sm text-gray-600">Consider planting more drought-resistant species to prepare for changing climate conditions.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-1">Implement Rainwater Harvesting</h4>
                <p className="text-sm text-gray-600">Installing rainwater harvesting systems could reduce water usage by approximately 25%.</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                <h4 className="font-medium text-amber-800 mb-1">Community Engagement Opportunity</h4>
                <p className="text-sm text-gray-600">Organize a community tree planting event to increase local participation and awareness.</p>
              </div>
            </div>
          </ReportCard>
        </main>
      </div>
    </div>
  );
};

export default Page;
