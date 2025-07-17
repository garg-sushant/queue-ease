import React from 'react';

function Home({ onJoinClick }) {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Queue Ease</h1>
      <p className="lead">Digital Queue Manager for Small Businesses</p>
      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <div className="alert alert-info shadow-sm">
            <strong>Queue Ease</strong> helps you manage customer queues efficiently, reduce wait times, and improve customer satisfaction. Join the queue from anywhere and track your status in real time!
          </div>
        </div>
      </div>
      <div className="row justify-content-center mb-4">
        <div className="col-md-10">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <div className="mb-2" style={{fontSize: '2rem'}}>📱</div>
                  <h5 className="card-title">Join Remotely</h5>
                  <p className="card-text">Customers can join the queue from their phone or computer, no need to wait in line physically.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <div className="mb-2" style={{fontSize: '2rem'}}>⏳</div>
                  <h5 className="card-title">Live Status</h5>
                  <p className="card-text">See your position and estimated wait time in real time, with instant updates as the queue moves.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <div className="mb-2" style={{fontSize: '2rem'}}>✅</div>
                  <h5 className="card-title">Easy for Businesses</h5>
                  <p className="card-text">Simple admin tools to manage, serve, and reset the queue. Track how many customers you’ve served today.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-primary btn-lg mt-3" onClick={onJoinClick}>
        Join Queue
      </button>
    </div>
  );
}

export default Home; 