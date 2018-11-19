<template>
    <div class="main">
        <p class="top">50ETF期权特点</p>
        <div class="wrap main-content">
           <div class="main-top">
                <div class="main-body">
                    <div class="main-body-left">
                        <img src="~/static/images/icon_1.png">
                    </div>
                    <ul class="main-body-right">
                        <li>权利开放</li>
                        <li>买涨买跌任您选择</li>
                    </ul>
                </div>
                <div class="main-body">
                    <div class="main-body-left">
                        <img src="~/static/images/icon_2.png">
                    </div>
                    <ul class="main-body-right">
                        <li>行情更新及时</li>
                        <li>实时更新行情信息 掌握买卖最佳时机</li>
                    </ul>
                </div>
                <div class="main-body">
                    <div class="main-body-left">
                        <img src="~/static/images/icon_3.png">
                    </div>
                    <ul class="main-body-right">
                        <li>真实交易</li>
                        <li>交易均通过理财方账户直连</li>
                        <li>上海证券交易所，真实可查</li>
                    </ul>
                </div>
                <div class="main-body">
                    <div class="main-body-left">
                        <img src="~/static/images/icon_4.png">
                    </div>
                    <ul class="main-body-right">
                        <li>延迟交易决策</li>
                        <li>买错方向，有较长周期等待行情回转</li>
                    </ul>
                </div>
            </div>
            <div class="main-top">
                <div class="main-body">
                    <div class="main-body-left">
                        <img src="~/static/images/icon_5.png">
                    </div>
                    <ul class="main-body-right">
                        <li>出入资金安全</li>
                        <li>资金第三方监管，专款专用</li>
                    </ul>
                </div>
                <div class="main-body">
                    <div class="main-body-left">
                        <img src="~/static/images/icon_6.png">
                    </div>
                    <ul class="main-body-right">
                        <li>T+0急速交易</li>
                        <li>双向交易，随时买卖，闪电交易</li>
                    </ul>
                </div>
                <div class="main-body">
                    <div class="main-body-left">
                        <img src="~/static/images/icon_7.png">
                    </div>
                    <ul class="main-body-right">
                        <li>风险有限盈利无限</li>
                        <li>最大亏损为购买期权时的权利金，最大盈利无限</li>
                    </ul>
                </div>
            </div>
            <div class="main-footer">
                <img src="~/static/images/img_2.png">
            </div>
        </div>
        <div align="center" class="main-link">
            <button @click="validate1">立即交易</button>
            <button @click="validate2">快速充值</button>
        </div>
    </div>
</template>

<script>
import {successMsg, errorMsg} from '~/plugins/tool';
import {getUserInfo, TOKEN_OBJ_ID, fetchToken} from '~/api/ajax.js';
import { mapMutations } from 'vuex';
export default {
    data() {	
        return {

        }
    },
    methods: {
        ...mapMutations(['routerTo', 'isShowJoint']),
        validate1() {
            if (!fetchToken()) {
                this.isShowJoint()
            } else {
               this.routerTo('/trade/buy')
            }
        },
        validate2() {
            if (!fetchToken()) {
                this.isShowJoint()
            } else {
                this.$router.push({name: 'mine-account', query:{tabView: 'select1', iscur: 0}})
            }
        }
    }
}
</script>

<style scoped lang="less">
@import url(~assets/less/reset.less);
.main {
    padding-bottom: 40px;
    background-color: #fff;
    .top {
        color: @333;
        padding: 50px 0;
        text-align: center;
        font-size: 30px;
        line-height: 31px;
    }
    .main-content {
        display: flex;
        justify-content: space-between;
        .main-top {
            .main-body {
                display: flex;
                align-items: center;
                padding-bottom: 40px;
                .main-body-left {
                    width: 70px;
                    height: 67px;
                    margin-right: 15px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .main-body-right {
                    li:nth-child(1) {
                        font-size: 20px;
                        color: @333;
                        font-weight: 600;
                        line-height: 31px;
                        white-space: nowrap;
                    }
                    li:nth-child(2) {
                        font-size: 14px;
                        color: @666;
                        line-height: 28px;
                        white-space: nowrap;
                    }
                    li:nth-child(3) {
                        font-size: 14px;
                        color: @666;
                        white-space: nowrap;
                    }
                }
            }
        }
        .main-footer {
            width: 420px;
            height: 415px;
            img {
                width: 100%;
                height: 100%;
            }
        }   
    }
    .main-link {
        button {
            width: 180px;
            height: 46px;
            line-height: 46px;
            color: @fff;
            border-radius: 23px;
            border: none;
            outline: none;
            box-shadow: 5px 0px 8px rgba(250,84,64,0.3);
            background: linear-gradient(left top, #FA4D42, #FE7E33);
            margin-top: 59px;
            font-size: 20px;
            cursor: pointer;
        }
        button:nth-child(1) {
            margin-right: 40px;
        }
        button:nth-child(2) {
            margin-left: 40px;
        }
    }
}
</style>