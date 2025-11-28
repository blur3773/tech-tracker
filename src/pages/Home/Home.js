import React from 'react';
import FileUpload from '../../components/FileUpload/FileUpload';
import RoadmapGrid from '../../components/RoadmapGrid/RoadmapGrid';
import { exportToJson, createExportData } from '../../utils/exportUtils';
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

    const exportData = createExportData(roadmap, userData);
    const filename = `${roadmap.title.toLowerCase().replace(/\s+/g, '-')}-progress-${new Date().getTime()}.json`;
    
    exportToJson(exportData, filename);
    alert(`Прогресс успешно экспортирован в файл: ${filename}`);
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