<template>
    <div>
        <div class="main cf wrap">
            <div class="main-left fl">
                <ul class="main-top">
                    <li><img src="~/static/images/img_1_big.png"></li>
                    <li>{{cellphone}} <span @click="logout">[退出]</span></li>
                </ul>
                <ul class="main-nav">
                    <li v-bind:class="{selectPage: tab == 'account'}"
                        @click="validate(), changeTab('account')">
                        <img src="~/static/images/1_white.png" v-if="tab == 'account'">
                        <img src="~/static/images/1_black.png" v-else>
                        我的账户
                    </li>
                    <li :class="{selectPage: tab == 'flow'}"
                        @click="routerTo('/mine/flow'), changeTab('flow')">
                        <img src="~/static/images/6_white.png" v-if="tab == 'flow'">
                        <img src="~/static/images/6_black.png" v-else>
                        资金流水
                    </li>
                    <li :class="{selectPage: tab == 'realName'}"
                        @click="goAuth(), changeTab('realName')">
                        <img src="~/static/images/2_white.png" v-if=" tab == 'realName'">
                        <img src="~/static/images/2_black.png" v-else>
                        实名认证
                    </li>
                    <li :class="{selectPage: tab == 'bankCard'}"
                        @click="routerTo('/mine/bankCard'), changeTab('bankCard')">
                        <img src="~/static/images/3_white.png" v-if="tab == 'bankCard'">
                        <img src="~/static/images/3_black.png" v-else>
                        银行卡
                    </li>
                    <li :class="{selectPage: tab == 'pwd'}"
                        @click="routerTo('/mine/pwd'), changeTab('pwd')">
                        <img src="~/static/images/4_white.png" v-if="tab == 'pwd'">
                        <img src="~/static/images/4_black.png" v-else>
                        密码管理
                    </li>
                    <li :class="{selectPage: tab == 'share'}"
                        @click="routerTo('/mine/share'), changeTab('share')">
                        <img src="~/static/images/5_white.png" v-if="tab == 'share'">
                        <img src="~/static/images/5_black.png" v-else>
                        分享赚钱
                    </li>
                </ul>
            </div>
            <div class="main-right fl">
                <nuxt-child />
            </div>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';
    import {getItem, setItem, checkRealName, successMsg} from '~/plugins/tool';
    import {TOKEN_OBJ_ID} from '~/api/ajax.js';
    import {logout} from '~/api/personal.js';
    import {bus} from "../plugins/bus";

    export default {
        layout (context) {
            return 'default'
        },
        data () {
            return {
                tab: "account",
                cellphone: ""
            }
        },
        methods: {
            ...mapMutations(['routerTo']),
            changeTab (tab) {
                this.tab = tab
            },
            up() {
                let userInfo = getItem("userInfo")
                if (userInfo) {
                    this.cellphone = userInfo.cellphone
                }
            },
            goAuth() {
                if (!checkRealName()) {
                    this.routerTo('/mine/realName')
                } else {
                    successMsg('您已经实名认证无需再次认证')
                }
            },
            validate() {
                this.$router.push({name: 'mine-account', query:{tabView: 'select1', iscur: 0}})
            },
            logout() {
                logout()
                setItem("userInfo", "")
                setItem(TOKEN_OBJ_ID, "")
                this.$router.push({path: "/"})
            },
        },
        mounted() {
            this.tab = this.$route.path.split('/')[2]
            this.up()
        },
        beforeDestroy () {
            bus.$emit("disSelectMine")
        }
    }
</script>

<style scoped lang="less">
@import url(~assets/less/reset.less);
@import url(~assets/less/mine.less);
</style>
