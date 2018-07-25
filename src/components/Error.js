import React from 'react';
import './Error.scss';

const Error = ({ error }) => {
  return (
    <div>
    {error === 1 &&
      <div className="error-wrapper">
        <div className="header">Bad url</div>
        <div className="subheader">Cannot get your sale information.</div>
      </div>
    }
    {error === 2 &&
      <div className="error-wrapper">
        <div className="header">No receipt found</div>
        <div className="subheader">Cannot find your data based on the receipt ID given.</div>
      </div>
    }
    </div>
  );
}

export default Error;