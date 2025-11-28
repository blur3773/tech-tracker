export const exportToJson = (data, filename) => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

// Функция для создания структуры экспорта
export const createExportData = (roadmap, userData) => {
  const totalTopics = roadmap?.topics?.length || 0;
  const completedTopics = roadmap?.topics?.filter(topic => 
    userData[topic.id]?.status === 'completed'
  ).length || 0;
  const progress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return {
    roadmap: roadmap,
    userProgress: userData,
    exportDate: new Date().toISOString(),
    totalProgress: progress,
    version: "1.0",
    exportedBy: "Tech Tracker App",
    statistics: {
      totalTopics: totalTopics,
      completedTopics: completedTopics,
      inProgressTopics: roadmap?.topics?.filter(topic => 
        userData[topic.id]?.status === 'in-progress'
      ).length || 0,
      notStartedTopics: roadmap?.topics?.filter(topic => 
        !userData[topic.id]?.status || userData[topic.id]?.status === 'not-started'
      ).length || 0
    }
  };
};