import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, BigNumber } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// import { Token__factory, Token } from "../typechain";

const { utils } = require("ethers");
function removeTrailingZeros(str: string) {
  return str.replace(/\.?0+$/, "");
}

function numstrToBN(input: any, dec = 18) {
  if (!input) return BigNumber.from(0);
  const spl = input.split(".");
  if (spl[1]?.length > dec) {
    input = [spl[0], spl[1].slice(0, dec)].join(".");
  }
  return utils.parseUnits(input, dec);
}

function BNToNumstr(bn: any, dec = 18, prec = 3) {
  let res = BNToNumstrStrict(bn, dec, prec);
  if (res.split(".")[1]) res = removeTrailingZeros(res);
  return res;
}

function BNToNumstrStrict(bn: any, dec: any, prec: any) {
  if (!bn) return "0";
  const spl = utils.formatUnits(bn, dec).split(".");
  if (prec === 0) return spl[0];
  return [spl[0], ((spl[1] || "") + "0".repeat(prec)).slice(0, prec)].join(".");
}

describe("Token deployment testing", function () {
  let token: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addrs: SignerWithAddress[];
  let oneToken: any;

  before(async () => {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    oneToken = ethers.BigNumber.from(1e9).mul(1e9).mul(1);
    const TOKEN = await ethers.getContractFactory("MyToken");
    // token = await TOKEN.deploy(oneToken.mul(1e6));
    token = await TOKEN.deploy();
  });

  describe("ConsoleLogging output", () => {
    it("About Tokens", async () => {
      const tokenName = await token.name();
      console.log(tokenName);
      const tokenSymbol = await token.symbol();
      console.log(tokenSymbol);
      const tokenDecimal = await token.decimals();
      console.log(tokenDecimal);
      const totalSupply = await token.totalSupply();
      console.log(BNToNumstr(totalSupply));
    });
  });

  describe("Token Deployment", function () {
    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
    it("Deployed with correct name", async function () {
      expect(await token.name()).to.equal("MyPrivateToken");
    });
    it("Deployed with correct Symbol", async function () {
      expect(await token.symbol()).to.equal("MPT");
    });
    it("Deployed with correct total supply", async function () {
      expect(await token.totalSupply()).to.equal(oneToken.mul(1000000));
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      // Transfer 50 tokens from owner to addr1
      await token.transfer(addr1.address, 50);
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      // Transfer 50 tokens from addr1 to addr2
      // We use .connect(signer) to send a transaction from another account
      await token.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await token.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialOwnerBalance = await token.balanceOf(owner.address);

      // Try to send 1 token from addr1 (0 tokens) to owner (1000 tokens).
      // `require` will evaluate false and revert the transaction.
      await expect(token.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      // Owner balance shouldn't have changed.
      expect(await token.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await token.balanceOf(owner.address);

      // Transfer 100 tokens from owner to addr1.
      await token.transfer(addr1.address, 100);

      // Transfer another 50 tokens from owner to addr2.
      await token.transfer(addr2.address, 50);

      // Check balances.
      const finalOwnerBalance = await token.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await token.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(100);
    });
  });
});
