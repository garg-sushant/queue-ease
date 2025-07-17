import React from 'react';

function Navbar({ onNav, current }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand" style={{ cursor: 'pointer' }} onClick={() => onNav('home')}>
          Queue Ease
        </span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <span className={`nav-link${current === 'home' ? ' active' : ''}`} style={{ cursor: 'pointer' }} onClick={() => onNav('home')}>Home</span>
            </li>
            <li className="nav-item">
              <span className={`nav-link${current === 'join' ? ' active' : ''}`} style={{ cursor: 'pointer' }} onClick={() => onNav('join')}>Join Queue</span>
            </li>
            <li className="nav-item">
              <span className={`nav-link${current === 'status' ? ' active' : ''}`} style={{ cursor: 'pointer' }} onClick={() => onNav('status')}>Queue Status</span>
            </li>
            <li className="nav-item">
              <span className={`nav-link${current === 'admin' ? ' active' : ''}`} style={{ cursor: 'pointer' }} onClick={() => onNav('admin')}>Admin</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 