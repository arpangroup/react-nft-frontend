import React, { useState } from 'react';
import NotificationCard from './components/NotificationCard';
import './NotificationList.css';

const dummyNotifications = [
  {
    id: 1,
    title: 'Welcome!',
    message: 'Thanks for joining our platform.',
    createdAt: '2025-08-08T10:00:00Z',
    viewed: false,
  },
  {
    id: 2,
    title: 'System Maintenance',
    message: 'The system will be down from 12 AM to 2 AM.',
    createdAt: '2025-08-07T22:00:00Z',
    viewed: true,
  },
  {
    id: 3,
    title: 'New Feature: Dashboard',
    message: 'Check out the updated dashboard view now!',
    createdAt: '2025-08-06T08:30:00Z',
    viewed: false,
  },
];

export default function NotificationList() {
  const [notifications, setNotifications] = useState(dummyNotifications);

  const handleClick = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, viewed: true } : n))
    );
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAsViewed = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, viewed: true } : n))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="notification-wrapper">
      <h2 className="heading">Notifications</h2>
      {notifications.map((n) => (
        <NotificationCard
          key={n.id}
          notification={n}
          //onMarkViewed={markAsViewed}
          //onDelete={deleteNotification}          
          onClick={handleClick}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
