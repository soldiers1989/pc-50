<template>
    <div class="trade_page wrap">
        <div class="trade_nav">
            <ul>
                <li @click="changeTab('stockPool')">
                    <nuxt-link :to="{name: 'trade-stockPool'}" :class="{isSelectRoute: route == 'stockPool'}">自选</nuxt-link></li>
                <li @click="changeTab('buy')">
                    <nuxt-link :to="{name: 'trade-buy'}" :class="{isSelectRoute: route == 'buy'}">买入</nuxt-link></li>
                <li @click="changeTab('sell')">
                    <nuxt-link :to="{name: 'trade-sell'}" :class="{isSelectRoute: route == 'sell'}"
                    >卖出</nuxt-link></li>
                <li @click="changeTab('holding')">
                    <nuxt-link :to="{name: 'trade-holding'}" :class="{isSelectRoute: route == 'holding'}"
                        >持仓</nuxt-link></li>
                <li @click="changeTab('cancel')">
                    <nuxt-link :to="{name: 'trade-cancel'}" :class="{isSelectRoute: route == 'cancel'}"
                    >撤单</nuxt-link></li>
                <li @click="changeTab('dailyEntrust')">
                    <nuxt-link :to="{name: 'trade-dailyEntrust'}" :class="{isSelectRoute: route == 'dailyEntrust'}"
                    >当日委托</nuxt-link></li>
                <li @click="changeTab('historyEntrust')">
                    <nuxt-link :to="{name: 'trade-historyEntrust'}" :class="{isSelectRoute: route == 'historyEntrust'}"
                    >历史委托</nuxt-link>
                </li>
                <li @click="routerTo('/trade/dailyDealing'), changeTab('dailyDealing')">
                    <nuxt-link :to="{name: 'trade-dailyDealing'}" :class="{isSelectRoute: route == 'dailyDealing'}"
                    >当日成交</nuxt-link>
                </li>
                <li @click="routerTo('/trade/historyDealing'), changeTab('historyDealing')">
                    <nuxt-link :to="{name: 'trade-historyDealing'}" :class="{isSelectRoute: route == 'historyDealing'}"
                    >历史成交</nuxt-link>
                </li>
                <li @click="routerTo('/trade/record'), changeTab('record')">
                    <nuxt-link :to="{name: 'trade-record'}" :class="{isSelectRoute: route == 'record'}"
                    >交易流水</nuxt-link>
                </li>
            </ul>
        </div>

        <el-dialog
            title="交易规则"
            :visible.sync="dialogVisible"
            width="500px"
            :before-close="handleClose">
            <div class="rule">
                <div class="line1">
                    <h3>合约标的</h3>
                    <p>上证50交易型开放式指数证券投资基金（“50ETF”）</p>
                </div>
                <div class="line1 line2">
                    <h3>交易时间</h3>
                    <p>9:30-11:30、13:00-15:00</p>
                    <p>本系统仅支持期权买方的开平仓功能</p>
                </div>
                <div class="line1 line2">
                    <h3>合约类型</h3>
                    <p>认购期权和认沽期权</p>
                </div>
                <div class="line1 line2">
                    <h3>到期日</h3>
                    <p>到期月份的第四个星期三和除权日(遇法定节假日顺延)</p>
                    <p>因行权和除权手续繁琐,故本系统不支持行权和除权申报,为保障您的利益,将于合约到期日前一天的14:30进行平仓处理,交易结果以实际为准.</p>
                </div>
                <div class="line1 line2">
                    <h3>集合竞价</h3>
                    <p>9:15-9:25为开盘集合竞价时间</p>
                    <p>14:57-15:00为收盘集合竞价时间</p>
                </div>
                <div class="line1 line2">
                    <h3>熔断交易规则</h3>
                    <p>连续竞价期间，期权合约盘中交易价格较最近参考价格涨跌幅度达到或者超过50%且价格涨跌绝对值达到或者超过5个最小报价单位时，期权合约进入3分钟的集合竞价交易阶段</p>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <nuxt-child v-if="isRouterAlive"/>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    import {getProduct} from "../api/trade";
    import {setItem} from "../plugins/tool";
    import {getAllProduct} from "../api/personal";
    import {bus} from "../plugins/bus";

    export default {
        name: "trade",
        data () {
            return {
                tab: "buy",
                isRouterAlive: true,
                route: '',
                dialogVisible: false
            }
        },
        methods: {
            ...mapMutations(['routerTo']),
            changeTab (tab) {
                this.tab = tab
            },
            handleClose(done) {
                done()
            },
            // 获取月份
            getProduct () {
                getProduct().then((res) => {
                    if (res.status == 1) {
                        setItem("product", res.data)
                    }
                })
                getAllProduct().then((res) => {
                    if (res.status == 1) {
                        setItem("allProduct", res.data)
                    }
                })
            },
            reload(){
                this.isRouterAlive = false
                //在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM
                this.$nextTick(()=>{
                    this.isRouterAlive = true
                })
            }
        },
        provide(){
            return {
                reload:this.reload
            }
        },
        mounted () {
            let _this = this
            this.tab = this.$route.path.split('/')[2]
            if (!this.tab) {
                this.tab = 'buy'
            }
            this.getProduct()
            this.route = this.$route.name.split("-")[1]
            bus.$on('tradeSelect', function (obj) {
                _this.route = obj.split("-")[1]
            })
            bus.$on("showRules", function () {
                _this.dialogVisible = true
            })
        },
        beforeDestroy () {
            bus.$emit('diselected')
            bus.$off('tradeSelect')
            bus.$off('showRules')
        }
    }
</script>

<style scoped lang="less">
@import url(~assets/less/trade.less);

</style>
