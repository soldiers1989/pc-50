<template>
    <div class="trade_child_page">
        <div class="buy_content">
            <div class="select_product">
                <ul>
                    <li>
                        <span>期权标的：</span>
                        <span>上证50ETF 510050</span>
                    </li>
                    <li>
                        <span>到期月份：</span>
                        <span>
                            <el-select v-model="month" placeholder="请选择" size="mini" @change="selectMonth">
                                <el-option
                                    v-for="(value, key) in monthData"
                                    :key="key"
                                    :label="value"
                                    :value="key">
                                </el-option>
                            </el-select>
                        </span>
                    </li>
                    <li>
                        <span>行权价格：</span>
                        <span>
                            <el-select v-model="exercisePrice" placeholder="请选择" size="mini" @change="selectPrice">
                                <el-option
                                    v-for="(value, key) in options"
                                    :key="key"
                                    :label="value"
                                    :value="value">
                                </el-option>
                            </el-select>
                        </span>
                    </li>
                    <li>
                        <span>期权类型：</span>
                        <span>
                            <el-radio-group v-model="optionType" @change="selectType">
                               <el-radio label="C">认购</el-radio>
                                <el-radio label="P">认沽</el-radio>
                            </el-radio-group>
                        </span>
                    </li>
                    <li>
                        <span>合约名称：</span>
                        <span>{{wsOptionInfo.ON}}（{{optionCode}}）</span>
                    </li>
                    <li>
                        <span>委托方式：</span>
                        <span class="button_group-sell">
                            <button :class="{selectTypeButtonSell: entrustType == '0' }" @click="changeOptionType(0)">限价委托</button>
                            <button :class="{selectTypeButtonSell: entrustType == 'OPB' }"
                                    @click="changeOptionType('OPB')">市价委托</button>
                        </span>
                    </li>
                    <li>
                        <span>委托价格：</span>
                        <span>
                            <input type="number" step="0.0001" min="0" max="100" :disabled="entrustType == 'OPB'"
                                   v-model="price">
                        </span>
                    </li>

                    <li>
                        <span>可卖张数：</span>
                        <span>
                            {{sellMaxMount}}
                        </span>
                    </li>

                    <li>
                        <span>委托数量：</span>
                        <span class="entrust_amount">
                            <input type="number" step="1" min="0" max="30" v-model="entrustAmount">
                            <span>张</span>
                        </span>
                    </li>

                   <!-- <li>
                        <span>预估金额：</span>
                        <span>{{totalMount}}</span>
                    </li>
