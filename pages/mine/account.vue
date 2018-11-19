<template>
    <div>
        <div class="main">
            <div class="main-header">
                <div class="left">
                    <p>总资产（元）</p>
                    <p>{{info.accountAsset | formatMoney}}</p>
                </div>
                <div class="right">
                    <div class="item1">
                        <ul>
                            <li>可用资金</li>
                            <li>{{data.cash | formatMoney }}</li>
                        </ul>
                        <ul>
                            <li>持仓市值</li>
                            <li>{{info.totalStockMarketValue | formatMoney }}</li>
                        </ul>
                        <ul>
                            <li>可取资金</li>
                            <li>{{data.canExtract | formatMoney }}</li>
                        </ul>
                    </div>
                    <div class="item2">
                        <ul>
                            <li>冻结资金</li>
                            <li>{{info.totalFrozenBalance | formatMoney}}</li>
                        </ul>
                        <ul>
                            <li>浮动盈亏</li>
                            <li>{{info.totalProfit | formatMoney }}</li>
                        </ul>
                        <ul>
                            <li>推广收益</li>
                            <li>{{data.totalSpreadIncome | formatMoney }}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="main-body">
                <div class="select">
                    <span v-for="(tab, index) in tabs" :class="{cur: iscur==index}" :key=index @click="iscur=index, tabChange('select' + (index + 1))">{{tab.name}}</span>
                </div>
                <component :is="tabView"></component>
            </div>
        </div>
    </div>
</template>

<script>
import select1 from '~/pages/account/recharge.vue';
import select2 from '~/pages/account/withdraw.vue';

import {getCustAssetInfo} from '~/api/trade';
import {getAccountCount} from '~/api/personal';
import {formatMoney, checkRealName, getItem, errorMsg} from '~/plugins/tool';
export default {
    data() {
        return {
            tabView: 'select1',
            tabs: [{name: "充值"}, {name: "提现"}],
            iscur: 0,
            info: {},
            data: {},
            userInfo: {}
        }
    },
    components: {
        select1,
        select2
    },
    filters:{
        formatMoney: formatMoney
    },
    methods: {
        tabChange(tab) {
            if (tab === 'select2') {
                if (!checkRealName()) {
                    errorMsg('您还未实名认证，请先实名认证再绑卡')
                    return false
                }
                if (this.userInfo.bankCards.length == 0) {
                    errorMsg('您还未绑定银行卡，请先绑定银行卡')
                    return false
                }
            }
            this.tabView = tab

        },
        getInfo() {
            getCustAssetInfo({}).then(res => {
                if (res.code == 1) {
                    this.info = res.data
                }
            })
        },
        getData() {
            getAccountCount({}).then(res => {
                if (res.status == 1) {
                    this.data = res.data
                }
            })
        },
        init () {
            this.info = {
                accountAsset: '--',
                totalStockMarketValue: '--',
                totalProfit: '--',
                totalFrozenBalance: '--'
            }
            this.data = {
                canExtract: '--',
                totalSpreadIncome: '--',
                cash: '--'
            }
        }
    },
    mounted() {
        this.init()
        this.getInfo()
        this.getData()
        this.userInfo = getItem('userInfo')
        this.tabView = this.$route.query.tabView
        this.iscur = this.$route.query.iscur
    }
}
</script>

<style scoped lang="less">
@import url(~assets/less/account.less);
</style>
