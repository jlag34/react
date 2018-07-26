import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Elements } from 'react-stripe-elements';
import './App.scss';

import Checkout from './Checkout';
import CustomerForm from './CustomerForm';
import Error from './Error';
import Receipt from './Receipt';


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 1,
			paymentAmount: 0,
			loading: true,

			address: '',
			city: '',
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			state: '',
			zipCode: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleFormPage = this.handleFormPage.bind(this);
		this.handleSale = this.handleSale.bind(this);
	}

	componentDidMount() {
		if (
			window.location.search.length === 0 ||
			window.location.search.slice(1).split('=')[0] !== 'receipt'
		) {
			this.setState({ error: 1, loading: false });
		} else {
			const receipt = window.location.search.slice(1).split('=')[1];
			axios.get('https://lonsqvyho4.execute-api.us-east-2.amazonaws.com/prod/v1/text_sale', {
				params: { receipt }
			}).then(userData => {
				if (userData.status === 200) {
					this.setState({
						loading: false,
						page: userData.status === 'COMPLETE' ? 3 : 1,
						paymentAmount: (userData.data.unitPrice * userData.data.unitsSold) + 1,
						saleData: userData.data,
						...userData.data.customer
					});
				} else {
					this.setState({ error: 2, loading: false });
				}
			});
		}
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


    axios.post('https://lonsqvyho4.execute-api.us-east-2.amazonaws.com/prod/v1/sale', {
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

		const bgImage = (
			<div className="image-parent">
				<div className="image-opacity"></div>
				<div className="image-style image-large"></div>
			</div>
		);

		const { error, loading, page } = this.state;

		if (loading) {
			return null;
		}

		if (error && error > 0) {
			console.log('ERROR: ', error);
			return <Error error={error} />
		}

		if (page === 1) {
			return (
				<div>
				{/* <div className="page-body"> */}
					{bgImage}
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
					{bgImage}
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
					{bgImage}
					<Receipt {...this.state} {...this.state.saleData} />
				</div>
			);
		}
	}
}

export default App;