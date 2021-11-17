const itemManager = artifacts.require('./ItemManager.sol');

contract('item manager', (accounts) => {
	it('should add new items ', async () => {
		const deployedItemManager = await itemManager.deployed();
		const res = await deployedItemManager.createItem('code salley', 200, {
			from: accounts[0],
		});

		console.log(res);
	});
});
