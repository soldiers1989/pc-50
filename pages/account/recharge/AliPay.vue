<template>
    <div>
        <div class="recharge_box cf">
            <div class="cont-box">
                <div class="cont-left">
                    充值金额
                </div>
                <div class="cont-right">
                    <div class="cont-right" style="position: relative;left: 20px">
                        <div class="recharge_money">
                            <input type="text" class=" recharge_text" name="amount_of_account" v-model="amount_of_account">&nbsp;元
                        </div>
                        <div class="recharge_btn">
                            <input type="hidden" name="uid" v-model="uid">
                            <input type="hidden" name="payType" value="web">
                            <button class="btn-red btn-standard" @click="netPay_like()">立即充值</button>
                        </div>

                        <div class="recharge_tips">

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
                title="提示"
                :visible.sync="show"
                width="30%" :close-on-click-modal='false'>
            <div style="text-align: center">
                <p style="padding: 10px;display: block">您好，本次交易请按照指定的金额转账，金额与二维码不符会充值失败哦！</p>
                <span style="padding: 10px;display: block">应转账的金额为：<span class="fontRed">{{mount}}</span>元</span>
                <img :src="imgUrl" alt="转账二维码">
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="chargeSuccess">充值成功</el-button>
                <el-button type="primary" @click="chargeError()">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {host} from "../../../api/api"
    import {errorMsg} from "../../../plugins/tool";
    import {AliPay} from "../../../api/personal";

    export default {
        props: [
            "uid"
        ],
        data() {
            return {
                LikePayUrl: host + "/AliPay",
                amount_of_account: "",
                show: false,
                imgUrl: '',
                mount: ""
            }
        },
        methods: {
            netPay_like() {
                if(this.amount_of_account == "" || this.amount_of_account < 100) {
                    errorMsg("金额不能为空且必须不低于100")
                    return false
                }
                let _this = this
                AliPay({uid: _this.uid, amount_of_account: _this.amount_of_account}).then(function (data) {
                    _this.imgUrl = data.data.image
                    _this.mount = data.data.money
                    _this.show = true
                }).catch(function (err) {
                    console.log(err)
                })
            },
            chargeSuccess () {
                this.dialogCharging = false
                let _this = this
                _this.$router.push('/')
            },
            chargeError () {
                this.dialogCharging = false
            }
        }
    }
</script>

<style scoped>
    .el-dialog__body{
        text-align: center !important;
    }
    .recharge_box {
        margin-top: 25px;
    }
    .cont-left {
        float: left;
        width: 170px;
        font-size: 14px;
        color: #666;
        font-weight: 700;
        text-align: right;
        padding-right: 40px;
        padding-top: 18px;
    }
    .cont-right{
        float: left;
        width: 600px;
    }
    .recharge_text {
        width: 283px;
        height: 52px;
        line-height: 52px;
        border: 1px solid #ddd;
        padding-left: 10px;
        margin: 0;
        font-size: 100%;
        font-family: inherit;
        outline-offset: 0;
        outline-style: none;
        outline-width: 0;
        -webkit-font-smoothing: inherit;
        background-image: none;
        -webkit-appearance: textfield;
        background-color: white;
        -webkit-rtl-ordering: logical;
        cursor: text;

    }
    .recharge_btn {
        border-top: 1px solid #ddd;
        padding-top: 55px;
        margin-top: 55px;
    }
    .btn-standard{
        ont-weight: 700;
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
        color: #fff;
    }
    .recharge_btn a, .recharge_btn button {
        margin: 0 auto;
    }
    .btn-red {
        background: #ff2c3c;
    }
    .recharge_tips {
        margin-top: 115px;
        font-size: 14px;
        border-top: 1px dashed #ddd;
        padding-top: 20px;
        color: #999;
        line-height: 22px;
    }
</style>
