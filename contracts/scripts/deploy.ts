import { ethers } from "hardhat";

async function main() {
  const oneToken = ethers.BigNumber.from(1e9).mul(1e9).mul(1);
  // We get the contract to deploy
  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy(oneToken.mul(1000000));

  console.log("token", token.address);

  const Staking = await ethers.getContractFactory("SharkStaking");
  const staking = await Staking.deploy(token.address);
  console.log("staking", staking.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
