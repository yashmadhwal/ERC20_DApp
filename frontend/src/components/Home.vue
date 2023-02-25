<template>
<div class="container mx-auto relative">
    <div class="flex justify-center">
        <div>
            <div class="flex">
                <div class="w-1/4"></div>
                <div class="w-3/4 pl-[5px] pr-[5px]">
                    <div class="flex text-center h-[100px] items-center">
                        <p class="text-[30px]">Wellcome to my personal token portfolio</p>
                    </div>
                </div>
            </div>

            <!-- Connect Metamask Button -->

            <!-- Idea 1 -->
            <div class="flex">
                <div class="w-1/4"></div>
                <div class="w-3/4 pl-[5px] pr-[5px]">
                    <div @click="connectMetamask" v-if='!loading && !login' class="mt-[10px] mb-[10px] border h-[50px] bg-[#ffad39] hover:bg-[#c28b3e] rounded-[30px] grid place-content-center cursor-pointer">
                        Connect MetaMask</div>
                    <div v-if='loading' class="mt-[10px] mb-[10px] border h-[50px] bg-[#ffad39]  rounded-[30px] grid place-content-center cursor-progress">
                        <div v-if='loading' class="flex"><img src="../assets/images/loaging.png" alt="" class="motion-reduce:hidden animate-spin">&nbsp;&nbsp;Loading...</div>
                    </div>
                    <div v-if='login && !loading' class="mt-[10px] mb-[10px] border h-[50px] bg-[#c3842b] rounded-[30px] grid place-content-center cursor-not-allowed">Connected: {{shortWallet}}</div>
                </div>
            </div>

            <!-- div to show balance -->
            <div class="flex mt-[5px] mb-[5px]">
                <div class="w-1/4 p-[5px] text-right">Balance:</div>
                <div class="w-2/4 p-[5px]">{{BNToNumstr(balance)}}</div>
                <div class="w-1/4 p-[5px] flex justify-between">
                    <div class="w-3/4">My Tokens</div>
                    <img class="object-fill w-[25px]" src="../assets/images/chinese-coin.png" alt="">
                </div>
            </div>

            <!-- Input to Tranfer -->
            <div class="flex mt-[5px] mb-[5px]">
                <div class="w-1/4 p-[5px] text-right">Amount:</div>
                <input class="w-2/4 p-[5px]" type="number" placeholder="0" :max='BNToNumstr(balance)' v-model="amount" />
                <div class="w-1/4 p-[5px] flex justify-center">
                    <button v-if='amount < BNToNumstr(balance)' class="w-full bg-[#ffad39] rounded-[10px] grid place-content-center " @click="getMax">Maximum</button>
                    <button v-if='amount == BNToNumstr(balance)' class="w-full bg-[#c3842b] rounded-[10px] grid place-content-center cursor-not-allowed" @click="">Maximum</button>
                    <button v-if='amount > BNToNumstr(balance)' class="w-full bg-[#ffad39] rounded-[10px] grid place-content-center" @click="getMax">Get Max</button>
                </div>

            </div>
            <!-- Receiver Address -->
            <div class="flex mt-[5px] mb-[5px]">
                <div class="w-1/4 p-[5px] text-right">Receiver:</div>
                <div class="w-3/4 pl-[5px]"><input class="w-full p-[5px] text-center border-[#e29933] border-2 rounded-[10px] " type="text" placeholder="Receiver Address" v-model="address" /></div>
            </div>

            <!-- Send Button -->
            <!-- Idea 1 -->
            <div class="flex">
                <div class="w-1/4"></div>
                <div class="w-3/4 pl-[5px] pr-[5px]">
                    <div class="flex mt-[5px] mb-[5px] justify-center">
                        <button v-if="amount <= BNToNumstr(balance) && amount != 0 && address.length==42 && send==false" class="w-1/3 p-[5px] bg-[#ffad39] rounded-[10px] grid place-content-center" @click="sendToken(address.toString(),amount.toString())">Send Token</button>
                        <button v-if="amount > BNToNumstr(balance) || amount == 0 || address.length!=42 && send==false" class="w-1/3 p-[5px] bg-[#c3842b] rounded-[10px] grid place-content-center cursor-not-allowed" @click="">Send Token</button>
                        <button v-if="send==true" class="w-1/3 p-[5px] bg-[#c3842b] rounded-[10px] grid place-content-center cursor-not-allowed" @click="">Sending Token(s)</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Notification />
</div>
</template>

<script>
import Notification from './Notification.vue'
import {
    defineComponent
} from '@vue/composition-api'

import {
    mapActions,
    mapState
} from 'pinia'

import {
    useToken
} from '../stores/contract/token'

import {
    useUser
} from '../stores/user'

export default defineComponent({
    name: 'Hello',
    setup() {},
    components: {
        Notification
    },
    data() {
        return {
            amount: '',
            address: '',
        }
    },
    beforeMount() {
        this.environmentsetup()
    },
    computed: {
        ...mapState(useUser, ['shortWallet', 'loading', 'login']),
        ...mapState(useToken, ['balance', 'send'])
    },
    methods: {
        ...mapActions(useUser, ['connectMetamask', 'environmentsetup']),
        ...mapActions(useToken, ['sendToken', 'BNToNumstr']),
        getMax() {
            if (this.login) {
                this.amount = this.BNToNumstr(this.balance).toString()
                this.maxAmount = this.amount
                console.log(this.amount)
            } else {
                alert('Wallet not connected!')
            }
        }
    }
})
</script>

<style scoped>
* {
    /* border: 1px solid; */
}
</style>
