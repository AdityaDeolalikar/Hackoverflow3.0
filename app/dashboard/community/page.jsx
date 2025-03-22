'use client'
import { useState } from 'react';
import Link from 'next/link';

const Navbar = ({ toggleSidebar }) => (
  <nav className="bg-white shadow-md p-4 flex justify-between items-center">
    <div className="text-green-800 text-2xl font-bold">EcoForest</div>
    <button className="text-green-800 md:hidden" onClick={toggleSidebar}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </nav>
);

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
      <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 rounded-lg cursor-pointer mt-2">
        <span className="mr-2">🌡️</span> <span className={`${isOpen ? 'inline' : 'hidden md:inline'}`}>Microclimate</span>
      </li>
      <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 rounded-lg cursor-pointer mt-2">
        <span className="mr-2">📄</span> <span className={`${isOpen ? 'inline' : 'hidden md:inline'}`}>Report</span>
      </li>
      <li className="flex items-center text-green-800 py-3 px-2 hover:bg-green-100 rounded-lg cursor-pointer mt-2">
        <span className="mr-2">🎓</span> <span className={`${isOpen ? 'inline' : 'hidden md:inline'}`}>Certificates</span>
      </li>
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
  const [tab, setTab] = useState('posts');

  const communityPosts = [
    {
      author: 'Alex Green',
      date: 'May 12, 2023',
      title: 'My Reforestation Journey in the Amazon',
      content: 'I recently completed a tree-planting project in the Amazon Rainforest. We planted over 500 native trees across 2 hectares of land. The local community was incredibly supportive and joined our efforts. This experience was not only environmentally rewarding but also culturally enriching.',
      likes: 124,
      comments: 32
    },
    {
      author: 'Sarah Johnson',
      date: 'April 30, 2023',
      title: 'Urban Forestry: Turning Concrete Jungles Green',
      content: 'I\'ve been working with my local council to implement urban forestry initiatives. So far, we\'ve transformed three abandoned lots into mini forests using the Miyawaki method. The results are already showing improved air quality and biodiversity in our neighborhood.',
      likes: 87,
      comments: 15
    },
    {
      author: 'Miguel Fernandez',
      date: 'April 22, 2023',
      title: 'Earth Day Special: How Our School Created a Forest',
      content: 'For Earth Day, our school embarked on an ambitious project to create a forest in our campus backyard. Students from all grades participated, learning about native species and ecological restoration. One year later, our mini-forest is thriving!',
      likes: 156,
      comments: 43
    }
  ];

  const events = [
    {
      title: 'World Forest Day Plantation Drive',
      date: 'June 21, 2023',
      location: 'Central Park, New York',
      participants: 120
    },
    {
      title: 'Miyawaki Method Workshop',
      date: 'July 15, 2023',
      location: 'Virtual Event',
      participants: 250
    },
    {
      title: 'Forest Conservation Fundraiser',
      date: 'August 5, 2023',
      location: 'Grand Hotel, San Francisco',
      participants: 75
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Community Engagement</h1>
          
          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
            <div className="flex border-b">
              <button 
                className={`flex-1 py-4 px-6 text-center font-medium ${tab === 'posts' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500 hover:text-green-700'}`}
                onClick={() => setTab('posts')}
              >
                Community Posts
              </button>
              <button 
                className={`flex-1 py-4 px-6 text-center font-medium ${tab === 'events' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500 hover:text-green-700'}`}
                onClick={() => setTab('events')}
              >
                Upcoming Events
              </button>
              <button 
                className={`flex-1 py-4 px-6 text-center font-medium ${tab === 'groups' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500 hover:text-green-700'}`}
                onClick={() => setTab('groups')}
              >
                Forest Groups
              </button>
            </div>
          </div>
          
          {/* New Post Button */}
          <div className="flex justify-end mb-6">
            <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Post
            </button>
          </div>
          
          {/* Content based on selected tab */}
          {tab === 'posts' && (
            <div>
              {communityPosts.map((post, index) => (
                <CommunityPost key={index} {...post} />
              ))}
            </div>
          )}
          
          {tab === 'events' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-green-800 mb-2">{event.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>{event.participants} participants</span>
                      </div>
                    </div>
                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
                      Register Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {tab === 'groups' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-40 bg-green-100 flex items-center justify-center">
                  <span className="text-6xl">🌲</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Urban Foresters</h3>
                  <p className="text-gray-600 mb-3">A group dedicated to promoting urban forestry and green spaces in cities.</p>
                  <p className="text-sm text-gray-500 mb-4">Members: 1,245</p>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
                    Join Group
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-40 bg-green-100 flex items-center justify-center">
                  <span className="text-6xl">🌱</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Reforestation Volunteers</h3>
                  <p className="text-gray-600 mb-3">Connect with volunteers working on reforestation projects worldwide.</p>
                  <p className="text-sm text-gray-500 mb-4">Members: 3,782</p>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
                    Join Group
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-40 bg-green-100 flex items-center justify-center">
                  <span className="text-6xl">🌍</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Forest Conservation</h3>
                  <p className="text-gray-600 mb-3">Dedicated to protecting existing forests and advocating for forest conservation.</p>
                  <p className="text-sm text-gray-500 mb-4">Members: 2,519</p>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
                    Join Group
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Page;
