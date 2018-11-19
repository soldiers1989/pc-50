<template>
    <div slot="select6">
        <div class="main">
            <table>
                <thead>
                    <tr>
                        <th>时间</th>
                        <th>类型</th>
                        <th>发生金额</th>
                        <th>余额</th>
                        <!-- <th>备注</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(value, key) in profitData" :key="key">
                        <td>{{value.created_time}}</td>
                        <td>{{value.flow_type}}</td>
                        <td>{{value.amount_of_account}}</td>
                        <td>{{value.account_left}}</td>
                        <!-- <td>{{value.remark}}</td> -->
                    </tr>
                    <tr v-if="!profitData.length" class="nothing"><td>暂无记录</td></tr>
                </tbody>
            </table>
            <div align="right" class="page" v-if="profitData.length">
                <el-pagination
                    layout="prev, pager, next"
                    :page-count="pageCount" :current-page:sync="formData.page" @current-change="changePage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import {getFundsDetails} from '~/api/personal';

export default {
    data() {
        return {
            formData: {
                type: '推广收益',
                page: 1
            },
            pageCount: 1,
            profitData: []
        }
    },
    layout: 'default',
    methods: {
        onLoad() {
            let _this = this
            getFundsDetails(this.formData).then(function (res) {
                if (res.status == 1) {
                    _this.pageCount = Math.ceil(res.data.total / res.data.per_page)
                    _this.profitData = res.data.data
                }
            })
        },
        changePage(page) {
            this.formData.page = page
            this.onLoad()
        }
    },
    mounted() {
        this.onLoad()
    },
}
</script>

<style scoped lang="less">
@import url(~assets/less/tabel.less);
</style>
