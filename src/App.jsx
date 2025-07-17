import React, { useState, useEffect } from 'react';
import Home from './Home';
import JoinQueueForm from './JoinQueueForm';
import QueueStatus from './QueueStatus';
import Navbar from './Navbar';
import Footer from './Footer';
import AdminView from './AdminView';
import './App.css';

const getToday = () => new Date().toLocaleDateString();

function App() {
  const [page, setPage] = useState('home');
  const [queue, setQueue] = useState(() => {
    const saved = localStorage.getItem('queue');
    return saved ? JSON.parse(saved) : [];
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('queueUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [servedCount, setServedCount] = useState(() => {
    const saved = localStorage.getItem('servedCount');
    const savedDate = localStorage.getItem('servedDate');
    return savedDate === getToday() ? Number(saved) || 0 : 0;
  });
  const [lastReset, setLastReset] = useState(() => localStorage.getItem('servedDate') || getToday());
  const [cancelledCount, setCancelledCount] = useState(0);

  // Daily reset logic
  useEffect(() => {
    const today = getToday();
    if (lastReset !== today) {
      setQueue([]);
      setServedCount(0);
      setLastReset(today);
      localStorage.setItem('servedDate', today);
      localStorage.setItem('queue', JSON.stringify([]));
      localStorage.setItem('servedCount', '0');
    }
  }, [lastReset]);

  useEffect(() => {
    localStorage.setItem('queue', JSON.stringify(queue));
  }, [queue]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('queueUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('queueUser');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('servedCount', servedCount);
    localStorage.setItem('servedDate', lastReset);
  }, [servedCount, lastReset]);

  const handleNav = (target) => {
    setPage(target);
  };

  const handleJoinClick = () => setPage('join');

  const handleJoin = (formData) => {
    if (!queue.some(q => q.email === formData.email)) {
      const joinedAt = Date.now();
      setQueue([...queue, { ...formData, joinedAt }]);
      setUser({ ...formData, joinedAt });
      setPage('status');
    } else {
      alert('This email is already in the queue.');
    }
  };

  const handleLeave = () => {
    setQueue(queue.filter(q => q.email !== user.email));
    setUser(null);
    setPage('status'); // Stay on status page after leaving
  };

  // Admin: Serve next
  const handleAdvance = () => {
    if (queue.length > 0) {
      setQueue(queue.slice(1));
      setServedCount(servedCount + 1);
      // If user is first, remove their session
      if (user && queue[0].email === user.email) {
        setUser(null);
        setPage('home');
      }
    }
  };

  // Admin: Reset queue
  const handleReset = () => {
    setQueue([]);
    setServedCount(0);
    setLastReset(getToday());
    setUser(null);
    setPage('home');
  };

  const handleJoinExtra = (formData) => {
    if (!queue.some(q => q.email === formData.email && q.name === formData.name)) {
      const joinedAt = Date.now();
      setQueue([...queue, { ...formData, joinedAt }]);
      setUser({ ...formData, joinedAt });
      setPage('status');
    } else {
      alert('This person is already in the queue.');
    }
  };

  const handleRemove = (email) => {
    setCancelledCount(cancelledCount + 1);
    setQueue(queue.filter(q => q.email !== email));
    if (user && user.email === email) {
      setUser(null);
    }
  };

  return (
    <div className="app-fullscreen">
      <Navbar onNav={handleNav} current={page} />
      <main className="fullscreen-main">
        <div className="card-centered w-100">
          {page === 'home' && <Home onJoinClick={handleJoinClick} />}
          {page === 'join' && <JoinQueueForm onJoin={handleJoin} />}
          {page === 'status' && <QueueStatus queue={queue} user={user} onLeave={handleLeave} onJoinExtra={handleJoinExtra} onRemove={handleRemove} cancelled={cancelledCount} served={servedCount} />}
          {page === 'admin' && <AdminView queue={queue} onAdvance={handleAdvance} onReset={handleReset} servedCount={servedCount} />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
