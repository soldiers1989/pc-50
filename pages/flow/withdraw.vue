<template>
    <div slot="select3">
        <div class="main">
            <table>
                <thead>
                    <tr>
                        <th>时间</th>
                        <th>类型</th>
                        <th>提现金额</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(value, key) in cashData" :key="key">
                        <td>{{value.created_time}}</td>
                        <td>{{value.entrustStatus_text}}</td>
                        <td>{{value.cash_amount}}</td>
                    </tr>
                    <tr v-if="!cashData.length" class="nothing"><td>暂无记录</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import {getFundsDetails, getAccountCount} from '~/api/personal'

export default {
    data() {	
        return {
            formData: {
                type: '提现明细',
                page: 1
            },
            cashData: [],
            account: {}

        }
    },
    methods: {
        getData() {
            let _this = this
            getFundsDetails(this.formData).then(function (res) {
                if (res.status == 1) {
                    _this.cashData = res.data
                    for (let value of _this.cashData) {
                        switch (value.cash_status) {
                            case 0:
                                value.entrustStatus_text = '待审核'
                                break
                            case 1:
                                value.entrustStatus_text = '待打款'
                                break
                            case 2:
                                value.entrustStatus_text = '审核失败'
                                break
                            case 3:
                                value.entrustStatus_text = '已打款'
                                break
                            case 4:
                                value.entrustStatus_text = '撤销成功'
                                break
                        }
                    }
                }
            })
        }
    },
    mounted() {
        this.getData()
    }
}
</script>

<style scoped lang="less">
@import url(~assets/less/tabel.less);
</style>