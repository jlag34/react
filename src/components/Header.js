import React from 'react';
import './Header.scss';

const Header = ({ header, subheader }) => {
  return (
    <div className="header-wrapper">
      <div className="header">{header}</div>
      <div className="subheader">{subheader}</div>
    </div>
  )
};

export default Header;