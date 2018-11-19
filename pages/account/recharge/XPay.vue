<template>
    <div>
        <form :action="LikePayUrl" method="post" target="_blank" @submit.prevent="netPay_like" ref="netPayForm_like">
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
                                <button class="btn-red btn-standard" type="submit">立即充值</button>
                            </div>

                            <div class="recharge_tips">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <el-dialog
                title="提示"
                :visible.sync="dialogCharging"
                width="30%" :close-on-click-modal='false'>
            <span>尊敬的客户您好！请您在新打开的网页中进行充值，充值未完成之前请不要关闭该窗口</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="chargeSuccess">充值成功</el-button>
            <el-button type="primary" @click="chargeError()">充值失败</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
    import {host} from "../../../api/api"
    import {errorMsg} from "../../../plugins/tool";

    export default {
        props: [
            "uid"
        ],
        data() {
            return {
                LikePayUrl: host + "/XPay",
                amount_of_account: "",
                dialogCharging: false
            }
        },
        methods: {
            netPay_like() {
                if(this.amount_of_account == "" || this.amount_of_account < 100) {
                    errorMsg("金额不能为空且必须不低于100")
                    return false
                }
                this.dialogCharging = true
                this.amount_of_account = ""
                this.$refs['netPayForm_like'].submit()
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
