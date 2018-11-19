<template>
    <div class="trade_child_page">
        <div class="holdingContent_page">
            <ul class="dailyEntrust_content-title">
                <li>委托时间</li>
                <li>合约代码</li>
                <li>合约名称</li>
                <li>委托类型</li>
                <li>委托价格</li>
                <li>委托数量</li>
                <li>委托状态</li>
            </ul>

            <ul class="dailyEntrust_content-content">
                <li v-for="(value, key) in EntrustList" :key=key>
                    <span>{{value.entrustTime | formatDate}}</span>
                    <span>{{value.optionCode}}</span>
                    <span>{{value.optionName}}</span>
                    <span>
                        <span class="fontRed" v-if="value.entrustBs == 1">买入</span>
                        <span class="fontBlue" v-if="value.entrustBs == 2">卖出</span>
                    </span>
                    <span v-if="value.entrustProp == 0">{{value.optEntrustPrice}}</span>
                    <span v-if="value.entrustProp == 'OPB'">市价</span>
                    <span>{{value.entrustAmount}}</span>
                    <span>{{value.entrustStatus_text}}</span>
                </li>
            </ul>
        </div>
        <div align="right" class="page" v-if="EntrustList.length">
            <el-pagination
                layout="prev, pager, next"
                :page-count="pageCount" :current-page:sync="formData.current" @current-change="changePage">
            </el-pagination>
        </div>
        <div class="no_data">
            <img src="~/static/images/img_nodata.png" alt="" v-if="!EntrustList" >
        </div>
    </div>
</template>

<script>
    import {getHistoryEntrustList} from "../../api/trade";
    import {formatDate} from "../../plugins/tool";

    export default {
        name: "buy",
        data () {
            return {
                noData: false,
                formData: {
                    size: 10,
                    current: 1,
                    obj: {}
                },
                EntrustList: [],
                pageCount: 1
            }
        },
        methods: {
            onLoad() {
                let _this = this
                getHistoryEntrustList(this.formData).then(function (res) {
                    if (res.code == 1) {
                        let records = res.data.records.reverse()
                        _this.pageCount = res.data.pages
                        _this.EntrustList = res.data.records
                        for (let value of _this.EntrustList) {
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
            changePage (page) {
                this.formData.current = page
                this.onLoad()
            }
        },
        filters: {
            formatDate (time) {
                var date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            }
        },
        mounted () {
            this.pageCount = 1
            this.onLoad()
        }
    }
</script>

<style scoped lang="less">
    @import url(~assets/less/tabel.less);
    @import url(~assets/less/trade.less);
</style>
