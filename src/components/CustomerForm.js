import React from 'react';
import Header from './Header';
import './CustomerForm.scss';

const CustomerForm = props => {
  const { address, city, email, firstName, handleChange,
          handleFormPage, lastName, phone, state, zipCode } = props;
  return (
    <div className="checkout-form-container">
      <Header header="Checkout" subheader="Customer Information" />
      <div className="checkout-form-wrapper" style={{zIndex: 5}}>
        <div className="display-flex">
          <div className="field half-field">
            <div className="label">first name</div>
            <input onChange={e => handleChange('firstName', e.target.value)} value={firstName} />
          </div>
          <div className="field half-field">
            <div className="label">last name</div>
            <input onChange={e => handleChange('lastName', e.target.value)} value={lastName} />
          </div>
        </div>
        <div className="field">
          <div className="label">email</div>
          <input onChange={e => handleChange('email', e.target.value)} value={email} />
        </div>
        <div className="field">
          <div className="label">phone number</div>
          <input onChange={e => handleChange('phone', e.target.value)} value={phone} />
        </div>
        <div className="field">
          <div className="label">address</div>
          <input onChange={e => handleChange('address', e.target.value)} value={address} />
        </div>
        <div className="display-flex">
          <div className="field half-field">
            <div className="label">city</div>
            <input onChange={e => handleChange('city', e.target.value)} value={city} />
          </div>
          <div className="field half-field">
            <div className="label">state</div>
            <input onChange={e => handleChange('state', e.target.value.toUpperCase())} value={state} />
          </div>
        </div>
        <div className="display-flex">
          <div className="field half-field" style={{width: "45%"}}>
            <div className="label">zip code</div>
            <input onChange={e => handleChange('zipCode', e.target.value)} value={zipCode} />
          </div>
        </div>
      </div>
      <div className="btn-wrapper" style={{ zIndex: 2}}>
        <div>
          <button
            className="primary-btn"
            onClick={() => handleFormPage(2)}
            style={{fontSize: "100%"}}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;