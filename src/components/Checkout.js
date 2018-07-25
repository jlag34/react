import React, { Component } from 'react';
import axios from 'axios';
import { injectStripe } from 'react-stripe-elements';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement
} from 'react-stripe-elements';
import './Checkout.scss';
import BigCard from './ccb.png';

import Header from './Header';

const elementStyles = {
  base: {
    fontSize: '24px',
    color: '#FFFFFF',
    '::placeholder': {
      color: '#FFFFFF',
    }
  }
};

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.creditPayment = this.creditPayment.bind(this);
  }

  creditPayment() {
    if (this.state.loading === true) return;
    this.setState({ loading: true }, () => {
      this.props.stripe.createToken({ type: 'card', name: this.props.name }).then(({ token }) => {
        const url = 'https://lonsqvyho4.execute-api.us-east-2.amazonaws.com/prod/v1/charge';
        const price = Number(this.props.paymentAmount) * 100;
        axios.post(url, {
          amount: price,
          currency: 'usd',
          stripe_token: token
        }).then(sale => {
          this.props.handleSale(sale.data.charge.id);
        })
        .catch(err => {
          this.setState({ loading: false });
        });
      });
    });
  }

  render() {
    const price = (Number(this.props.paymentAmount)).toFixed(2);
    return (
      <div className="checkout-credit-card-wrapper">
        <div>
          <Header header="Checkout" subheader="Credit Card Info" />
        </div>
        <div className="center">
          <img className="big-card" src={BigCard} />
        </div>
        <div>
          <div className="field">
            <div className="label">Credit Card</div>
            <CardNumberElement className="stripe-el" style={elementStyles} />
          </div>
          <div className="display-flex space-between">
            <div className="field">
              <div className="label">mm/yy</div>
              <CardExpiryElement className="stripe-el" style={elementStyles} />
            </div>
            <div className="field">
              <div className="label">cvc</div>
              <CardCVCElement className="stripe-el" style={elementStyles} />
            </div>
          </div>
        </div>
        <div className="charge-warning">* A $1.00 service charge has been added</div>
        
        <div className="btn-wrapper">
        <div className="btn-container">
          <div>
            <button
              className="primary-btn"
              onClick={this.creditPayment}
              style={{ fontSize: "100%" }}
            >
              {!this.state.loading && `CHARGE $${price}`}
              {this.state.loading && <span className="faCogWhite" style={{fontSize: "100%"}}></span>}
            </button>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default injectStripe(Checkout);