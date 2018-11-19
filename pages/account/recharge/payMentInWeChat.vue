<template>
    <div class="recharge_box">
        <div class="cont-box cf">
            <div class="cont-left pay">
                <span>充值金额</span>
                <span v-if="otherShow">其他金额</span>
            </div>
            <div class="cont-right">
                <div class="cardlist">
                    <div class="btn-group-wrap">
                        <button :class="{selectButton: showMoney==v.value}" class="JS-trade-applyAmount select-btn moneyList"
                                v-for='(v,k) in selectMoneyData' :key=k
                                @click="seleced(v.value, v.number, k)"
                        >{{v.value}}
                        </button>
                    </div>
                    <div class="recharge_money choiceMoney" v-if="otherShow">
                        <input type="text" class="recharge_text" v-model="choiceMoney">&nbsp;元
                    </div>
                    <div class="recharge_btn ">
                        <form v-bind:action="payUrl" method="POST" @submit.prevent="pay" ref="WexinPayForm" target="_blank">
                            <input type="hidden" name="uid" v-model="uid">
                            <input type="hidden" name="amount_of_account" :value="amount_of_account">
                            <input type="hidden" name="payType" v-model="type">
                            <button class="btn-red btn-standard" type="submit">立即充值</button>
                        </form>
                    </div>
                </div>

                <div class="recharge_tips">

                </div>
            </div>
        </div>

        <!-- 弹窗 -->
        <el-dialog
                title="支付结果"
                :visible.sync="show"
                width="30%"
                :before-close="handleClose"
        >
            <div class="payToast">
                <p>微信扫码充值 {{ amount_of_account }}元</p>
                <p>如已支付成功，未到账，请联系客服</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="chargeError()">支付失败</el-button>
                <el-button type="primary" @click="chargeSuccess">支付成功</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {host} from "../../../api/api"
    import {errorMsg} from "../../../plugins/tool"
    export default {
        name: 'payMentInAli',
        props: ['uid'],
        data() {
            return {
                selectMoneyData: [
                    {
                        id: 1,
                        value: '100',
                        number: 100
                    },
                    {
                        id: 2,
                        value: '300',
                        number: 300

                    },
                    {
                        id: 3,
                        value: '500',
                        number: 500
                    },
                    {
                        id: 4,
                        value: '1000',
                        number: 1000
                    },
                    {
                        id: 5,
                        value: '2000',
                        number: 2000
                    },
                    {
                        id: 6,
                        value: '3000',
                        number: 3000
                    },
                    {
                        id: 7,
                        value: '5000',
                        number: 5000
                    },
                    {
                        id: 8,
                        value: '10000',
                        number: 10000
                    },
                    {
                        id: 9,
                        value: '其他金额',
                        number: '其他金额'
                    }
                ],
                showMoney: '100',
                choiceMoney: '',
                show: false,
                type: 2,
                payUrl: host + '/payMonitor',
                otherShow: false
            }
        },
        methods: {
            pay() {
                if (this.amount_of_account == "" || this.amount_of_account < 1) {
                    errorMsg("金额不能为空且必须不低于100")
                    return false
                }
                // if ((new Date()).getHours() < 9 || (new Date()).getHours() > 17) {
                //     errorMsg("充值时间为09:00~17:00")
                //     return false
                // }
                this.show = true
                this.$refs['WexinPayForm'].submit()
            },
            seleced(value, number, index) {
                if (value === '其他金额') {
                    this.otherShow = true
                    this.showMoney = '其他金额'
                    this.choiceMoney = ""
                } else {
                    this.otherShow = false
                    this.showMoney = value
                    this.choiceMoney = value
                }
            },
            handleClose(done) {
                this.choiceMoney = ""
                done()
            },
            chargeSuccess () {
                this.show = false
                let _this = this
                _this.$router.push('/')
            },
            chargeError () {
                this.show = false
                this.choiceMoney = ""
            }
        },
        computed: {
            amount_of_account() {
                return this.choiceMoney > 0 ? this.choiceMoney : this.showMoney
            }
        }
    }
</script>


<style scoped>

    .pay span {
        display: block;
    }
    .pay span:nth-child(2) {
        margin-top: 220px;;
    }
    .btn-group-wrap {
        width: 580px;
    }
    .moneyList {
        color: #333;
        margin: 0 40px 25px 0;
    }
    .choiceMoney {
        margin-bottom: 50px;
        margin-top: 20px;
    }
    .selectButton {
        color: #fff;
        background:rgba(255,37,38,1);
        border: 1px solid rgba(255,37,38,1);
    }
    .payToast {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .payToast p {
        font-size: 14px;
        line-height: 28px;
        color: #000;
    }

    .select-btn {
        width: 100px;
        height: 54px;
        text-align: center;
        color: #3CA4D9;
        border: 1px solid #CCC;
        font-size: 14px;
        font-weight: 700;
        background-color: #fff;
        margin: 20px 10px 0;
        padding: 0
    }
    .recharge_input {
        width: 300px;
        height: 56px;
        line-height: 56px
    }

    .recharge_text {
        width: 283px;
        height: 52px;
        line-height: 52px;
        border: 1px solid #ddd;
        padding-left: 10px;
    }

    .recharge_btn {
        border-top: 1px solid #DDD;
        padding-top: 55px;
        margin-top: 55px
    }

    .recharge_btn a, .recharge_btn button {
        margin: 0 auto
    }

    .cont-left {
        float: left;
        width: 170px;
        font-size: 14px;
        color: #666;
        font-weight: 700;
        text-align: right;
        padding-right: 40px;
        padding-top: 25px
    }

    .cont-right {
        float: right;
        width: 600px;
        color: #999;
        font-size: 12px
    }
    .btn-red {
        background: #ff2626;
    }
    .btn-standard, .btn-standard:hover, .btn-trade, .btn-trade-selected {
        font-weight: 700;
        padding-left: 0;
        padding-right: 0;
        text-align: center;
        display: block;
        cursor: pointer;
        border: 0;
    }
    .btn-standard, .btn-standard:hover {
        width: 220px;
        height: 58px;
        line-height: 58px;
        font-size: 16px;
        color: #fff
    }

    .recharge_tips {
        margin-top: 115px;
        font-size: 14px;
        border-top: 1px dashed #ddd;
        padding-top: 20px;
        color: #999;
        line-height: 22px;
    }
    .recharge_btn{
        border-top: 1px solid #ddd;
        padding-top: 55px;
        margin-top: 55px;
    }
    .selectButton{
        color: #fff;
        background: #ff2526;
        border: 1px solid #ff2526;
    }
</style>

