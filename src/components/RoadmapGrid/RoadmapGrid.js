import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoadmapGrid.css';

const RoadmapGrid = ({ roadmap, userData }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'in-progress':
        return '#FF9800';
      case 'not-started':
      default:
        return '#f44336';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Выполнено';
      case 'in-progress':
        return 'В работе';
      case 'not-started':
      default:
        return 'Не начат';
    }
  };

  const handleTopicClick = (topicId) => {
    navigate(`/topic/${topicId}`);
  };

  if (!roadmap) {
    return (
      <div className="no-roadmap">
        <p>Загрузите дорожную карту для начала работы</p>
      </div>
    );
  }

  return (
    <div className="roadmap-grid">
      <div className="roadmap-header">
        <h2>{roadmap.title}</h2>
        <p>{roadmap.description}</p>
      </div>
      
      <div className="topics-grid">
        {roadmap.topics.map(topic => {
          const userTopicData = userData[topic.id] || {};
          const status = userTopicData.status || 'not-started';
          
          return (
            <div 
              key={topic.id}
              className="topic-card"
              onClick={() => handleTopicClick(topic.id)}
              style={{ borderLeftColor: getStatusColor(status) }}
            >
              <div className="topic-header">
                <h3 className="topic-title">{topic.title}</h3>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(status) }}
                >
                  {getStatusText(status)}
                </span>
              </div>
              <p className="topic-description">{topic.description}</p>
              {userTopicData.note && (
                <div className="topic-note-preview">
                  <small>Заметка: {userTopicData.note.substring(0, 50)}...</small>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapGrid;