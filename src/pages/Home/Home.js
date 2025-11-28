import React from 'react';
import FileUpload from '../../components/FileUpload/FileUpload';
import RoadmapGrid from '../../components/RoadmapGrid/RoadmapGrid';
import { exportToJson } from '../../utils/exportUtils';
import './Home.css';

const Home = ({ roadmap, setRoadmap, userData, updateUserData }) => {
  const handleFileLoad = (data) => {
    setRoadmap(data);
  };

  const handleExport = () => {
    if (!roadmap) {
      alert('Сначала загрузите дорожную карту');
      return;
    }

    const exportData = {
      roadmap: roadmap,
      userProgress: userData,
      exportDate: new Date().toISOString(),
      totalProgress: calculateProgress()
    };

    exportToJson(exportData, `react-roadmap-progress-${new Date().getTime()}.json`);
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
    <div className="home">
      <div className="container">
        <div className="home-header">
          <h2>Добро пожаловать в Tech Tracker!</h2>
          <p>Начните отслеживать свой прогресс в изучении React</p>
        </div>
        
        <FileUpload 
          onFileLoad={handleFileLoad}
          onExport={handleExport}
        />
        
        <RoadmapGrid 
          roadmap={roadmap}
          userData={userData}
        />
      </div>
    </div>
  );
};

export default Home;