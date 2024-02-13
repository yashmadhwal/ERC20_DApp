# ERC20_DApp

# ERC20 Token Decentralized Application

Greetings all!
In this repository, we will look how you can have your own ERC20 token and also send via frontend application, i.e. through a DApp.
In the later part of the text, we will tell you about all the prerequisites to run this application. Our task is divided into two parts:
1. **Backend:** Smart Contract
a. Write ERC-20 Smart contract
b. Test the contract
c. Deploy to the test network
2. **Frontend:** web Application 
a. Launching the Web Application
b. Interating with the smart contract on the blockchain

Fortunately, we have already done the majority of the work for you. With this guide, you will need to do some extra work, but very important that you just follow along. 
**Let's Go!**

### Setup the environment
Clone the repository and go the folder
```
git clone https://github.com/yashmadhwal/ERC20_DApp.git
cd ERC20_DApp
```

The folder will have two subfolders:
1. contracts
2. frontend

### Lets talk about the Contracts (backend).

This project is an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem. The project comes with a coded ERC-20 contract, a test for that contract. But before running the code, we need to do some setup (prerequisite)
### Pre-requisite:
- [RPC](https://docs.bscscan.com/misc-tools-and-utilities/public-rpc-nodes) for connecting to blockchain network
- API key from [Binance](https://www.binance.com/en/binance-api) for contract verification. 
_Note_: In this tutorial, we will be working with Binance, therefore the above links are for binance. You can choose any network that supports EVM (e.g. Ethereum), and then accordingly change the RPC and API keys
- Private key of wallet which will be deploying the contract. The best way is to have MetaMask wallet installed in your Browser.

### Setting up contract environment:
- Navigate to the folder
    ```
    cd contracts
    ```
- Install the required dependencies
    ```
    npm i
    ```
- Compile the contract
    ```
    npm run compile
    ```
- Test the smart contract's functionality
    ```
    npm run test
    ```
## Deploy contract:
- Create a file `.secrets.json`:
    ```
    touch .secrets.json
    ```
- Open `.secrets.json` by running `open .secrets.json` or opening by any code editor and paste the following and save it:
    ```
    {
        "bsc_test" : "#Your RPC key",
        "privateKey": "#Your private key ",
        "apiKey": "#Your API  Key"
    }
    ```
    Replace the API keys with your keys. _Note_: This file will be ignored by git as it is included in the .gitignore file.
- To deploy and verify the contract
    ```
    npx hardhat deploy --tags token --network bsc_testnet
    ```
    __Deploying to other networks__:
    - If you wish to deploy on some other network that supports EVM, then you need to do some configurations.
    - In the `hardhat.config.ts` file, do the network configuration as follows (for example for ETH):
        ```
        eth_scan: {
            url: secrets.eth_test,
            accounts: [secrets.privateKey],
            verify: {
                etherscan: {
                apiKey: secrets.apiKey,
            },
          },
        },
        ```
        Note that you will require to add the RPC and API for Ethereum in `.secrets.json` accordingly.
    - To deploy, select `--network` accordingly, e.g. `--network eth_scan`.
- Once the contract is deployed, you should verify the smart contract, such that interacting with it becomes easy:
    ```
    npx hardhat verify ${ADDRESS} --network bsc_testnet
    ```
## Running Decentralized Application:
### Pre-requisite:
- Copy folders `deployments` and `typechain` from the _contract\_blockchain_ folder and paste them in the _fontend\_Application_ folder. 


### Setting up contract environment:

- Go to the root folder (either by running `cd ..` in the terminal or opening a new terminal)
- Navigate to the folder
    ```
    cd frontend
    ```
- Install the required dependencies
    ```
    npm i
    ```
- Create a file `.secrets.ts`:
    ```
    touch .secrets.ts
    ```
- Open `.secrets.ts` by running `open .secrets.ts` or opening by any code editor and paste the following and save it:
    ```
    export default {
        "bsc_test" : "#Your RPC key"
    }
    ```
    Replace the API keys with your keys. _Note_: This file will be ignored by git as it is included in the .gitignore file.

- Run the application:
    ```
    npm run dev
    ```
    
- Explore the application at the deployed _local\_host_: http://127.0.0.1:5173/
