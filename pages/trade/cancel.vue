<template>
    <div class="trade_child_page">
        <div class="holdingContent_page">
            <ul class="cancel_content-title">
                <li>委托时间</li>
                <li>合约代码</li>
                <li>合约名称</li>
                <li>交易类型</li>
                <li>委托价格</li>
                <li>委托数量</li>
                <li>委托状态</li>
                <li>操作</li>
            </ul>

            <ul class="cancel_content-content">
                <li v-for="(value, key) in cancelData" :key="key" class="cancel_content">
                    <span>{{value.entrustTime | formatDate}}</span>
                    <span>{{value.optionCode}}</span>
                    <span>{{value.optionName}}</span>
                    <span>
                        <span class="fontRed" v-if="value.entrustBs == 1">买入</span>
                        <span class="fontMarketBlue" v-if="value.entrustBs == 2">卖出</span>
                    </span>
                    <span>{{value.optEntrustPrice}}</span>
                    <span>{{value.entrustAmount}}</span>
                    <span>{{value.entrustStatus_text}}</span>
                    <span class="cancel_button">
                        <button @click="revoke(value)" :class="{bgRed: cancel == false, bgGrey: id == value.id}" :disabled = "id == value.id">撤单</button>
                    </span>
                </li>
            </ul>
        </div>
        <div class="no_data">
            <img src="~/static/images/img_nodata.png" alt="" v-if="!cancelData || !cancelData.length">
        </div>

    </div>
</template>

<script>
    import {getTodayWithdrawList, cancelEntrust} from "../../api/trade";
    import {successMsg, errorMsg} from "../../plugins/tool";
    import {formatDate} from "../../plugins/tool";

    export default {
        name: "cancel",
        data () {
            return {
                confirm: false,
                cancel: false,
                id: '',
                cancelData: []
            }
        },
        filters: {
            formatDate (time) {
                var date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            }
        },
        methods: {
            getData () {
                let _this = this
                getTodayWithdrawList({}).then(res => {
                    if (res.code == 1) {
                        _this.cancelData = res.data
                        for (let value of _this.cancelData) {
                            switch (value.entrustStatus) {
                                case 0:
                                    value.entrustStatus_text = '撤单委托中'
                                    break
                                case 1:
                                    value.entrustStatus_text = '委托中'
                                    break
                                case 2:
                                    value.entrustStatus_text = '未成交'
                                    break
                                case 3:
                                    value.entrustStatus_text = '已报待撤'
                                    break
                                case 4:
                                    value.entrustStatus_text = '部成待撤'
                                    break
                                case 5:
                                    value.entrustStatus_text = '部成部撤'
                                    break
                                case 6:
                                    value.entrustStatus_text = '已撤单'
                                    break
                                case 7:
                                    value.entrustStatus_text = '部分成交'
                                    break
                                case 8:
                                    value.entrustStatus_text = '已成交'
                                    break
                                case 9:
                                    value.entrustStatus_text = '委托失败（废单）'
                                    break
                                case 10:
                                    value.entrustStatus_text = '撤单失败（撤废）'
                                    break
                            }
                        }
                    }
                })
            },
            revoke (value) {
                let _this = this
                this.id = value.id
                this.confirm = true
                this.$confirm('是否撤销该委托', '提示信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    _this.confirmCancel()
                })
            },
            confirmCancel () {
                let _this = this
                cancelEntrust({entrustId: this.id}).then(res => {
                    if (res.code == 1) {
                        _this.confirm = false
                        _this.id = null
                        _this.getData()
                        successMsg("撤销成功")
                    } else {
                        _this.confirm = false
                        _this.id = null
                        _this.getData()
                        errorMsg(res.msg)
                    }
                })
            }
        },
        mounted () {
            this.getData()
        }
    }
</script>

<style scoped lang="less">
    @import url(~assets/less/trade.less);
</style>
