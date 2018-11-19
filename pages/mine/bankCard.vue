<template>
    <div>
        <div class="main">
            <p class="title">我的银行卡</p>
            <div class="main-body">
                <div v-if="cardData.length != 0" class="main-item1">
                    <ul class="line1">
                        <li v-for="(value, key) in cardData" :key="key">
                            <img :src="`../../images/${value.bank_code}.png`">
                            <p>{{value.bank_card}}</p>
                            <span @click.stop="relieve(value.id)">解除绑定</span>
                        </li>
                    </ul>
                    <div class="line2" align="center">
                        <button @click="routerTo('/mine/bindCard')">添加银行卡</button>
                    </div>
                </div>
                <div v-if="cardData.length == 0" class="main-item2">
                    <div class="line3">
                        <img src="~/static/images/img_card.png">
                    </div>
                    <div class="line4" align="center">
                        <button class="submit" @click="bindCard">绑定银行卡</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {deleteBankCard} from '~/api/personal.js';
import {getUserInfo} from '~/api/ajax.js';
import {successMsg, errorMsg, checkRealName, getItem} from "~/plugins/tool.js";
import {mapState, mapMutations} from 'vuex';
import bankCardOptions from '~/plugins/global.js';

export default {
    data() {
        return {
            cardData: [],
            bankCardOptions: bankCardOptions
        }
    },
    methods: {
        ...mapMutations(['routerTo']),
        relieve(id) {
            let _this = this
            this.$confirm('您将无法使用该银行卡进行操作是否确定解除绑定？', '解除绑定' , {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
            .then(() => {
                deleteBankCard({id: id}).then((res) => {
                    successMsg("解绑成功")
                    getUserInfo().then((res) => {
                        _this.getBankList()
                    })
                })
            })
            .catch(() => {})
        },
        bindCard() {
            let _this = this
            if (!checkRealName()) {
                // this.$confirm('您还未实名认证，请先实名认证再绑卡', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // }).then(() => {
                //     // this.routerTo('/mine/realName')
                // }).catch(() => {

                // });
                errorMsg('您还未实名认证，请先实名认证再绑卡')
            } else {
                this.routerTo('/mine/bindCard')
            }
        },
        getBankList() {
            let _this = this
            let userInfo = getItem('userInfo')
            this.cardData = userInfo.bankCards
            for (let i = 0; i < this.cardData.length; i++) {
                _this.bankCardOptions.forEach(function (obj) {
                    if (obj.bankName.indexOf(_this.cardData[i].bank_name) > -1) {
                        _this.cardData[i].bank_code = obj.bankCode
                    }
                })
            }
        },
        getData () {
            let _this = this
            getUserInfo().then((res) => {
                _this.getBankList()
            })
        }
    },
    mounted() {
        this.getData()
        this.getBankList()
    },
}
</script>

<style scoped lang="less">
.main {
    background-color: #fff;
    padding: 0 45px;
    margin-bottom: 188px;
    padding-bottom: 100px;
    .title {
        font-size: 18px;
        line-height: 40px;
        padding-top: 50px;
        color: #333;
        font-weight: 600;
        border-bottom: 1px solid rgba(204,204,204,1);
        text-indent: 35px;
    }
    .main-body {
        .main-item1 {
            width: 320px;
            margin-left: 35px;
            margin-top: 30px;
            .line1 {
                li {
                    width: 320px;
                    height: 125px;
                    position: relative;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    p {
                        color: #fff;
                        font-size: 20px;
                        position: absolute;
                        top: 74px;
                        left: 84px;
                    }
                    span {
                        color: #fff;
                        font-size: 12px;
                        position: absolute;
                        top: 15px;
                        right: 15px;
                        cursor: pointer;
                    }
                }
            }
            .line2 {
                margin-top: 30px;
                button {
                    width: 200px;
                    height: 40px;
                    background: rgba(235,47,48,1);
                    border-radius: 20px;
                    box-shadow: 5px 0px 8px rgba(235,47,48,0.3);
                    color: #fff;
                    border: none;
                    outline: none;
                    cursor: pointer;
                }
            }
        }
        .main-item2 {
            width: 315px;
            margin-left: 35px;
            margin-top: 30px;
            .line3 {
                width: 280px;
                height: 256px;
                margin-bottom: 50px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .line4 {
                button {
                    width: 200px;
                    height: 40px;
                    background: rgba(235,47,48,1);
                    border-radius: 20px;
                    box-shadow: 5px 0px 8px rgba(235,47,48,0.3);
                    color: #fff;
                    border: none;
                    outline: none;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
