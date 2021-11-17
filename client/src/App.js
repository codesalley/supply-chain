import React, { Component } from 'react';
import getWeb3 from './getWeb3';
import ItemContract from './contracts/Item.json';
import ItemManagerContract from './contracts/ItemManager.json';

import './App.css';

class App extends Component {
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			loaded: false,
			cost: 0,
			itemName: 'test item',
		};
	}

	componentDidMount = async () => {
		try {
			// Get network provider and web3 instance.
			this.web3 = await getWeb3();

			// Use web3 to get the user's accounts.
			this.accounts = await this.web3.eth.getAccounts();

			// Get the contract instance.
			const networkId = await this.web3.eth.net.getId();

			this.itemManager = new this.web3.eth.Contract(
				ItemManagerContract.abi,
				ItemManagerContract.networks[networkId] &&
					ItemManagerContract.networks[networkId].address
			);
			this.item = new this.web3.eth.Contract(
				ItemContract.abi,
				ItemContract.networks[networkId] &&
					ItemContract.networks[networkId].address
			);

			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.
			this.setState({ loaded: true });
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`
			);
			console.error(error);
		}
	};

	handleSubmit = async () => {
		this.itemManager.methods
			.createItem(this.state.itemName, this.state.cost)
			.send({ from: this.accounts[0] });
		this.setState({ itemName: '', cost: 0 });
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		if (!this.state.loaded) {
			return <div>Loading Web3, accounts, and contract...</div>;
		}
		return (
			<div className="container App mw-50">
				<h1 className="text-center">Supply Chain</h1>
				<h4 className="text-center ">Items</h4>

				<div className="mb-3">
					<label className="form-label">Item Name</label>
					<input
						name="itemName"
						onChange={this.handleChange}
						type="text"
						className="form-control"
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Item Price</label>
					<input
						name="cost"
						onChange={this.handleChange}
						type="text"
						className="form-control"
					/>
				</div>

				<button
					onClick={this.handleSubmit}
					type="button"
					className="btn btn-primary w-100"
				>
					Submit
				</button>
			</div>
		);
	}
}

export default App;
