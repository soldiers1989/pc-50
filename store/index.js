import {getItem} from '~/plugins/tool';

export const state = () => ({
    showJoin: false,
    showJoinReg: false,
    showForgetPwd: false,
    isSubmitting: false,
    code: '',
    name: '',
    routeName: '',
    entrustPrice: '',
    firstPrice: true,
    userInfo: {},
    indexData: {}
})

export const mutations = {
    setCode (state, value) {
        state.code = value.code
        state.name = value.name
    },
    routerTo(state, path) {
        if (path) {
            this.$router.push(path)
        }
    },
    isShowJoin(state) {
        state.showJoin = false
    },
    isShowJoint(state) {
        state.showJoin = true
    },
    isShowJoinReg(state) {
        state.showJoinReg = false
    },
    isShowJoinRegt(state) {
        state.showJoinReg = true
    },
    isShowForgetPwd(state) {
        state.showForgetPwd = !state.showForgetPwd
    },
    changeSubmitting(state) {
        state.isSubmitting = !state.isSubmitting
    },
    setRouterName (state, name) {
        state.routeName = name
    },
    changeEntrustPrice (state, val) {
        state.firstPrice = val.flag
        state.entrustPrice = val.value
    },
    upUserInfo(state) {
        state.userInfo = getItem("userInfo")
        state.indexData = getItem("indexData")
    }
}

export const actions = {

}
