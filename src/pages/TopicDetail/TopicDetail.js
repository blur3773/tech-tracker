import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './TopicDetail.css';

const TopicDetail = ({ roadmap, userData, updateUserData }) => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('not-started');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (!roadmap) {
      navigate('/');
      return;
    }

    const topic = roadmap.topics.find(t => t.id === topicId);
    if (!topic) {
      navigate('/');
      return;
    }

    const userTopicData = userData[topicId] || {};
    setNote(userTopicData.note || '');
    setStatus(userTopicData.status || 'not-started');
    setDueDate(userTopicData.dueDate || '');
  }, [topicId, roadmap, userData, navigate]);

  const handleSave = () => {
    updateUserData(topicId, {
      note,
      status,
      dueDate
    });
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    updateUserData(topicId, {
      status: newStatus,
      note,
      dueDate
    });
  };

  const topic = roadmap?.topics.find(t => t.id === topicId);

  if (!topic) {
    return <div>Тема не найдена</div>;
  }

  return (
    <div className="topic-detail">
      <div className="container">
        <Link to="/" className="back-link">← Назад к обзору</Link>
        
        <div className="topic-detail-content">
          <div className="topic-info">
            <h1>{topic.title}</h1>
            <p className="topic-description">{topic.description}</p>
            
            {topic.links && topic.links.length > 0 && (
              <div className="topic-links">
                <h3>Полезные ссылки:</h3>
                <ul>
                  {topic.links.map((link, index) => (
                    <li key={index}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.title || link.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="user-data-section">
            <div className="status-controls">
              <h3>Статус изучения</h3>
              <div className="status-buttons">
                <button
                  className={`status-btn ${status === 'not-started' ? 'active' : ''}`}
                  onClick={() => handleStatusChange('not-started')}
                  style={{ backgroundColor: '#f44336' }}
                >
                  Не начат
                </button>
                <button
                  className={`status-btn ${status === 'in-progress' ? 'active' : ''}`}
                  onClick={() => handleStatusChange('in-progress')}
                  style={{ backgroundColor: '#FF9800' }}
                >
                  В работе
                </button>
                <button
                  className={`status-btn ${status === 'completed' ? 'active' : ''}`}
                  onClick={() => handleStatusChange('completed')}
                  style={{ backgroundColor: '#4CAF50' }}
                >
                  Выполнено
                </button>
              </div>
            </div>

            <div className="due-date-controls">
              <h3>Планируемая дата завершения</h3>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="date-input"
              />
            </div>

            <div className="notes-section">
              <h3>Мои заметки</h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Добавьте свои заметки по этой теме..."
                className="notes-textarea"
                rows="8"
              />
              <button onClick={handleSave} className="btn btn-primary save-btn">
                Сохранить заметки
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;