-->
                </ul>
                <p class="trade_rules" @click="showRules"><i class="el-icon-question"></i>交易规则</p>
                <div class="bottom_button-sell">
                    <button @click="validSell">卖出</button>
                </div>
            </div>
            <Single :wsOptionInfo="wsOptionInfo" v-if="isRouterAlive"/>
        </div>
        <div class="holding_content">
            <Holding @sendHoldings="sendHoldings" v-if="isRouterAlive"/>
        </div>

        <el-dialog
            title=""
            :visible.sync="confirmTrade"
            width="400px"
            :before-close="handleClose">
            <div class="dialog_trade">
                <p>交易确认</p>
                <ul>
                    <li>
                        <span>交易方向：</span>
                        <span>卖出平仓</span>
                    </li>
                    <li>
                        <span>合约代码：</span>
                        <span>{{tradeData.OC}}</span>
                    </li>
                    <li>
                        <span>合约名称：</span>
                        <span>{{wsOptionInfo.OC}}</span>
                    </li>
                    <li>
                        <span>剩余天数：</span>
                        <span>{{optionData.RemainingDays}}</span>
                    </li>
                    <li>
                        <span>委托价格：</span>
                        <span v-if="tradeData.entrustProp == 0">{{tradeData.optEntrustPrice}}</span>
                        <span v-if="tradeData.entrustProp == 'OPB'">市价</span>
                    </li>
                    <li>
                        <span>委托数量：</span>
                        <span>{{tradeData.entrustAmount}}（1张=10000份）</span>
                    </li>
                    <li>
                        <span>总手续费：</span>
                        <span>{{totalFreeBuy * tradeData.entrustAmount}}</span>
                    </li>
                    <li>
                        <span>注：持仓递延费休市后按实际持仓张数收取，{{sell_free}}元/张，仅交易日收取</span>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="confirmTrade = false">取 消</el-button>
                <el-button type="primary" @click="sellApi()" :disabled="isSubmitSell">确 定 </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Holding from "~/components/holdingContent.vue"
    import Single from "~/components/SingleOption"
    import {mapMutations, mapState} from 'vuex'
    import {getUserInfo} from "../../api/ajax";
    import SockJS from 'sockjs-client'
    import Stomp from 'stompjs'
    import {WebScoketUrl} from "../../api/api";
    import {
        getOneProductInfo,
        entrustSell,
        getMaxAvailableBuySellQuantity,
        getCustHoldingsInfoList
    } from "../../api/trade";
    import {getItem, errorMsg, checkRealName, successMsg} from "../../plugins/tool";
    import {delStockFromPool, addStockToPool, isInPool} from "../../api/personal";
    import {bus} from "../../plugins/bus";

    export default {
        name: "buy",
        components: {
            Holding, Single
        },
        data() {
            return {
                wsOptionInfo: {},
                entrustType: "0",
                month: "--",
                monthCode: '',
                monthData: [],
                options: [],
                optionType: "0",
                optionName: '--',
                optionCode: '--',
                isInPool: false,
                range: '--',
                rate: '--',
                type: '',
                pricePlaceHolder: '',
                balance: '--',
                entrustAmount: 1,
                dialogInfo: {},
                sell_free: 0,
                totalFreeBuy: 0,
                tradeData: {},
                confirmTrade: false,
                optionData: {},
                exercisePrice: '--',
                isRouterAlive: true,
                sellMaxMount: '',
                optionSellData: {},
                firstAmount: true,
                holdingData: [],
                isSubmitSell: false
            }
        },
        provide() {
            return {
                reload: this.reload
            }
        },
        methods: {
            ...mapMutations({
                setCode: 'setCode',
                setRouterName: 'setRouterName',
                changeEntrustPrice: 'changeEntrustPrice'
            }),
            selectMonth(val) {
                this.monthCode = val
                this.options = getItem("product")[val + 1]
                this.searchCode()
            },
            selectPrice(val) {
                this.searchCode()
            },
            selectType(val) {
                this.searchCode()
            },
            searchCode() {
                let _this = this
                this.firstAmount = true
                _this.unsubscribe()
                this.optionSellData = {
                    stockFinanceHoldId: '',
                    stockHoldingId: '--',
                    holdAmount: '--',
                    parentStockFinanceId: ''
                }
                let allProduct = getItem('allProduct')
                if ((_this.monthCode + 1) && _this.optionType && _this.exercisePrice) {
                    allProduct.forEach(function (obj) {
                        if (obj.opt_month_type == (_this.monthCode + 1) && obj.option_type == _this.optionType && Number(obj.exercise_price) == Number(_this.exercisePrice)) {
                            _this.optionCode = obj.option_code
                            let matchedData = []
                            _this.holdingData.forEach((item) => {
                                if (item.optionCode == _this.optionCode) {
                                    matchedData.push(item)
                                    _this.optionSellData = {
                                        stockFinanceHoldId: matchedData[0].id,
                                        parentStockFinanceId: matchedData[0].parentStockFinanceId,
                                        optionCode: matchedData[0].optionCode,
                                        holdAmount: matchedData[0].holdAmount
                                    }
                                }
                            })
                            _this.getSomeOneInfo(_this.optionCode)
                            _this.getOneInfo()
                            _this.$router.push({name: 'trade-sell', query: {code: _this.optionCode, obj: _this.optionSellData}})
                        }
                    })
                }
            },
            changeOptionType(type) {
                this.entrustType = type
                if (type == 'OPB') {
                    this.pricePlaceHolder = "市价"
                } else {
                    this.changeEntrustPrice({
                        flag: true,
                        value: this.wsOptionInfo.BP1
                    })
                }
            },
            // 根据代码获取信息
            getSomeOneInfo(obj) {
                let _this = this
                let now1 = new Date()
                let time1 = now1.getHours() + ':' + now1.getMinutes()
                _this.socket = new SockJS(WebScoketUrl)
                _this.stompClient = Stomp.over(_this.socket)
                _this.stompClient.connect({'username': _this.userid}, function (frame) {
                    _this.stompClient.subscribe('/app/init/api/1.0/getOptionMarket/' + obj, function (message) {
                        _this.updateInfo(JSON.parse(message.body).data)
                    })
                    _this.stompClient.subscribe('/topic/optionInfo/optHqreal/' + obj, function (message) {
                        _this.updateInfo(JSON.parse(message.body))
                    })
                })
            },
            updateInfo(data) {
                let _this = this
                _this.wsOptionInfo = data
                _this.type = _this.wsOptionInfo.MT
                _this.optionName = _this.wsOptionInfo.ON
                _this.exercisePrice = _this.wsOptionInfo.EP
                _this.optionType = _this.wsOptionInfo.OT
                _this.setCode({code: _this.optionCode, name: _this.optionName})
                // 第一次
                if (_this.firstPrice) {
                    _this.changeEntrustPrice({
                        flag: true,
                        value: _this.wsOptionInfo.BP1
                    })
                }
                _this.mountData = {
                    entrustBs: 2,
                    entrustProp: 0,
                    optEntrustPrice: _this.price,
                    optionCode: _this.optionCode,
                    stockFinanceHoldId: _this.optionSellData.parentStockFinanceId,
                    stockHoldingId: _this.optionSellData.stockFinanceHoldId
                }
                _this.getMaxSellMount()
                _this.getMonth()
                _this.entrustType == "OPB" ? _this.mountData.entrustProp = 'OPB' : _this.tradeData.mountData = _this.entrustType
            },
            getMaxSellMount() {
                let _this = this
                getMaxAvailableBuySellQuantity(this.mountData).then(res => {
                    if (res.code == 1) {
                        if (_this.firstAmount) {
                            _this.sellMaxMount = res.data.availableQuantity
                            _this.entrustAmount = _this.sellMaxMount
                            _this.firstAmount = false
                        }
                    }
                })
            },
            sendHoldings(obj) {
                this.unsubscribe()
                this.firstAmount = true
                console.error(obj)
                this.optionSellData = obj
                this.optionCode = obj.optionCode
                this.getSomeOneInfo(this.optionCode)
                this.getOneInfo()
                this.reload()
            },
            unsubscribe () {
                if (this.stompClient != null) {
                    this.stompClient.unsubscribe('sub-1')
                    this.stompClient.unsubscribe('sub-0')
                }
            },
            // 获取月份
            getMonth() {
                this.monthData = getItem('product').mouth
                if (this.optionCode) {
                    this.month = this.monthData[this.type - 1]
                    this.monthCode = this.type - 1
                }
                this.options = getItem("product")[this.type]
            },
            getUserInfo() {
                let _this = this
                getUserInfo().then((res) => {
                    let userInfo = getItem('userInfo')
                    _this.balance = userInfo.cust_capital_amount
                })
            },
            getBuyFee() {
                let indexData = getItem('indexData')
                this.sell_free = indexData.night_fee_rate
                this.totalFreeBuy = indexData.productFee.sell_brokerage_amount +
                    indexData.productFee.sell_commission_amount +
                    indexData.productFee.sell_fare_amount +
                    indexData.productFee.sell_fee_amount +
                    indexData.productFee.sell_stampduty_amount +
                    indexData.productFee.sell_transfer_amount +
                    indexData.productFee.sell_witness_amount
            },
            validSell() {
                let _this = this
                this.tradeData = {
                    optionCode: this.optionCode,
                    entrustProp: this.entrustType,
                    entrustAmount: this.entrustAmount,
                    optEntrustPrice: this.price,
                    cautionMoney: 0,
                    stockFinanceHoldId: this.optionSellData.stockFinanceHoldId,
                    parentStockFinanceId: this.optionSellData.parentStockFinanceId,
                    entrustBs: 2,
                    entrustIp: '127.0.0.1',
                    type: 0,
                    productId: 1,
                    entrustSource: "电脑网页"
                }
                if (this.tradeData.entrustAmount > 30) {
                    errorMsg("买入数量超出最大可委托的数量")
                } else if (!checkRealName()) {
                    this.$confirm('您还未实名认证，请先实名认证再绑卡', '未实名', {
                        distinguishCancelAndClose: true,
                        confirmButtonText: '去认证',
                        cancelButtonText: '取消'
                    }).then(() => {
                        _this.$router.push('/mine/realName')
                    })
                } else if (this.tradeData.optionCode == "") {
                    errorMsg("请输入正确的期权代码")
                } else if (this.tradeData.optEntrustPrice == "" || this.tradeData.optEntrustPrice == 0) {
                    errorMsg("请选择正确的金额")
                } else if (this.tradeData.entrustAmount == "" || this.tradeData.entrustAmount == 0) {
                    errorMsg("请选择正确的数量")
                } else if (String(this.tradeData.entrustAmount).indexOf('.') > -1) {
                    let m = Math.floor(this.tradeData.entrustAmount)
                    errorMsg("委托数量不能为小数")
                    this.entrustAmount = m
                } else if (this.tradeData.entrustAmount > this.sellMaxMount) {
                    errorMsg("委托数量超过最大可卖")
                    this.entrustAmount = this.sellMaxMount
                } else {
                    // 弹窗显示
                    this.confirmTrade = true
                }
            },
            handleClose(done) {
                done()
            },
            sellApi() {
                let _this = this
                this.isSubmitSell = true
                entrustSell(this.tradeData).then(res => {
                    if (res.code == 1) {
                        successMsg("交易成功")
                        _this.initData()
                        _this.sellMaxMount = 0
                        _this.reload()
                        bus.$emit("updateHoldings")
                    } else {
                        errorMsg(res.msg)
                    }
                }).then((res) => {
                    _this.unsubscribe()
                    _this.initData()
                    bus.$emit("initPage")
                    _this.isSubmitSell = false
                    _this.confirmTrade = false
                }).catch((error) => {
                    errorMsg(error)
                    _this.confirmTrade = false
                    _this.isSubmitSell = false
                })
            },
            // 为了剩余天数 调用的这个方法
            getOneInfo() {
                let _this = this
                getOneProductInfo({optionCode: _this.optionCode}).then(function (res) {
                    _this.optionData = res.data
                })
            },
            getHolding () {
                let _this = this
                getCustHoldingsInfoList().then(res => {
                    if (res.code == 1) {
                        _this.holdingData = res.data
                        console.log(_this.holdingData)
                    } else {
                        console.log(res.msg)
                    }
                })
            },
            showRules () {
                bus.$emit("showRules")
            },
            initData() {
                this.wsOptionInfo = {
                    BA1: '--',
                    BA2: '--',
                    BA3: '--',
                    BA4: '--',
                    BA5: '--',
                    BP1: '--',
                    BP2: '--',
                    BP3: '--',
                    BP4: '--',
                    BP5: '--',
                    SA1: '--',
                    SA2: '--',
                    SA3: '--',
                    SA4: '--',
                    SA5: '--',
                    SP1: '--',
                    SP2: '--',
                    SP3: '--',
                    SP4: '--',
                    SP5: '--',
                    LP: '--',
                    CP: '--',
                    EP: '--',
                    ON: "--",
                    UA: '--',
                    OP: '--'
                }
                this.rate = '--'
                this.optionName = "--"
                this.optionCode = "--"
                this.balance = '--'
                this.entrustAmount = 1
                this.optionData = {
                    opt_up_price: '--',
                    end_date: "--",
                    RemainingDays: "--",
                    opt_down_price: '--'
                }
                this.optionSellData = {
                    stockFinanceHoldId: '',
                    stockHoldingId: '--',
                    holdAmount: '--',
                    parentStockFinanceId: ''
                }
                this.sellMaxMount = 0
                this.month = '--'
                this.exercisePrice = '--'
            },
            reload() {
                this.isRouterAlive = false
                //在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM
                this.$nextTick(() => {
                    this.isRouterAlive = true
                })
            }
        },
        computed: {
            ...mapState({
                code: 'code',
                name: 'name',
                entrustPrice: 'entrustPrice',
                firstPrice: 'firstPrice'
            }),
            totalMount() {
                if (this.price) {
                    return (this.price * this.entrustAmount * 10000 + this.totalFreeBuy).toFixed(2)
                } else {
                    return 0
                }
            },
            price: {
                get: function () {
                    return this.$store.state.entrustPrice
                },
                set: function (value) {
                    this.changeEntrustPrice({
                        value: value,
                        flag: false
                    })
                }
            }
        },
        mounted() {
            this.initData()
            this.getUserInfo()
            this.getBuyFee()
            this.getHolding()
            this.setRouterName("trade-buy")
            this.getMonth()
            //  刷新之后报错
            if (JSON.stringify(this.$route.query) != '{}') {
                let query = this.$route.query
                this.optionCode = query.code
                this.optionSellData = JSON.parse(query.obj)
                if (this.optionCode) {
                    this.getSomeOneInfo(this.optionCode)
                    this.getOneInfo()
                }
            }
        },
        beforeDestroy() {
            if (this.stompClient != null) {
                this.unsubscribe()
            }
        }
    }
</script>

<style lang="less">
    @import url(~assets/less/trade.less);

    .el-select-dropdown__item {
        height: 24px;
        line-height: 24px;
    }
</style>
