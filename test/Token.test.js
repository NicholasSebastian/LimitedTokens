const Token = artifacts.require('../src/contracts/Token.sol');

contract("Token", accounts => {
  let contract;
  before(async () => {
    contract = await Token.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const { address } = contract;
      assert.notEqual(address, undefined);
      assert.notEqual(address, null);
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
    });
  
    it("has a name", async () => {
      const name = await contract.name();
      assert.equal(name, "Token");
    });
  
    it("has a symbol", async () => {
      const symbol = await contract.symbol();
      assert.equal(symbol, "LT");
    });
  });

  // TODO: Write more tests.

  describe("minting", async () => {
    // it("creates a new token", async () => { });
  });

  describe("indexing", async () => {
    // it("lists tokens", async () => { });
  });
});