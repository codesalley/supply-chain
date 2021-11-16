import React, { Component, useRef } from 'react';
import getWeb3 from './getWeb3';
import ItemContract from './contracts/Item.json';
import ItemManagerContract from './contracts/ItemManager.json';

import './App.css';

class App extends Component {
	state = { loaded: false, cost: useRef(0), itemName: useRef('') };

	componentDidMount = async () => {
		try {
			// Get network provider and web3 instance.
			this.web3 = await getWeb3();

			// Use web3 to get the user's accounts.
			this.accounts = await this.web3.eth.getAccounts();

			// Get the contract instance.
			const networkId = await this.web3.eth.net.getId();

			this.itemManager = new web3.eth.Contract(
				ItemManagerContract.abi,
				ItemManagerContract.networks[networkId] &&
					ItemManagerContract.networks[networkId].address
			);
			this.item = new web3.eth.Contract(
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

	render() {
		if (!this.state.loaded) {
			return <div>Loading Web3, accounts, and contract...</div>;
		}
		return (
			<div className="App">
				<h1>Supply</h1>
				<h1>Items</h1>
				<form>
					<div>
						<input type="text" ref={this.cost} />
					</div>
				</form>
				<div>The stored value is: {this.state.storageValue}</div>
			</div>
		);
	}
}

export default App;
