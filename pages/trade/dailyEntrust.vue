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
        <div class="no_data">
            <img src="~/static/images/img_nodata.png" alt="" v-if="!EntrustList || !EntrustList.length" >
        </div>
    </div>
</template>

<script>
    import {getItem} from "../../plugins/tool";
    import {WebScoketUrlAuth} from "../../api/api";
    import SockJS from 'sockjs-client'
    import Stomp from 'stompjs'
    import Vue from 'vue'
    import {formatDate} from "../../plugins/tool";

    export default {
        name: "buy",
        data () {
            return {
                EntrustList: [],
                token: "",
                socket: {},
                stompClient: {},
                WebScoketUrl: WebScoketUrlAuth
            }
        },
        filters: {
            formatDate (time) {
                var date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            }
        },
        methods: {
            getDataFromWs () {
                let _this = this
                _this.token = (getItem('token_json_key')).access_token
                _this.socket = new SockJS(WebScoketUrlAuth)
                _this.stompClient = Stomp.over(_this.socket)
                _this.stompClient.connect({'token': _this.token}, function (frame) {
                    _this.stompClient.subscribe('/app/init/api/1.0/getTodayEntrustList', function (message) {
                        let WSData = JSON.parse(message.body)
                        console.log(WSData)
                        if (WSData.code == 1) {
                            _this.EntrustList = WSData.data
                            for (let value of _this.EntrustList) {
                                switch (value.entrustStatus) {
                                    case 0:
                                        value.entrustStatus_text = '撤单委托中'
                                        break
                                    case 1:
                                        value.entrustStatus_text = '委托中'
                                        break
                                    case 2:
                                        value.entrustStatus_text = '委托已报'
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
                    _this.stompClient.subscribe('/user/queue/entrustInfo', function (message) {
                        let updateData = JSON.parse(message.body)
                        switch (updateData.entrustStatus) {
                                case 0:
                                    updateData.entrustStatus_text = '撤单委托中'
                                    break
                                case 1:
                                    updateData.entrustStatus_text = '委托中'
                                    break
                                case 2:
                                    updateData.entrustStatus_text = '未成交'
                                    break
                                case 3:
                                    updateData.entrustStatus_text = '已报待撤'
                                    break
                                case 4:
                                    updateData.entrustStatus_text = '部成待撤'
                                    break
                                case 5:
                                    updateData.entrustStatus_text = '部成部撤'
                                    break
                                case 6:
                                    updateData.entrustStatus_text = '已撤单'
                                    break
                                case 7:
                                    updateData.entrustStatus_text = '部分成交'
                                    break
                                case 8:
                                    updateData.entrustStatus_text = '已成交'
                                    break
                                case 9:
                                    updateData.entrustStatus_text = '委托失败（废单）'
                                    break
                                case 10:
                                    updateData.entrustStatus_text = '撤单失败（撤废）'
                                    break
                        }
                        let i = 0
                        let length = _this.EntrustList.length
                        for (i; i <= length; i++) {
                            if (i == length) {
                                _this.EntrustList.unshift(updateData)
                                break
                            }
                            if (_this.EntrustList[i]["id"] == updateData.id) {
                                Vue.set(_this.EntrustList, i, updateData)
                                break
                            }
                        }
                    })
                })
            },
            disconnect () {
                let _this = this
                if (_this.stompClient != null) {
                    _this.stompClient.disconnect()
                }
                console.log("Disconnected")
            },
        },
        mounted () {
            this.getDataFromWs()
        },
        destroyed () {
            this.disconnect()
        }
    }
</script>

<style scoped lang="less">
    @import url(~assets/less/trade.less);
    @import url(~assets/less/tabel.less);
</style>
