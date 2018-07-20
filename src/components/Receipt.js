import React from 'react';
import Header from './Header';
import './Receipt.scss';

const Receipt = props => {
  console.log('PROPS: ', props);
  const { paymentType, receipt, unitsSold } = props.saleData;
  const { address, city, email, firstName, lastName, phone, state, zipCode } = props;


  const addressStr = `${address}${address.length ? ',' : ''} ${city}${city.length ? ',' : ''} ${state} ${zipCode}`;

  return (
    <div>
      <div>
        <Header header="Sale Receipt" />
      </div>
      <div className="field">
        <div className="label">reference #</div>
        <input disabled value={receipt} />
      </div>
      <div className="field">
        <div className="label">name</div>
        <input disabled value={`${firstName} ${lastName}`} />
      </div>
      <div className="field">
        <div className="label">email</div>
        <input disabled value={email} />
      </div>
      <div className="field">
        <div className="label">phone</div>
        <input disabled value={phone} />
      </div>
      <div className="field">
        <div className="label">address</div>
        <input disabled value={addressStr} />
      </div>
      <div className="field">
        <div className="label">units sold</div>
        <input disabled value={unitsSold} />
      </div>
      <div className="field">
        <div className="label">type</div>
        <input disabled value={paymentType} />
      </div>
      {/* <div className="btn-wrapper">
        <button
          className="primary-btn"
          onClick={() => {
            if (this.props.passNull) {
              updateApp(null);
            } else {
              updateApp('sale', false)
            }
          }}
        >
          {fromDash ? 'back' : 'finish'}
        </button>
      </div> */}
    </div>
  );
};

export default Receipt;