import React, { useState } from 'react';

// Helper to get initials from name
function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function QueueStatus({ queue, user, onLeave, onJoinExtra, onRemove, cancelled = 0, served = 0 }) {
  const [form, setForm] = useState({ gender: '', age: '', condition: '' });
  const [formError, setFormError] = useState('');
  const [formName, setFormName] = useState('');
  // Use actual data if present, otherwise show dashes
  const queueWithDetails = queue.map((q) => ({
    ...q,
    initials: getInitials(q.name),
    time: q.joinedAt ? new Date(q.joinedAt).toLocaleTimeString() : '--:--',
  }));

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleNameChange = (e) => setFormName(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formName || !form.gender || !form.age || !form.condition) {
      setFormError('All fields are required.');
      return;
    }
    setFormError('');
    onJoinExtra({ name: formName, ...form });
    setForm({ gender: '', age: '', condition: '' });
    setFormName('');
  };

  return (
    <div className="container py-4" style={{ maxWidth: 1200 }}>
      {/* Summary Cards */}
      <div className="row g-3 mb-4 flex-nowrap flex-md-wrap overflow-auto" style={{minWidth: 0}}>
        <div className="col-10 col-sm-4 flex-shrink-0">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <span role="img" aria-label="hourglass" style={{fontSize: '2rem'}}>⏳</span>
              <div className="fw-semibold mt-2 mb-1">Awaiting visits</div>
              <div className="fs-3">{queue.length}</div>
            </div>
          </div>
        </div>
        <div className="col-10 col-sm-4 flex-shrink-0">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <span role="img" aria-label="cancel" style={{fontSize: '2rem', color: '#e64980'}}>⛔</span>
              <div className="fw-semibold mt-2 mb-1">Canceled visits</div>
              <div className="fs-3">{cancelled}</div>
            </div>
          </div>
        </div>
        <div className="col-10 col-sm-4 flex-shrink-0">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <span role="img" aria-label="ended" style={{fontSize: '2rem', color: '#51cf66'}}>✅</span>
              <div className="fw-semibold mt-2 mb-1">Ended visits</div>
              <div className="fs-3">{served}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Queue Table */}
      <div className="card shadow-sm mb-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table mb-0 align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Visit time</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Condition</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {queueWithDetails.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">No one in queue.</td>
                  </tr>
                ) : (
                  queueWithDetails.map((q, idx) => (
                    <tr key={q.email} className={idx === 0 ? 'table-info' : ''}>
                      <td>
                        <span className="avatar-circle me-2">{q.initials}</span> {q.name}
                        {user && q.email === user.email && <span className="badge bg-success ms-2">You</span>}
                      </td>
                      <td>{q.time}</td>
                      <td>{q.gender || '-'}</td>
                      <td>{q.age || '-'}</td>
                      <td>{q.condition || '-'}</td>
                      <td>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => onRemove(q.email)}>Remove</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {user ? (
        <div className="text-center mt-3 mb-2">
          <button className="btn btn-danger px-4 py-2" onClick={onLeave}>
            Cancel Spot
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="card p-4" style={{maxWidth: 400, width: '100%'}}>
            <h5 className="mb-3 text-center">Join the Queue</h5>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-2">
                <input type="text" className="form-control" placeholder="Name" value={formName} onChange={handleNameChange} />
              </div>
              <div className="mb-2">
                <select className="form-select" name="gender" value={form.gender} onChange={handleFormChange}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-2">
                <input type="number" className="form-control" name="age" placeholder="Age" value={form.age} onChange={handleFormChange} min="1" max="120" />
              </div>
              <div className="mb-2">
                <input type="text" className="form-control" name="condition" placeholder="Condition" value={form.condition} onChange={handleFormChange} />
              </div>
              {formError && <div className="alert alert-danger py-1 mb-2">{formError}</div>}
              <button type="submit" className="btn btn-primary w-100">Join Queue</button>
            </form>
          </div>
        </div>
      )}
      <style>{`
        .avatar-circle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #e9ecef;
          color: #333;
          font-weight: 600;
          font-size: 1.1rem;
        }
        @media (max-width: 600px) {
          .container {
            padding-left: 0.2rem !important;
            padding-right: 0.2rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default QueueStatus; 