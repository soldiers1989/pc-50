<template>
    <div class="header">
        <!-- loginIn -->
        <header v-if="loginFlag">
             <div class="header-top ">
                <div class="wrap header-top-content">
                    <div class="left">
                        <span>您好，欢迎你来到{{platform_name || indexData.platform_name}}!</span>
                        <span><img src="~static/images/phone.png"></span>
                        <span>{{this.phone}}</span>
                    </div>
                    <diV class="right">
                        <span class="user">
                            <img src="~static/images/img_1_small.png">
                            {{userInfo.cellphone|| cellphone}}
                        </span>
                        <span class="line">|</span>
                        <span @click="logout">[退出]</span>
                    </diV>
                </div>
            </div>
            <div class="header-center">
                <div class="wrap header-center-content">
                    <div id="logo">
                        <h1 class="logo-tit">
                            <nuxt-link :to="{name: 'index'}">
                                <img :src="logoImg[0] && logoImg[0]['picUrl']">
                            </nuxt-link>
                        </h1>
                        <h2 class="logo-subtit">50ETF期权</h2>
                    </div>
                    <div class="link-item">
                        <span><nuxt-link to="/">首页</nuxt-link></span>
                        <span><nuxt-link :to="{name: 'market'}">实时行情</nuxt-link></span>
                        <span :class="{selectedRoute: isSelect} "><nuxt-link :to="{name: 'trade-buy'}">我的交易</nuxt-link></span>
                        <span><nuxt-link :to="{name: 'guide'}">新手指引</nuxt-link></span>
                        <span><nuxt-link :to="{name: 'about'}">关于我们</nuxt-link></span>
                        <span :class="{selectedRoute: isSelectMine} "><nuxt-link :to="{name: 'mine-account', query:{tabView: 'select1', iscur: 0}}">个人中心</nuxt-link></span>
                    </div>
                </div>
            </div>
        </header>
        <!-- loginOut -->
        <header v-if="!loginFlag">
            <div class="header-top ">
                <div class="wrap header-top-content">
                    <div class="left">
                        <span>您好，欢迎你来到{{platform_name || indexData.platform_name}}!</span>
                        <span><img src="~static/images/phone.png"></span>
                        <span>{{this.phone}}</span>
                    </div>
                    <diV class="right">
                        <span @click="isShowJoint">登录</span>
                        <span class="line">|</span>
                        <span @click="isShowJoinRegt">注册</span>
                    </diV>
                </div>
            </div>
            <div class="header-center">
                <div class="wrap header-center-content">
                    <div id="logo">
                        <h1 class="logo-tit">
                            <nuxt-link :to="{name: 'index'}">
                                <img :src="logoImg[0] && logoImg[0]['picUrl']">
                            </nuxt-link>
                        </h1>
                        <h2 class="logo-subtit">50ETF期权</h2>
                    </div>
                    <div class="link-item">
                        <span><nuxt-link to="/">首页</nuxt-link></span>
                        <span><nuxt-link :to="{name: 'market'}">实时行情</nuxt-link></span>
                        <span @click="isShowJoint" :class="{selectedRoute: isSelect} ">我的交易</span>
                        <span><nuxt-link :to="{name: 'guide'}">新手指引</nuxt-link></span>
                        <span><nuxt-link :to="{name: 'about'}">关于我们</nuxt-link></span>
                        <span @click="isShowJoint" :class="{selectedRoute: isSelectMine} ">个人中心</span>
                    </div>
                </div>
            </div>
        </header>
        <Login />
        <Register />
    </div>
</template>

<script>
    import {bus} from '~/plugins/bus';
    import {validLogin, getItem, setItem} from '~/plugins/tool';
    import {getUserInfo, TOKEN_OBJ_ID, fetchToken} from '~/api/ajax.js';
    import {logout} from '~/api/personal.js';
    import {mapState, mapMutations} from 'vuex';
    import Login from '~/pages/login/index';
    import Register from '~/pages/login/reg';
    import {getProduct} from "../api/trade";
    import {getAllProduct} from "../api/personal";
    import {setLoginInfo} from "../api/ajax";

    export default {
        data() {
            return {
                loginFlag: false,
                platform_name: '',
                cellphone: "",
                isSelect: false,
                isSelectMine: false,
                logoImg: [],
                phone: ''
            }
        },
        inject:['reload'],
        components: {
            Login, Register
        },
        computed: {
            ...mapState(['userInfo', 'indexData'])
        },
        methods: {
            ...mapMutations(['routerTo', 'isShowJoin', 'isShowJoinReg', 'upUserInfo', 'isShowJoint', 'isShowJoinRegt']),
            isLogin() {
                if (fetchToken()) {
                    this.loginFlag = true
                }
            },
            logout() {
                logout()
                setItem("userInfo", "")
                setItem(TOKEN_OBJ_ID, "")
                this.loginFlag = false
                this.$router.push({path: "/"})
            },
            upData() {
                let index = getItem("indexData")
                let info = getItem("userInfo")
                if (index) {
                    this.platform_name = index.platform_name
                    this.logoImg = index.others[6] || this.logoImg
                    this.phone = index.service_phone
                }
                if (info) {
                    this.cellphone = info.cellphone
                }
            }
        },
        mounted() {
            this.isLogin()
            this.upData()
            let _this = this
            bus.$on('send', (obj) => {
                this.loginFlag = obj
            })
            bus.$on('updateIndexData', () => {
                _this.upData()
            })
            bus.$on("isSelectTrade", function () {
                _this.isSelect = true
            })
            bus.$on("diselected", function () {
                _this.isSelect = false
            })
            bus.$on("isSelectMine", function () {
                _this.isSelectMine = true
            })
            bus.$on("disSelectMine", function () {
                _this.isSelectMine = false
            })
            bus.$on("logout", () => {
                _this.$router.push("/")
                _this.isShowJoint()
            })
            let access_token = this.$route.query.access_token
            if (access_token) {
                setLoginInfo({'access_token': access_token})
                getUserInfo()
                .then(res => {
                    _this.$router.push({path: "/"})
                    _this.reload()
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        },
        beforeDestroy () {
            bus.$off("isSelectTrade")
            bus.$off("isSelectMine")
            bus.$off("diselected")
            bus.$off("disSelectMine")
            bus.$off("logout")
        }
    }
</script>

<style lang="less" scoped>
@import url(~assets/less/reset.less);
@import url(~assets/less/header.less);

    .selectedRoute {
        background-color: #EB2F30;
        border-radius: 21px;
        box-shadow: 3px 4px 8px rgba(235,47,48,0.3);
        a {
            color: @fff;
        }
    }
</style>

