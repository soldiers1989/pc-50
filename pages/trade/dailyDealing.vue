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
            <div class="no_data">
                <img src="~/static/images/img_nodata.png" alt="" v-if="!DealList || !DealList.length">
            </div>
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
        name: "dailyDealing",
        data () {
            return {
                DealList: [],
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
                    _this.stompClient.subscribe('/app/init/api/1.0/getTodayMakedealList', function (message) {
                        let WSData = JSON.parse(message.body)
                        if (WSData.code == 1) {
                            _this.DealList = WSData.data
                            console.log(WSData.data)
                        }
                    })
                    _this.stompClient.subscribe('/user/queue/makedealInfo', function (message) {
                        let updateData = JSON.parse(message.body)
                        let i = 0
                        let length = _this.DealList.length
                        for (i; i <= length; i++) {
                            if (i == length) {
                                _this.DealList.unshift(updateData)
                                break
                            }
                            if (_this.DealList[i]["id"] == updateData.id) {
                                Vue.set(_this.DealList, i, updateData)
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

