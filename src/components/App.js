import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Elements } from 'react-stripe-elements';
import './App.scss';

import Checkout from './Checkout';
import CustomerForm from './CustomerForm';
import Receipt from './Receipt';


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 1,
			paymentAmount: 5,

			address: '10 Test Road',
			city: 'Testville',
			email: 'email@email.com',
			firstName: 'Douglas',
			lastName: 'Blank',
			phone: '508-453-2342',
			state: 'MA',
			zipCode: '01534'
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleFormPage = this.handleFormPage.bind(this);
		this.handleSale = this.handleSale.bind(this);
	}

	componentDidMount() {
		axios.get('https://97ni6yjcn4.execute-api.us-east-2.amazonaws.com/dev/v1/text_sale', {
			params: { receipt: 'b8dbb44f-3668-4d0d-98fd-bb2aacffafb5' }
		}).then(userData => {
			if (userData.status === 200) {
				this.setState({
					...userData.data.customer,
					paymentAmount: (userData.data.unitPrice * userData.data.unitsSold) + 1,
					saleData: userData.data
				});
			}
		});
	}

	handleChange(e,t) {
		this.setState({ [e]: t });
	}

	handleFormPage(page) {
		this.setState({ page });
	}

	handleSale(creditSaleId) {
		const { address, city , email, firstName, lastName, phone, state, zipCode } = this.state;
		const { campaign, organization, paymentAmount, paymentType, program, team, unitPrice, unitsSold, userFirstName, userLastName, username } = this.state.saleData;

    const customer = {
			address,
			city,
			email,
			firstName,
			lastName,
			phone,
			state,
			zipCode,
		};
		
    const data = {
			campaign,
      customer,
			date: moment().utc(),
			organization,
			paymentAmount,
			paymentType,
			program,
			paymentAmount,
			receipt: this.state.saleData.receipt,
			status: 'COMPLETE',
			team,
			unitPrice,
			unitsSold,
			userFirstName,
			userLastName,
			username
    };

    // if (creditSaleId) { data.stripe = creditSaleId; }


    axios.post('https://97ni6yjcn4.execute-api.us-east-2.amazonaws.com/dev/v1/sale', {
      ...data
    })
    .then(res => {
      if (res.status !== 200) {
        console.log('ERROR: ');
      } else {
        this.setState({ loading: false, page: 3, receipt: this.state.saleData.receipt });
      }
    });
  }


	render() {
		const { page } = this.state;
		if (page === 1) {
			return (
				<div className="page-body">
					<CustomerForm
						{...this.state}
						handleChange={this.handleChange}
						handleFormPage={this.handleFormPage}
					/>
				</div>
			);
		}
		if (page === 2) {
			return (
				<div className="page-body">
					<Elements>
						<Checkout
							handleSale={this.handleSale}
							paymentAmount={this.state.paymentAmount}
						/>
					</Elements>
				</div>
			);
		} else {
			return (
				<div className="page-body">
					<Receipt {...this.state} {...this.state.saleData} />
				</div>
			);
		}
	}
}

export default App;