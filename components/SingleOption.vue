<template>
    <div class="info_product">
        <div class="info_product-content">
            <p class="info_product-title">{{wsOptionInfo.OP}}({{wsOptionInfo.OC}})</p>
            <div class="option_info">
                <div>
                    <p :class="{fontRed: changePrice >= 0, fontGreen: changePrice < 0}">
                        {{wsOptionInfo.LP}}
                    </p>
                    <p :class="{fontRed: changePrice >= 0, fontGreen: changePrice < 0}">
                        {{changePrice}}({{rate}})
                    </p>
                </div>
                <ul>
                    <li>
                        <span>最高</span>
                        <span>{{highPrice}}</span>
                    </li>
                    <li>
                        <span>昨收</span>
                        <span>{{preSquarePrice}}</span>
                    </li>
                    <li>
                        <span>最低</span>
                        <span>{{lowPrice}}</span>
                    </li>
                    <li>
                        <span>总量</span>
                        <span>{{wsOptionInfo.BA}}</span>
                    </li>
                </ul>
            </div>
            <div class="option_kLine">
                <ul class="option_kLine-title">
                    <li :class="{selectTypeButton: active == 0}" @click="changeTab(0)">
                        <span>分时线</span>
                        <span class="triangle" v-if="active == 0"></span>
                    </li>
                    <li :class="{selectTypeButton: active ==1}" @click="changeTab(1)">
                        <span>日K</span>
                        <span class="triangle" v-if="active == 1"></span>
                    </li>
                    <li :class="{selectTypeButton: active ==2}" @click="changeTab(2)">
                        <span>周K</span>
                        <span class="triangle" v-if="active == 2"></span>
                    </li>
                    <li :class="{selectTypeButton: active ==3}" @click="changeTab(3)">
                        <span>月K</span>
                        <span class="triangle" v-if="active == 3"></span>
                    </li>
                </ul>
                <div class="option_kLine-img">
                    <img :src="src" alt="行情图" id="pic">
                </div>
                <p class="option_kLine-option">注意：本页面行情存在延时，交易请以交易所实时价格为准(净值估算平均偏差：0.04%)</p>
            </div>
        </div>

        <div class="info_product-info">
            <div class="info_product-price">
                <ul>
                    <li v-for="item in sale" @click="changeEntrustPrice({
                    flag: false,
                    value: wsOptionInfo['SP'+item]})">
                        <span>卖{{item}}</span>
                        <span :class="{fontRed: wsOptionInfo.LP <= wsOptionInfo['SP'+item], fontGreen:wsOptionInfo.LP > wsOptionInfo['SP'+item]}">{{wsOptionInfo['SP'+item]  | fillZero}}</span>
                        <span>{{wsOptionInfo['SA'+item]}}</span>
                    </li>
                    <li v-for="i in 5" @click="changeEntrustPrice({
                    flag: false,
                    value: wsOptionInfo['BP'+i]
                    })">
                        <span>买{{i}}</span>
                        <span :class="{fontRed: wsOptionInfo.LP <= wsOptionInfo['BP'+i], fontGreen:wsOptionInfo.LP > wsOptionInfo['BP'+i]}">{{wsOptionInfo['BP'+i]  | fillZero}}</span>
                        <span>{{wsOptionInfo['BA'+i]}}</span>
                    </li>
                </ul>
            </div>
            <div class="info_product-others">
                <ul>
                    <li>
                        <span>买价</span>
                        <span>{{wsOptionInfo.BP1 | fillZero}}</span>
                    </li>
                    <li>
                        <span>卖价</span>
                        <span>{{wsOptionInfo.SP1 | fillZero}}</span>
                    </li>
                    <li>
                        <span>涨幅</span>
                        <span>{{rate}}</span>
                    </li>
                    <li>
                        <span>涨停价</span>
                        <span>{{optionData['opt_up_price'] | fillZero}}</span>
                    </li>
                    <li>
                        <span>跌停价</span>
                        <span>{{optionData['opt_down_price'] | fillZero}}</span>
                    </li>
                    <li>
                        <span>开盘</span>
                        <span>{{wsOptionInfo.OP | fillZero}}</span>
                    </li>
                    <li>
                        <span>证券价格</span>
                        <span>{{stockData[1]}}</span>
                    </li>
                    <li>
                        <span>持仓量</span>
                        <span>{{wsOptionInfo.UA}}</span>
                    </li>
                    <li>
                        <span>到期日</span>
                        <span>{{optionData.end_date}}</span>
                    </li>
                    <li>
                        <span>剩余天数</span>
                        <span>{{optionData.RemainingDays}}</span>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    import {getItem} from "../plugins/tool";
    import {getInfoOfETF, getOneProductInfo} from "../api/trade";
    import {mapMutations} from "vuex"
    import {bus} from "../plugins/bus";
    import {fillZero} from "../plugins/tool";

    export default {
        name: "singleOption",
        props: {
            wsOptionInfo: {
                type: Object,
                default: function () {
                    return {
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
                }
            }
        },
        filters: {
            fillZero (str) {
                return fillZero(4, str)
            }
        },
        data () {
            return {
                tab: '1',
                entrustPrice: '',
                price: '--',
                month: "",
                validMount: '--',
                optionType: "0",
                optionName: '--',
                optionCode: '',
                totalMount: '--',
                isAdded: false,
                range: '--',
                refreshPic: null,
                src: '',
                middleUrl: '?imagetype=rop&id=',
                mainUrl: '',
                Token: '',
                active: 0,
                pictureTitle: ['分时线', '日K', '周K', '月K'],
                stockData: [],
                sale: [5, 4, 3, 2, 1],
                optionData: [],
                firstTime: true
            }
        },
        methods: {
            ...mapMutations({
                changeEntrustPrice: 'changeEntrustPrice'
            }),
            refreshPicture () {
                let _this = this
                let code
                this.optionCode ? code = this.optionCode : code = this.wsOptionInfo.OC
                setTimeout(function () {
                    _this.src = _this.mainUrl + _this.middleUrl + code + '_SO&' + _this.Token
                }, 200)
            },
            getData () {
                getInfoOfETF().then(res => {
                    // 名称，当前价，涨跌值，涨跌幅，总手数，成交额
                    this.stockData = res
                })
            },
            getOneInfo () {
                let _this = this
                let code
                this.optionCode ? code = this.optionCode : code = this.wsOptionInfo.OC
                getOneProductInfo({optionCode: code}).then(function (res) {
                    _this.optionData = res.data
                })
            },
            getUrl () {
                let indexData = getItem('indexData')
                this.mainUrl = JSON.parse(indexData.imgUrl)[0]
                this.Token = JSON.parse(indexData.imgUrl)[1]
                this.refreshPicture()
            },
            changeTab (val) {
                this.active = val
                switch (this.active) {
                    case 0:
                        this.middleUrl = '?imagetype=rop&id='
                        break
                    case 1:
                        this.middleUrl = '?imagetype=kxl&type=D&EF=&Formula=&UnitWidth=-5&id='
                        break
                    case 2:
                        this.middleUrl = '?imagetype=kxl&type=W&EF=&Formula=&UnitWidth=-5&id='
                        break
                    case 3:
                        this.middleUrl = '?imagetype=kxl&type=M&EF=&Formula=&UnitWidth=-5&id='
                        break
                }
                this.refreshPicture()
            },
            initData () {
                this.optionName = "--"
                this.optionData = {
                    opt_up_price: '--',
                    end_date: "--",
                    RemainingDays:"--",
                    opt_down_price: '--'
                }
                this.active = 0
                this.stockData = ["--", "--", "--", "--", "--", "--"]
            },
        },
        computed: {
            changePrice () {
                if (this.wsOptionInfo.OC != "--" && this.optionCode) {
                    return (this.wsOptionInfo.LP - this.wsOptionInfo.OP).toFixed(4)
                } else {
                    return "--"
                }
            },
            rate () {
                if (this.wsOptionInfo.OC != "--" && this.optionCode) {
                    return (Number(this.changePrice / this.wsOptionInfo.OP) * 100).toFixed(2) + "%"
                } else {
                    return "--"
                }
            },
            highPrice () {
                if(this.wsOptionInfo.OC != "--" && this.optionCode) {
                    return fillZero(4, this.wsOptionInfo.HP)
                } else {
                    return "--"
                }
            },
            preSquarePrice () {
                if(this.wsOptionInfo.OC != "--" && this.optionCode) {
                    return fillZero(4, this.wsOptionInfo.PSP)
                } else {
                    return "--"
                }
            },
            lowPrice () {
                if(this.wsOptionInfo.OC != "--" && this.optionCode) {
                    return fillZero(4, this.wsOptionInfo.LOWP)
                } else {
                    return "--"
                }
            },
        },
        mounted () {
            let _this = this
            this.initData()
            this.changeTab(0)
            this.getUrl()
            this.optionCode = this.$route.query.code
            if (this.optionCode) {
                this.getOneInfo()
                this.getData()
                this.refreshPicture()
                this.refreshPic = setInterval(this.refreshPicture, 8000)
            }
            bus.$on("initPage", function () {
                console.error("initPage")
                _this.initData()
            })
        },
        beforeDestroy () {
            bus.$off("changeCode")
            bus.$off("initPage")
        },
        watch: {
            wsOptionInfo(newVal, oldVal) {
                this.wsOptionInfo = newVal
                this.optionCode = this.wsOptionInfo.OC
                if (this.wsOptionInfo.ON != "--" && this.firstTime) {
                    this.refreshPicture()
                    this.getOneInfo()
                    this.getData()
                    this.firstTime = false
                }
            },
            optionData(newVal, oldVal) {
                this.optionData = newVal
            }
        }
    }
</script>

<style scoped lang="less">
    @import url(~assets/less/trade.less);
</style>
