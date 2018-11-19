<template>
    <div class="trade_child_page">
        <div class="holdingContent_page">
            <ul class="record_content-title">
                <li>时间</li>
                <li>类型</li>
                <li>发生金额</li>
                <li>余额</li>
                <li>备注</li>
            </ul>

            <ul class="record_content-content">
                <li v-for="(value, key) in transactionData" :key="key">
                    <span>{{value.created_time}}</span>
                    <span>{{value.flow_type}}</span>
                    <span :class="{red: value.amount_of_account >= 0, green: value.amount_of_account < 0}">{{value.amount_of_account}}</span>
                    <span>{{value.account_left}}</span>
                    <span>{{value.remark}}</span>
                </li>
            </ul>
        </div>
        <div align="right" class="page" v-if="transactionData.length">
            <el-pagination
                layout="prev, pager, next"
                :page-count="pageCount" :current-page:sync="formData.page" @current-change="changePage">
            </el-pagination>
        </div>
        <div class="no_data">
            <img src="~/static/images/img_nodata.png" alt="" v-if="!transactionData">
        </div>
    </div>
</template>

<script>
    import {getFundsDetails} from "../../api/personal";

    export default {
        name: 'record',
        data() {
            return {
                formData: {
                    type: '借款明细',
                    page: 1
                },
                transactionData: [],
                noData: false,
                pageCount: 1
            }
        },
        methods: {
            onLoad() {
                let _this = this
                getFundsDetails(this.formData).then(function (res) {
                    if (res.status == 1) {
                        _this.pageCount = Math.ceil(res.data.total / res.data.per_page)
                        _this.transactionData = res.data.data
                    }
                })
            },
            changePage (page) {
                this.formData.page = page
                console.log(this.formData.page)
                this.onLoad()
            }
        },
        mounted () {
            this.onLoad()
        }
    }
</script>

<style scoped lang="less">
    @import url(~assets/less/trade.less);
    @import url(~assets/less/tabel.less);

</style>

