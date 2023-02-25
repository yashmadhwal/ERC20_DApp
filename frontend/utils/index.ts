import { Contract, providers } from 'ethers'
import { node } from './node'
import { Chain } from '../src/stores/user'

import MyToken from "../deployments/bsc_testnet/MyToken.json"

import {Token} from '../typechain/Token'

export async function safe(promise: Promise<any>) {
    try {
      const result = await promise
      return [result, null]
    } catch (error) {
      return [null, error]
    }
  }
  
  export function getChainRpc(chainId: Chain): string {
    // const chainName = contracts[chainId][0].name
    const chainName = 'bsc_testnet'
    return node(chainName).rpc
  }
  
  export function getChainName(chainId: Chain): string {
    // const chainName = contracts[chainId][0].name
    const chainName = 'bsc_testnet'
    return node(chainName).name
  }
  
  export function getChainHex(chainId: Chain): string {
    // const chainName = contracts[chainId][0].name
    const chainName = 'bsc_testnet'
    return node(chainName).chainIdHex
  }
  
  export function getPackedHash(fullHash: string) {
    const packedHash =
      fullHash.substring(0, 5) +
      '...' +
      fullHash.substring(fullHash.length - 6, fullHash.length - 1)
    return packedHash
  }

  export function useContracts(chainId: Chain) {
    const provider = new providers.JsonRpcProvider(getChainRpc(chainId))
    // const contractsInfo = contracts[chainId][0].contracts
  
    // const contractsInfo = contracts[chainId][0].contracts
    return {
      /// TOKENS
      token: new Contract(MyToken.address, MyToken.abi, provider) as Token,
    }
  }