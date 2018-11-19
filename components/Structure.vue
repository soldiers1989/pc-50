<template>
    <div> 
        <div class="main">
            <div class="wrap main-content">
                <p class="title">交易流程</p>
                <div class="main-body">
                    <div class="item" @click="isShowJoinRegt">
                        <div class="item1">
                            <div class="item1-img">
                                <img src="~/static/images/icon_process_1.png">
                            </div>
                        </div>
                        <p>注册账户</p>
                    </div>
                    <div class="next">
                        <img src="~/static/images/next.png">
                    </div>
                    <div class="item" @click="validate1">
                        <div class="item1">
                            <div class="item1-img">
                                <img src="~/static/images/icon_process_2.png">
                            </div>
                        </div>
                        <p>实名认证</p>
                    </div>
                    <div class="next">
                        <img src="~/static/images/next.png">
                    </div>
                    <div class="item" @click="validate2">
                        <div class="item1">
                            <div class="item1-img">
                                <img src="~/static/images/icon_process_3.png">
                            </div>
                        </div>
                        <p>绑定银行卡</p>
                    </div>
                    <div class="next">
                        <img src="~/static/images/next.png">
                    </div>
                    <div class="item" @click="validate3">
                        <div class="item1">
                            <div class="item1-img">
                                <img src="~/static/images/icon_process_4.png">
                            </div>
                        </div>
                        <p>账户充值</p>
                    </div>
                    <div class="next">
                        <img src="~/static/images/next.png">
                    </div>
                    <div class="item" @click="validate4">
                        <div class="item1">
                            <div class="item1-img">
                                <img src="~/static/images/icon_process_5.png">
                            </div>
                        </div>
                        <p>买卖交易</p>
                    </div>
                    <div class="next">
                        <img src="~/static/images/next.png">
                    </div>
                    <div class="item" @click="validate5">
                        <div class="item1">
                            <div class="item1-img">
                                <img src="~/static/images/icon_process_6.png">
                            </div>
                        </div>
                        <p>盈利提现</p>
                    </div>
                </div>
                <div class="main-footer">
                    <div class="main-footer-content">
                        <News />
                    </div>
                </div>
            </div>
        </div>
        <div class="gray"></div>
    </div>
</template>

<script>
import {validLogin, getItem, setItem, checkRealName, successMsg, errorMsg} from '~/plugins/tool';
import {getUserInfo, TOKEN_OBJ_ID, fetchToken} from '~/api/ajax.js';
import {mapState, mapMutations} from 'vuex';
import News from '~/pages/news/index';
export default {
    data() {	
        return {}
    },
    components: {
        News
    },
    methods: {
        ...mapMutations(['isShowJoinRegt', 'routerTo', 'isShowJoint']),
        validate1() {
            if (!fetchToken()) {
                this.isShowJoint()
            } else if(!checkRealName()) {
                this.routerTo('/mine/realName')
            } else {
                successMsg('您已经实名认证无需再次认证')
            }
        },
        validate2() {
            if (!fetchToken()) {
                this.isShowJoint()
            } else {
               this.routerTo('/mine/bankCard')
            }
        },
        validate3() {
            if (!fetchToken()) {
                this.isShowJoint()
            } else {
               this.$router.push({name: 'mine-account', query:{tabView: 'select1', iscur: 0}})
            }
        },
        validate4() {
            if (!fetchToken()) {
                this.isShowJoint()
            } else {
               this.routerTo('/trade/buy')
            }
        },
        validate5() {
            if (!fetchToken()) {
                this.isShowJoint()
            } else {
                this.$router.push({name: 'mine-account', query:{tabView: 'select2', iscur: 1}})
            }
        }

    }
}
</script>

<style scoped lang="less">
.main {
    height: 569px;
    background: url(../static/images/img_bg.png) no-repeat;
    background-size: 100% 100%;
    .main-content {
        position: relative;
        .title {
            font-size:30px;
            color:#fff;
            line-height: 31px;
            text-align: center;
            padding: 59px 0 64px 0;
        }
        .main-body {
            display: flex;
            justify-content: space-between;
            .item {
                cursor: pointer;
                .item1 {
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    border: 15px solid rgba(255, 255, 255, .3);
                    align-items: center;
                    .item1-img {
                        width: 110px;
                        height: 110px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                p {
                    text-align: center;
                    padding-top: 19px;
                    font-size: 20px;
                    color: #fff;
                    line-height: 31px;
                }
            }
            .next {
                line-height: 150px;
            }
        }
        .main-footer {
            position: absolute;
            width: 100%;
            background-color: #fff;
            height: 280px;
            bottom: -356px;
            border-radius:30px;
            box-shadow:5px 0px 16px rgba(1,2,2,0.1);
            .main-footer-content {
                margin: 49px 80px 39px 80px;
            }
        }
    }
}
.gray {
    height: 161px;
    background-color: #f5f5f5;
}
</style>