<template>
        <div class="trade_child_page">
        <div class="stock_search">
            <div>
                <span>到期月份</span>
                <el-select v-model="month" placeholder="请选择" size="mini" style="width: 150px"
                           @change="selectMonth">
                    <el-option
                        @click.native="getAllProduct(key)"
                        v-for="(value, key) in monthData"
                        :key="key"
                        :label="value"
                        :value="value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <span>合约名称</span>
                <el-select v-model="optionName" placeholder="请选择" size="mini"
                           style="width: 280px">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.option_name + '  ' + '(' + item.option_code + ')'"
                        :value="item.option_code">
                    </el-option>
                </el-select>
            </div>
            <div>
                <button @click="addStock()" :disabled="isAdded">添加自选</button>
            </div>
        </div>

        <div class="stockPool_list">
            <ul class="stockPool_list-title">
                <li>合约代码</li>
                <li>合约名称</li>
               <!-- <li>现价</li>
                <li>涨跌</li>
                <li>涨跌幅</li>-->
                <li>到期日</li>
                <li>剩余天数</li>
                <li>操作</li>
            </ul>

            <ul class="stockPool_list-content">
                <li v-for="(value, key) in stockData" :key="key">
                    <span>{{value.option_code}}</span>
                    <span>{{value.option_name}}</span>
                 <!--   <span>0.3368</span>
                    <span>-12.00</span>
                    <span>-12%</span>-->
                    <span>{{value.exercise_date}}</span>
                    <span>{{value.RemainingDays}}</span>
                    <span class="operation_button">
                        <button @click="goForBuy(value)">买入</button>
                        <button @click="deleteStock(value.option_code)">删自选</button>
                    </span>
                </li>
            </ul>
        </div>

    </div>
</template>
<script>
    import { mapMutations } from 'vuex';
    import {getItem, successMsg, errorMsg} from "../../plugins/tool";
    import {getStockPool, delStockFromPool, getAllProduct, addStockToPool} from "../../api/personal";

    export default {
        name: "stockPool",
        data() {
            return {
                month: "",
                monthData: [],
                optionName: '',
                options: [],
                stockData: [],
                userInfo: {},
                isAdded: false
            }
        },
        methods: {
            ...mapMutations({
                setRouterName: 'setRouterName',
                setCode: 'setCode'
            }),
            getStockPool (month) {
                let _this = this
                this.stockData = []
                // 获取月份
                this.monthData = getItem('product').mouth
                this.monthData.push("全部")
                getStockPool(this.userInfo.cust_id).then(function (res) {
                    if (res.status == 1) {
                        if (month) {
                            console.log(month)
                            res.data.forEach(function (obj) {
                                if (parseInt(obj.exercise_date.split('-')[1]) == month) {
                                    _this.stockData.push(obj)
                                }
                            })
                        } else {
                            _this.stockData = res.data
                        }
                    }
                })
            },
            // 获取被选择月份的名称
            selectMonth() {
                if (this.month == "全部") {
                    this.mon = 0
                }
                this.mon = parseInt(this.month)
                this.getStockPool(this.mon)
                // 获取该月份的所有产品
            },
            // 获取右边产品信息
            getAllProduct (month) {
                this.options = []
                let _this = this
                let allProduct = getItem("allProduct")
                if (!this.month || this.month == "全部") {
                    this.options = allProduct
                } else {
                    month = month + 1
                    allProduct.forEach(function (obj) {
                        if (obj.opt_month_type == month && obj.server_enabled_status != 2) {
                            _this.options.push(obj)
                        }
                    })
                }
            },
            goForBuy (value) {
                this.$router.push({path: '/trade/buy', query: {code: value.option_code}})
                this.setCode({
                    code: value.option_code,
                    name: value.option_name
                })
            },
            deleteStock (code) {
                let _this = this
                delStockFromPool({optionCode: code}).then((res) => {
                    if (res.status == 1) {
                        successMsg("删除成功")
                        _this.getStockPool(this.mon)
                    }
                })
            },
            addStock() {
                if (this.optionName == "") {
                    errorMsg("请选择合约代码")
                    return false
                }
                this.isAdded = true
                addStockToPool({optionCode: this.optionName}).then((res) => {
                    if (res.status == 1 ) {
                        successMsg("添加成功")
                        this.getStockPool(this.mon)
                    } else {
                        if (res.msg == "添加错误") {
                            errorMsg("该产品已经在自选列表中")
                        } else {
                            errorMsg(res.msg)
                        }
                    }
                }).then((res) => {
                    this.isAdded = false
                })
            }
        },
        mounted() {
            this.setRouterName("trade-stockPool")
            this.userInfo = getItem('userInfo')
            this.path = this.$route.name
            this.getStockPool()
            this.getAllProduct()
        }
    }
</script>

<style scoped lang="less">
    @import url(~assets/less/trade.less);
</style>
