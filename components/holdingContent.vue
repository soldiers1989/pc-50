<template>
    <div class="holdingContent_page">
        <ul class="holding_content-title">
            <li>合约代码</li>
            <li>合约名称</li>
            <li>持仓/可卖</li>
            <li>成本价</li>
            <li>现价</li>
            <li>持仓市值</li>
            <li>浮动盈亏</li>
            <li>到期日</li>
            <li>剩余天数</li>
        </ul>

        <ul class="holding_content-content">
            <li v-for="(value,key) in holdingData" :key="key" @click="goforSell(value)">
                <span>{{value.optionCode}}</span>
                <span>{{value.optionName}}</span>
                <span>{{value.holdAmount}}/{{value.enableAmount}}</span>
                <span>{{value.costMoney}}</span>
                <span :class="{fontRed: value.costMoney <= value.price, fontGreen: value.costMoney > value.price}">{{value.price}}</span>
                <span>{{value.marketValue}}</span>
                <span :class="{fontRed: value.profit >= 0, fontGreen: value.profit < 0}">{{value.profit}}</span>
                <span>{{value.exerciseDate | formatDate}}</span>
                <span>{{value.remainDays}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import {getCustHoldingsInfoList} from "../api/trade";
    import {bus} from "../plugins/bus";
    import {formatDate} from "../plugins/tool";

    export default {
        data () {
            return {
                holdingData: [],
                refreshData: null
            }
        },
        filters: {
            formatDate (time) {
                var date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd')
            }
        },
        methods: {
            getData () {
                let _this = this
                getCustHoldingsInfoList().then(res => {
                    if (res.code == 1) {
                        _this.holdingData = res.data
                    } else {
                        console.log(res.msg)
                    }
                })
            },
            goforSell (obj) {
                console.error(obj)
                let op = {
                    stockFinanceHoldId: obj.id,
                    parentStockFinanceId: obj.parentStockFinanceId,
                    optionCode: obj.optionCode,
                    holdAmount: obj.holdAmount
                }
                this.$router.push({name: 'trade-sell', query: {obj: JSON.stringify(op), code: obj.optionCode}})
                this.$emit("sendHoldings", op)
            }
        },
        mounted () {
            let _this = this
            this.getData()
            // this.refreshData = setInterval(this.getData, 8000)
            bus.$on('updateHoldings', function () {
                console.error(123456)
                _this.getData()
            })
        },
        beforeDestroy () {
            clearInterval(this.refreshData)
            bus.$off('updateHoldings')
        }
    }
</script>

<style scoped lang="less">
    @import url(~assets/less/trade.less);
</style>
