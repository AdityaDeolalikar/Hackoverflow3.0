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
      <Link href="/dashboard/tree-selection">
        <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 rounded-lg cursor-pointer mt-2">
          <span className="mr-2">🌳</span> <span className={`${isOpen ? 'inline' : 'hidden md:inline'}`}>Tree selection and plantation</span>
        </li>
      </Link>
      
      <Link href="/dashboard/report">
        <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 rounded-lg cursor-pointer mt-2">
          <span className="mr-2">📄</span> <span className={`${isOpen ? 'inline' : 'hidden md:inline'}`}>Report</span>
        </li>
      </Link>
      
      <Link href="/dashboard/community">
        <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 rounded-lg cursor-pointer mt-2 bg-green-100">
          <span className="mr-2">👥</span> <span className={`${isOpen ? 'inline' : 'hidden md:inline'}`}>Community Engagement</span>
        </li>
      </Link>
    </ul>
  </div>
);

const CommunityPost = ({ author, date, title, content, likes, comments }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="bg-green-100 rounded-full p-2 mr-3">
          <span className="text-xl">👤</span>
        </div>
        <div>
          <h3 className="font-medium text-gray-800">{author}</h3>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-green-800 mb-3">{title}</h2>
      <p className="text-gray-600 mb-4">{content}</p>
      <div className="flex items-center justify-between text-gray-500 text-sm mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center">
          <button className="flex items-center mr-4 hover:text-green-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            {likes} Likes
          </button>
          <button className="flex items-center hover:text-green-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            {comments} Comments
          </button>
        </div>
        <button className="flex items-center hover:text-green-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
      </div>
    </div>
  </div>
);

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');
  const [showReportModal, setShowReportModal] = useState(false);
  
  // Sample data
  const communityPosts = [
    {
      author: "Tree Planters Association",
      date: "May 15, 2023",
      title: "Recent Mangrove Plantation Success",
      content: "We successfully planted 500 mangrove saplings along the coastal area. The community support has been incredible. Special thanks to all volunteers who participated in the event.",
      likes: 48,
      comments: 12,
      isVerified: true,
      type: 'plantation',
      treeData: {
        species: "Mangrove",
        quantity: 500,
        location: "Coastal Area, Zone 3"
      }
    },
    {
      author: "Jane Smith",
      date: "May 12, 2023",
      title: "Water Conservation Workshop",
      content: "Join us this weekend for a hands-on workshop about water conservation techniques. Learn how to build small-scale rainwater harvesting systems for your garden.",
      likes: 32,
      comments: 8,
      type: 'event'
    },
    {
      author: "Local Farmers Cooperative",
      date: "May 10, 2023",
      title: "Issue Report: Tree Disease in North Region",
      content: "We've noticed some concerning signs of fungal infection in newly planted mahogany trees. The infection appears as yellow spots on leaves. Requesting expert assistance.",
      likes: 15,
      comments: 23,
      type: 'issue',
      issueData: {
        status: "Under Review",
        priority: "High"
      }
    }
  ];
  
  const achievements = [
    { name: "Tree Planter", description: "Planted your first tree", icon: "🌱", achieved: true },
    { name: "Conservation Expert", description: "Completed 5 learning modules", icon: "🧠", achieved: true },
    { name: "Community Leader", description: "Made 10 contributions", icon: "👑", achieved: false },
    { name: "Issue Spotter", description: "Reported 3 issues", icon: "🔍", achieved: true },
  ];
  
  const learningModules = [
    { title: "Sustainable Irrigation Techniques", category: "Water Conservation", duration: "20 mins", image: "💧" },
    { title: "Native Tree Species Guide", category: "Plantation", duration: "30 mins", image: "🌳" },
    { title: "Soil Health Monitoring", category: "Agriculture", duration: "25 mins", image: "🌱" },
    { title: "Community-Led Conservation", category: "Engagement", duration: "15 mins", image: "👥" },
  ];
  
  const IssueReportModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-800">Report an Issue</h2>
          <button onClick={() => setShowReportModal(false)} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Issue Type</label>
            <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Tree Health Problem</option>
              <option>Water Issue</option>
              <option>Soil Degradation</option>
              <option>Pest Infestation</option>
              <option>Other</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Location</label>
            <div className="border border-gray-300 rounded-lg p-2 bg-gray-50 h-32 flex items-center justify-center">
              <span className="text-gray-500">Map Interface (Click to select location)</span>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Description</label>
            <textarea 
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500" 
              rows="3"
              placeholder="Describe the issue in detail..."
            ></textarea>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Upload Photo (Optional)</label>
            <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
              <span className="text-sm text-gray-500">Drag & drop a photo or</span>
              <button type="button" className="text-green-600 font-medium mx-1">browse</button>
            </div>
          </div>
          
          <button 
            type="button" 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );

  const PlantationEntryForm = () => (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-green-800 mb-4">Record Tree Plantation Activity</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Tree Species</label>
            <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Mangrove</option>
              <option>Oak</option>
              <option>Pine</option>
              <option>Teak</option>
              <option>Mahogany</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Quantity Planted</label>
            <input 
              type="number" 
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Number of trees"
              min="1"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">GPS Location</label>
          <div className="border border-gray-300 rounded-lg p-2 bg-gray-50 h-40 flex items-center justify-center">
            <span className="text-gray-500">Map Interface (Click to select location)</span>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Plantation Date</label>
          <input 
            type="date" 
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Upload Photo</label>
          <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
            <span className="text-sm text-gray-500">Drag & drop a photo or</span>
            <button type="button" className="text-green-600 font-medium mx-1">browse</button>
          </div>
        </div>
        
        <button 
          type="button" 
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Submit Plantation Record
        </button>
      </form>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-green-800">Community Engagement</h1>
              <p className="text-gray-600">Connect, contribute, and learn with the reforestation community</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <button 
                onClick={() => setShowReportModal(true)}
                className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg flex items-center transition duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Report Issue
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Post
              </button>
            </div>
          </div>
          
          {/* User Stats Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">John Doe</h3>
                    <p className="text-sm text-gray-500">Community Member since January 2023</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="px-3 py-2 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-800">24</p>
                    <p className="text-xs text-gray-600">Trees Planted</p>
                  </div>
                  <div className="px-3 py-2 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-800">350</p>
                    <p className="text-xs text-gray-600">Points Earned</p>
                  </div>
                  <div className="px-3 py-2 bg-amber-50 rounded-lg">
                    <p className="text-2xl font-bold text-amber-800">5</p>
                    <p className="text-xs text-gray-600">Badges</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="flex border-b">
              <button 
                onClick={() => setActiveTab('feed')}
                className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'feed' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Community Feed
              </button>
              <button 
                onClick={() => setActiveTab('plantation')}
                className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'plantation' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Tree Plantation
              </button>
              <button 
                onClick={() => setActiveTab('learn')}
                className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'learn' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Learn
              </button>
              <button 
                onClick={() => setActiveTab('achievements')}
                className={`flex-1 py-3 px-4 text-center font-medium ${activeTab === 'achievements' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Achievements
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          {activeTab === 'feed' && (
            <div className="space-y-6">
              {communityPosts.map((post, index) => (
                <CommunityPost 
                  key={index}
                  author={post.author}
                  date={post.date}
                  title={post.title}
                  content={post.content}
                  likes={post.likes}
                  comments={post.comments}
                />
              ))}
            </div>
          )}
          
          {activeTab === 'plantation' && (
            <PlantationEntryForm />
          )}
          
          {activeTab === 'learn' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {learningModules.map((module, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition duration-300">
                  <div className="bg-green-50 p-6 flex justify-center items-center">
                    <span className="text-4xl">{module.image}</span>
                  </div>
                  <div className="p-4">
                    <div className="text-xs font-medium text-green-600 mb-1">{module.category}</div>
                    <h3 className="font-bold text-gray-800 mb-2">{module.title}</h3>
                    <p className="text-sm text-gray-500">{module.duration}</p>
                    <button className="mt-3 w-full bg-green-100 hover:bg-green-200 text-green-800 font-medium py-1.5 px-3 rounded-lg text-sm transition duration-200">
                      Start Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'achievements' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-green-800 mb-4">Your Badges & Achievements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`border ${achievement.achieved ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'} rounded-lg p-4 text-center`}>
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h3 className={`font-bold ${achievement.achieved ? 'text-green-800' : 'text-gray-400'} mb-1`}>{achievement.name}</h3>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                    {!achievement.achieved && (
                      <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-full">In Progress</span>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Your Progress</h3>
                <div className="bg-gray-100 rounded-full h-4 mb-4">
                  <div className="bg-green-500 h-4 rounded-full" style={{width: '65%'}}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>350 Points</span>
                  <span>Next Level: 500 Points</span>
                </div>
              </div>
            </div>
          )}
          
          {showReportModal && <IssueReportModal />}
        </main>
      </div>
    </div>
  );
};

export default Page;
