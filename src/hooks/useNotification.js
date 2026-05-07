import { useCallback, useState } from 'react';

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((type, title, message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, title, message }]);
    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const notify = {
    success: (title, message) => addNotification('success', title, message),
    error: (title, message) => addNotification('error', title, message),
    warning: (title, message) => addNotification('warning', title, message),
    info: (title, message) => addNotification('info', title, message),
  };

  return {
    notifications,
    removeNotification,
    notify,
  };
};
