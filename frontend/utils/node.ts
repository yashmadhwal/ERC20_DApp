import secrets from '../.secrets'

interface Node {
  name: string
  rpc: string
  chainId: number
  chainIdHex: string
}

export function node(name: string): Node {
  return {
    name: 'Binance Smart Chain Testnet',
    // rpc: `https://speedy-nodes-nyc.moralis.io/${secrets.moralis}/bsc/testnet`,
    rpc: secrets.bsc_testnet,
    chainId: 97,

    chainIdHex: '0x61',
  }
  // switch (name) {
    // case 'bsc_mainnet':
    //   return {
    //     name: 'Binance Smart Chain',
    //     rpc: `https://speedy-nodes-nyc.moralis.io/${secrets.moralis}/bsc/mainnet`,
    //     chainId: 56,
    //     chainIdHex: '0x38',
    //   }
    // case 'bsc_testnet':
    //   return {
    //     name: 'Binance Smart Chain Testnet',
    //     rpc: `https://speedy-nodes-nyc.moralis.io/${secrets.moralis}/bsc/testnet`,
    //     chainId: 97,
    //     chainIdHex: '0x61',
    //   }
    // case 'rinkeby':
    //   return {
    //     name: 'Rinkeby',
    //     rpc: `https://speedy-nodes-nyc.moralis.io/${secrets.moralis}/eth/rinkeby`,
    //     chainId: 4,
    //     chainIdHex: '0x4',
    //   }
  // }
  return {} as Node
}
