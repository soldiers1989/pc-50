<template>
    <div class="trade_child_page">
        <div class="holdingContent_page">
            <ul class="dailyEntrust_content-title">
                <li>成交时间</li>
                <li>合约代码</li>
                <li>合约名称</li>
                <li>成交类型</li>
                <li>成交价格</li>
                <li>成交数量</li>
                <li>成交状态</li>
            </ul>

            <ul class="dailyEntrust_content-content">
                <li v-for="(value, key) in DealList" :key="key">
                    <span>{{value.businessTime | formatDate}}</span>
                    <span>{{value.optionCode}}</span>
                    <span>{{value.optionName}}</span>
                    <span>
                        <span class="fontRed" v-if="value.entrustBs == 1">买入</span>
                        <span class="fontBlue" v-if="value.entrustBs == 2">卖出</span>
                    </span>
                    <span>{{value.optBusinessPrice}}</span>
                    <span>{{value.businessAmount}}</span>
                    <span>
                        <span v-if="value.businessAmount == value.entrustAmount">全部成交</span>
                        <span v-else>部分成交</span>
                    </span>
                </li>
            </ul>
        </div>
        <div align="right" class="page" v-if="DealList.length">
            <el-pagination
                layout="prev, pager, next"
                :page-count="pageCount" :current-page:sync="formData.current" @current-change="changePage">
            </el-pagination>
        </div>
        <div class="no_data">
            <img src="~/static/images/img_nodata.png" alt="" v-if="!DealList" >
        </div>
    </div>
</template>

<script>
    import {getHistoryMakedealList} from "../../api/trade";
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
                DealList: [],
                pageCount: 1
            }
        },
        filters: {
            formatDate (time) {
                var date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            }
        },
        methods: {
            onLoad () {
                let _this = this
                getHistoryMakedealList(this.formData).then(function (res) {
                    if (res.code == 1) {
                       /* let records =  res.data.records.reverse()*/
                        _this.pageCount = res.data.pages
                        _this.DealList = res.data.records
                    }
                })
            },
            changePage (page) {
                this.formData.current = page
                this.onLoad()
            }
        },
        mounted () {
            this.pageCount = 1
            this.onLoad()
        }
    }
</script>

<style scoped lang="less">
    @import url(~assets/less/trade.less);
    @import url(~assets/less/tabel.less);
</style>

