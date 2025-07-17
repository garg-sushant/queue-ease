import React, { useState } from 'react';

function JoinQueueForm({ onJoin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [condition, setCondition] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setError('Name is required.');
      return;
    }
    if (!email) {
      setError('Contact info is required.');
      return;
    }
    if (!validateEmail(email) && !validatePhone(email)) {
      setError('Enter a valid email or a 10-digit phone number.');
      return;
    }
    if (!gender) {
      setError('Gender is required.');
      return;
    }
    if (!age) {
      setError('Age is required.');
      return;
    }
    if (!condition) {
      setError('Condition is required.');
      return;
    }
    setError('');
    onJoin({ name, email, gender, age, condition });
    setName('');
    setEmail('');
    setGender('');
    setAge('');
    setCondition('');
  };

  return (
    <div className="container mt-4">
      <h2>Join the Queue</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email or Phone</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email or 10-digit phone number"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select className="form-select" value={gender} onChange={e => setGender(e.target.value)} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={e => setAge(e.target.value)}
            min="1"
            max="120"
            required
            placeholder="Enter your age"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Condition</label>
          <input
            type="text"
            className="form-control"
            value={condition}
            onChange={e => setCondition(e.target.value)}
            required
            placeholder="Enter your condition"
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-success">
          Join Queue
        </button>
      </form>
    </div>
  );
}

export default JoinQueueForm; 