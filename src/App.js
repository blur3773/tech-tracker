import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import TopicDetail from './pages/TopicDetail/TopicDetail';
import { sampleRoadmap } from './data/sample-roadmap';
import './App.css';

function App() {
  const [roadmap, setRoadmap] = useState(null);
  const [userData, setUserData] = useState({});

  // Загружаем пример дорожной карты при старте приложения
  useEffect(() => {
    setRoadmap(sampleRoadmap);
  }, []);

  const updateUserData = (topicId, data) => {
    setUserData(prev => ({
      ...prev,
      [topicId]: { ...prev[topicId], ...data }
    }));
  };

  const calculateProgress = () => {
    if (!roadmap || !roadmap.topics) return 0;
    
    const totalTopics = roadmap.topics.length;
    if (totalTopics === 0) return 0;
    
    const completedTopics = roadmap.topics.filter(topic => 
      userData[topic.id]?.status === 'completed'
    ).length;
    
    return Math.round((completedTopics / totalTopics) * 100);
  };

  return (
    <div className="App">
      <Header progress={calculateProgress()} />
      <main className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                roadmap={roadmap}
                setRoadmap={setRoadmap}
                userData={userData}
                updateUserData={updateUserData}
              />
            } 
          />
          <Route 
            path="/topic/:topicId" 
            element={
              <TopicDetail 
                roadmap={roadmap}
                userData={userData}
                updateUserData={updateUserData}
              />
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;