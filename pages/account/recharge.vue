<template>
    <div slot="select1">
        <div class="main">
            <ul class="main-header cf">
                <li class="header-list" @click="changePage('bankTransfer')" :class="{selected : showFlag == 'bankTransfer'}" v-if="1">银行转账<span>支持大额</span></li>
                <li class="header-list" @click="changePage('quickPay')" :class="{selected : showFlag == 'quickPay'}" v-if="isSupportHBIPS">网关支付<span class="fontRed">测试中！请勿支付！</span></li>
                <li class="header-list" @click="changePage('aliPay')" :class="{selected : showFlag == 'aliPay'}" v-if="isAliPay">支付宝支付<span class="fontRed">测试中！请勿支付！</span></li>
                <li class="header-list" @click="changePage('wxPay')" :class="{selected : showFlag == 'wxPay'}" v-if="isSupportWx">微信支付<span class="fontRed">测试中！请勿支付！</span></li>

                <li class="header-list" @click="changePage('aliMPay')" :class="{selected : showFlag == 'aliMPay'}" v-if="isSupportM">支付宝支付<span class="fontRed" style="height: 32px;display: block"></span></li>
                <li class="header-list" @click="changePage('wxMPay')" :class="{selected : showFlag == 'wxMPay'}" v-if="isSupportM">微信支付<span class="fontRed" style="height: 32px;display: block"></span></li>
                <li class="header-list" @click="changePage('quickPay')" :class="{selected : showFlag == 'quickPay'}" v-if="isSupportHBIPS">网关支付<span class="fontRed" style="height: 32px;display: block"></span></li>
                <li class="header-list" @click="changePage('aliPay')" :class="{selected : showFlag == 'aliPay'}" v-if="isAliPay">支付宝支付<span class="fontRed" style="height: 32px;display: block"></span></li>
                <li class="header-list" @click="changePage('wxPay')" :class="{selected : showFlag == 'wxPay'}" v-if="isSupportWx">微信支付<span class="fontRed" style="height: 32px;display: block"></span></li>
                <li class="header-list" @click="changePage('XPay')" :class="{selected : showFlag == 'XPay'}" v-if="isSupportXPay">快捷支付<span class="fontRed">测试中！请勿支付！</span></li>

                <li class="header-list" @click="changePage('XNetPay')" :class="{selected : showFlag == 'XNetPay'}" v-if="isSupportXPay">网关支付<span class="fontRed">测试中！请勿支付！</span></li>
            </ul>
            <div class="main-body">
                <bankTransfer v-if="showFlag == 'bankTransfer'"></bankTransfer>
                <quickPay v-if="showFlag == 'quickPay'" :uid="this.uid"></quickPay>
                <AliPay v-if="showFlag == 'aliPay'" :uid="this.uid"></AliPay>
                <WxPay v-if="showFlag == 'wxPay'" :uid="this.uid"></WxPay>
                <MAliPay v-if="showFlag == 'aliMPay'" :uid="this.uid"></MAliPay>
                <MWxPay v-if="showFlag == 'wxMPay'" :uid="this.uid"></MWxPay>
                <XNetPay v-if="showFlag == 'XNetPay'" :uid="this.uid"></XNetPay>
                <XPay v-if="showFlag == 'XPay'" :uid="this.uid"></XPay>
            </div>
        </div>
    </div>
</template>

<script>
import bankTransfer from '~/pages/account/recharge/bankTransfer.vue';
import quickPay from '~/pages/account/recharge/quickPay.vue'
import {getItem} from "../../plugins/tool";

import AliPay from '~/pages/account/recharge/AliPay.vue';
import WxPay from '~/pages/account/recharge/WxPay.vue';
import MAliPay from '~/pages/account/recharge/payMentInAli.vue'
import MWxPay from '~/pages/account/recharge/payMentInWeChat.vue'
import XNetPay from "~/pages/account/recharge/XNetPay.vue";
import XPay from "~/pages/account/recharge/XPay.vue";

export default {
    data() {
        return {
            showFlag: 'bankTransfer',
            isSupportHBIPS: 0,
            isAliPay: 0,
            isSupportWx: 0,
            uid: "",
            isSupportM: 0,
            isSupportXPay: 0
        }
    },
    components: {
        bankTransfer,
        quickPay,
        AliPay,
        WxPay,
        MAliPay,
        MWxPay,
        XNetPay,
        XPay
    },
    methods: {
        changePage(pageFlag) {
            this.showFlag = pageFlag
        },
        upIndexData () {
            let indexData = getItem('indexData')

            let userInfo = getItem("userInfo")
            this.uid = userInfo.cust_id
            this.isSupportHBIPS = indexData.is_support_hbIps
            this.isAliPay = indexData.is_support_aliPay
            this.isSupportWx = indexData.is_support_WxPay
            this.isSupportM = indexData.is_support_m
            this.isSupportXPay = indexData.is_support_xpay
        }
    },
    mounted () {
        this.upIndexData()
    }
}

</script>

<style scoped lang="less">
.main {
    margin-top: 24px;
    padding: 0 15px;
    .main-header {
        border-bottom: 1px solid #ccc;
        .header-list {
            float: left;
            padding: 0 3px;
            margin-right: 36px;
            font-size: 16px;
            color: #333;
            font-weight: 600;
            cursor: pointer;
            text-align: center;
            span {
                display: block;
                font-size: 14px;
                color: #666;
                padding: 8px 0;
            }
        }
        .selected {
            border-bottom: 3px solid #EB2F30;
        }
    }
}

</style>


