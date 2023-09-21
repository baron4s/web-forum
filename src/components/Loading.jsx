import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  return (
    <div className="loading">
      <LoadingBar style={{ backgroundColor: '#ff8e3c' }} />
    </div>
  );
}

export default Loading;
