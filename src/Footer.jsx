import React from 'react';

function Footer() {
  return (
    <footer className="py-3 bg-navbar w-100">
      <ul className="nav justify-content-center pb-2 mb-2">
        <li className="nav-item"><a href="#" className="nav-link px-2">Home</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2">Join Queue</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2">Queue Status</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2">Admin Panel</a></li>
      </ul>
      <p className="text-center text-body-secondary mb-1" style={{fontSize: '1rem'}}>Queue Ease – Digital Queue Manager for Small Businesses</p>
      <p className="text-center text-body-secondary mb-0" style={{fontSize: '0.95rem'}}>© 2025 Queue Ease</p>
    </footer>
  );
}

export default Footer; 