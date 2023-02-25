<template>


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
    name: 'Notification',
})
</script>

<style scoped>
* {
    /* border: 1px solid; */
}
</style>
