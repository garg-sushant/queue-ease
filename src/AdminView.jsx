import React from 'react';

function AdminView({ queue, onAdvance, onReset, servedCount }) {
  return (
    <div className="container mt-4">
      <h2>Admin Panel</h2>
      <div className="mb-3">
        <button className="btn btn-success me-2" onClick={onAdvance} disabled={queue.length === 0}>
          Serve Next
        </button>
        <button className="btn btn-danger" onClick={onReset}>
          Reset Queue
        </button>
      </div>
      <div className="mb-3">
        <strong>People served today:</strong> <span className="badge bg-primary">{servedCount}</span>
      </div>
      <h4>Current Queue</h4>
      <ol className="list-group list-group-numbered">
        {queue.length === 0 && <li className="list-group-item">No one in queue.</li>}
        {queue.map((q, idx) => (
          <li key={q.email} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              {q.name} <span className="text-muted">({q.email})</span>
              {q.joinedAt && <span className="ms-2 badge bg-secondary">{new Date(q.joinedAt).toLocaleTimeString()}</span>}
            </span>
            <span className="badge bg-info">#{idx + 1}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default AdminView; 