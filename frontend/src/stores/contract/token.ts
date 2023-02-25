import { defineStore } from 'pinia'

import { BigNumber, ContractTransaction, ethers } from 'ethers'

import { useUser } from '../user'
import { getPackedHash } from '../../../utils'
import { safe, useContracts } from '../../../utils'

export const useToken = defineStore('token', {
  state: () => {
    return {
      balance: BigNumber.from(0) as BigNumber,
      lastTx: '',
      send: false
    //   allowances: {} as { [spender: string]: boolean },
    //   loading: false,
    }
  },
  actions: {
    async load() {
      const user = useUser()
      console.log(user.login)
      if (!user.login) {
        console.error('Load in store/token.ts, user not is login')
        return
      }
      this.loading = true
      console.log('loading', this.loading)
      const temp =  await this.getBalance()
      // this.balance = this.BNToNumstr(temp)
      this.balance = temp
      this.loading = false
      console.log('Loaded store/token.ts')
    },

    async getBalance(): Promise<BigNumber> {
      const user = useUser()
      if (!user.login) return BigNumber.from(0)
      const { token } = useContracts(user.chainId)
      const [balance, errorBalance] = await safe(token.balanceOf(user.wallet))
      if (errorBalance) {
        console.error(errorBalance)
        return BigNumber.from(0)
      }
      return balance
    },

    async sendToken(address:string, amount: string) {
      this.send = true
      const user = useUser()
      
      console.log('amount',amount)
      console.log('address',address)
    
      try {
        const usetoken = useToken()
        const { token } = useContracts(user.chainId)
        let tx = await token.connect(user.signer!).transfer(address,amount.toBigNumber(18))
        console.log('tx',tx)
        console.log('before weight lastTx', tx.hash)
        await tx.wait()
        console.log('after weight lastTx', tx.hash)
        this.lastTx = tx.hash
        console.log('lastTx', this.lastTx)
        await usetoken.load()
        // await this.stakesInfo(user.wallet)
        // await this.loadInitInfo()
      } catch (err: any) {
        console.log(err)
      }
      this.send = false
    },
    // async approve(
    //   spender: string,
    //   amount: BigNumber
    // ): Promise<ContractTransaction | null> {
    //   const user = useUser()
    //   user.loading = true
    //   if (!user.login) {
    //     user.loading = false
    //     return null
    //   }

    //   const { token } = useContracts(user.chainId)
    //   const [txApprove, errorApprove] = await safe(
    //     token.connect(user.signer!).approve(spender, amount)
    //   )
    //   user.lastTx = txApprove
    //   user.alerts.push({
    //     alertType: 'Success',
    //     message: getPackedHash(user.lastTx),
    //     index: user.alerts.length,
    //   })
    //   await this.load()
    //   user.loading = false
    //   return txApprove
    // },

    // async approveMax(spender: string): Promise<ContractTransaction | null> {
    //   this.loading = true
    //   console.log('approving')
    //   if (!useUser().login) {
    //     this.loading = false
    //     return null
    //   }
    //   if (this.flexApproved && this.stakingApproved) {
    //     this.loading = false
    //     return null
    //   }
    //   this.load()
    //   return await this.approve(spender, ethers.constants.MaxUint256)
    // },
    removeTrailingZeros(str: string): string {
      if (str === '0') return str
      if (str.slice(-1) === '0')
        return this.removeTrailingZeros(str.substr(0, str.length - 1))
      if (str.slice(-1) === '.') return str.substr(0, str.length - 1)
      return str
    },
    BNToNumstr(bn: BigNumber | string, dec = 18, prec = 3): string {
      const str = bn.toString()
      if (str === '0') return str
      if (isNaN(Number(str))) return 'NaN'
      if (str.length <= dec)
        return this.removeTrailingZeros(
          ('0.' + '000000000000000000'.substr(0, dec - str.length) + str).substr(
            0,
            dec - str.length + prec + 2
          )
        )
      else
        return this.removeTrailingZeros(
          [str.substr(0, str.length - dec), str.slice(-dec)]
            .join('.')
            .substr(0, str.length - dec + prec + 1)
        )
    },
    BNToNumstrStrict(bn: BigNumber | string, dec = 18, prec = 3): string {
      const str = bn.toString()
      if (str === '0') return str
      if (isNaN(Number(str))) return 'NaN'
      if (str.length <= dec)
        return this.removeTrailingZeros(
          ('0.' + '000000000000000000'.substr(0, dec - str.length) + str).substr(
            0,
            dec - str.length + prec + 2
          )
        )
      else
        return [str.substr(0, str.length - dec), str.slice(-dec)]
          .join('.')
          .substr(0, str.length - dec + prec + 1)
    },
    
  },
})
