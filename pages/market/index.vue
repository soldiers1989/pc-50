<template>
        <div class="market_page">
            <div class="market_header">
                <ul class="market_header-1">
                    <li @click="changeTab(value, key)" v-for="(value, key) in showData['mouth']"
                        :class="{redBack: tab == key}"><span>{{value}}</span></li>
                </ul>
                <ul class="market_header-2">
                    <li>
                        <span>标的名称：</span>
                        <span>50ETF</span>
                    </li>
                    <li>
                        <span>最新价：</span>
                        <span :class="{fontRed: stockData[2] >= 0, fontGreen: stockData[2] < 0}">{{stockData[1]}}</span>
                    </li>
                    <li>
                        <span>涨跌：</span>
                        <span :class="{fontRed: stockData[2] >= 0, fontGreen: stockData[2] < 0}">{{stockData[2]}}</span>
                    </li>
                    <li>
                        <span>幅度：</span>
                        <span :class="{fontRed: stockData[2] >= 0, fontGreen: stockData[2] < 0}">{{stockData[3]}}</span>
                    </li>
                    <li>
                        <span>成交量：</span>
                        <span>{{stockData[4]}}</span>
                    </li>
                    <li>
                        <span>金额：</span>
                        <span>{{stockData[5]}}万</span>
                    </li>
                </ul>
            </div>

            <div class="market_content">
                <div class="market_content-title">
                    <ul>
                        <li class="line1">持仓量</li>
                        <li class="line1">卖价</li>
                        <li class="line1">买价</li>
                        <li class="line1">涨跌幅</li>
                        <li class="line1">涨跌</li>
                        <li class="line1">现价</li>
                        <li class="line8">购</li>
                    </ul>
                    <ul>
                        <li class="line8">沽</li>
                        <li class="line1">现价</li>
                        <li class="line1">涨跌</li>
                        <li class="line1">涨跌幅</li>
                        <li class="line1">买价</li>
                        <li class="line1">卖价</li>
                        <li class="line1">持仓量</li>
                    </ul>
                </div>

                <div class="market_content-content">
                    <ul v-show="tab == 0">
                        <li v-for="item in showData[1]">
                    <span
                        @click="searchDetails({optionsName: optHqrealCur[item] !=undefined && optHqrealCur[item]['C'] ? optHqrealCur[item]['C']['optionCode'] :'' ,dir: 'up'})"
                        :class="['list' + item + 'C', {fontGreen: optHqrealCur[item] !=undefined && optHqrealCur[item]['C'] != undefined && parseFloat(optHqrealCur[item].C.rate) < 0, fontRed:  optHqrealCur[item] !=undefined &&  optHqrealCur[item]['C'] != undefined && parseFloat(optHqrealCur[item].C.rate) >= 0}]"
                        class="show">
                        {{optHqrealCur[item] !=undefined && optHqrealCur[item].C !=undefined ? optHqrealCur[item].C.undropAmount : "---"}}</span>


                            <span
                                @click="searchDetails({optionsName: optHqrealCur[item] !=undefined && optHqrealCur[item]['C'] ? optHqrealCur[item]['C']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'C', {fontGreen: optHqrealCur[item] !=undefined && optHqrealCur[item]['C'] != undefined && parseFloat(optHqrealCur[item].C.rate) < 0, fontRed:  optHqrealCur[item] !=undefined &&  optHqrealCur[item]['C'] != undefined && parseFloat(optHqrealCur[item].C.rate) >= 0}]"
                                class="show">{{optHqrealCur[item] !=undefined && optHqrealCur[item].C !=undefined ? optHqrealCur[item].C.sellPrice : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealCur[item] !=undefined && optHqrealCur[item] ? optHqrealCur[item]['C']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'C', {fontGreen: optHqrealCur[item] !=undefined && optHqrealCur[item]['C'] != undefined && parseFloat(optHqrealCur[item].C.rate) < 0, fontRed:  optHqrealCur[item] !=undefined &&  optHqrealCur[item]['C'] != undefined && parseFloat(optHqrealCur[item].C.rate) >= 0}]"
                                class="show">{{optHqrealCur[item] !=undefined && optHqrealCur[item].C != undefined ? optHqrealCur[item].C.buyPrice : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealCur[item] !=undefined && optHqrealCur[item]['C'] ? optHqrealCur[item]['C']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'C', {fontGreen: optHqrealCur[item] !=undefined && optHqrealCur[item]['C'] != undefined && parseFloat(optHqrealCur[item].C.rate) < 0, fontRed:  optHqrealCur[item] !=undefined &&  optHqrealCur[item]['C'] != undefined && parseFloat(optHqrealCur[item].C.rate) >= 0}]"
                                class="show">{{optHqrealCur[item] !=undefined && optHqrealCur[item].C !=undefined ? optHqrealCur[item].C.rate : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealCur[item] !=undefined && optHqrealCur[item] ? optHqrealCur[item]['C']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'C', {fontGreen: optHqrealCur[item] !=undefined && optHqrealCur[item]['C'] != undefined && parseFloat(optHqrealCur[item].C.rate) < 0, fontRed:  optHqrealCur[item] !=undefined &&  optHqrealCur[item]['C'] != undefined && parseFloat(optHqrealCur[item].C.rate) >= 0}]"
                                class="show">{{optHqrealCur[item] !=undefined && optHqrealCur[item].C != undefined ? optHqrealCur[item].C.range : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealCur[item] !=undefined && optHqrealCur[item] ? optHqrealCur[item]['C']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'C', {fontGreen: optHqrealCur[item] !=undefined && optHqrealCur[item]['C'] != undefined && parseFloat(optHqrealCur[item].C.rate) < 0, fontRed:  optHqrealCur[item] !=undefined &&  optHqrealCur[item]['C'] != undefined && parseFloat(optHqrealCur[item].C.rate) >= 0}]"
                                class="show">{{optHqrealCur[item] !=undefined && optHqrealCur[item].C != undefined ? optHqrealCur[item].C.price : "---"}}</span>


                            <span class="fontMarketBlue">{{item}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealCur[item] !=undefined && optHqrealCur[item]['P'] ? optHqrealCur[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealCur[item] !=undefined && optHqrealCur[item]['P'] != undefined && parseFloat(optHqrealCur[item].P.rate) < 0, fontRed:  optHqrealCur[item] !=undefined &&  optHqrealCur[item]['P'] != undefined && parseFloat(optHqrealCur[item].P.rate) >= 0}]"
                                class="show">{{optHqrealCur[item] !=undefined && optHqrealCur[item].P != undefined ? optHqrealCur[item].P.price : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealCur[item] !=undefined && optHqrealCur[item]['P'] ? optHqrealCur[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealCur[item] !=undefined && optHqrealCur[item]['P'] != undefined && parseFloat(optHqrealCur[item].P.rate) < 0, fontRed:  optHqrealCur[item] !=undefined &&  optHqrealCur[item]['P'] != undefined && parseFloat(optHqrealCur[item].P.rate) >= 0}]"
                                class="show">{{optHqrealCur[item] !=undefined &&  optHqrealCur[item].P  != undefined ? optHqrealCur[item].P.rate : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealCur[item] !=undefined && optHqrealCur[item]['P'] ? optHqrealCur[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealCur[item] !=undefined && optHqrealCur[item]['P'] != undefined && parseFloat(optHqrealCur[item].P.rate) < 0, fontRed:  optHqrealCur[item] !=undefined &&  optHqrealCur[item]['P'] != undefined && parseFloat(optHqrealCur[item].P.rate) >= 0}]"
                                class="show">{{optHqrealCur[item] !=undefined && optHqrealCur[item].P != undefined ? optHqrealCur[item].P.range : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealCur[item] !=undefined && optHqrealCur[item]['P'] ? optHqrealCur[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealCur[item] !=undefined && optHqrealCur[item]['P'] != undefined && parseFloat(optHqrealCur[item].P.rate) < 0, fontRed:  optHqrealCur[item] !=undefined &&  optHqrealCur[item]['P'] != undefined && parseFloat(optHqrealCur[item].P.rate) >= 0}]"
                                class="show">{{optHqrealCur[item] !=undefined &&  optHqrealCur[item].P  != undefined ? optHqrealCur[item].P.buyPrice : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealCur[item] !=undefined && optHqrealCur[item]['P'] ? optHqrealCur[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealCur[item] !=undefined && optHqrealCur[item]['P'] != undefined && parseFloat(optHqrealCur[item].P.rate) < 0, fontRed:  optHqrealCur[item] !=undefined &&  optHqrealCur[item]['P'] != undefined && parseFloat(optHqrealCur[item].P.rate) >= 0}]"
                                class="show">{{optHqrealCur[item] !=undefined && optHqrealCur[item].P != undefined ? optHqrealCur[item].P.sellPrice : "---"}}</span>


                            <span
                                @click="searchDetails({optionsName: optHqrealCur[item] !=undefined && optHqrealCur[item]['P'] ? optHqrealCur[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealCur[item] !=undefined && optHqrealCur[item]['P'] != undefined && parseFloat(optHqrealCur[item].P.rate) < 0, fontRed:  optHqrealCur[item] !=undefined &&  optHqrealCur[item]['P'] != undefined && parseFloat(optHqrealCur[item].P.rate) >= 0}]"
                                class="show,line10">{{optHqrealCur[item] !=undefined &&  optHqrealCur[item].P  != undefined ? optHqrealCur[item].P.undropAmount : "---"}}</span>

                        </li>
                    </ul>

                    <ul class="market_content" v-show="tab == 1">
                        <li v-for="item in showData[2]">
                    <span
                        @click="searchDetails({optionsName: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item]['C'] ? optHqrealNextMonth[item]['C']['optionCode'] :'' ,dir: 'up'})"
                        :class="['list' + item + 'C', {fontGreen: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item]['C'] != undefined && parseFloat(optHqrealNextMonth[item].C.rate) < 0, fontRed:  optHqrealNextMonth[item] !=undefined &&  optHqrealNextMonth[item]['C'] != undefined && parseFloat(optHqrealNextMonth[item].C.rate) >= 0}]"
                        class="show">{{optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item].C !=undefined ? optHqrealNextMonth[item].C.undropAmount : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item] ? optHqrealNextMonth[item]['C']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'C', {fontGreen: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item]['C'] != undefined && parseFloat(optHqrealNextMonth[item].C.rate) < 0, fontRed:  optHqrealNextMonth[item] !=undefined &&  optHqrealNextMonth[item]['C'] != undefined && parseFloat(optHqrealNextMonth[item].C.rate) >= 0}]"
                                class="show">{{optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item].C != undefined ? optHqrealNextMonth[item].C.sellPrice : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item]['C'] ? optHqrealNextMonth[item]['C']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'C', {fontGreen: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item]['C'] != undefined && parseFloat(optHqrealNextMonth[item].C.rate) < 0, fontRed:  optHqrealNextMonth[item] !=undefined &&  optHqrealNextMonth[item]['C'] != undefined && parseFloat(optHqrealNextMonth[item].C.rate) >= 0}]"
                                class="show">{{optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item].C !=undefined ? optHqrealNextMonth[item].C.buyPrice : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item] ? optHqrealNextMonth[item]['C']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'C', {fontGreen: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item]['C'] != undefined && parseFloat(optHqrealNextMonth[item].C.rate) < 0, fontRed:  optHqrealNextMonth[item] !=undefined &&  optHqrealNextMonth[item]['C'] != undefined && parseFloat(optHqrealNextMonth[item].C.rate) >= 0}]"
                                class="show">{{optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item].C != undefined ? optHqrealNextMonth[item].C.rate : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item]['C'] ? optHqrealNextMonth[item]['C']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'C', {fontGreen: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item]['C'] != undefined && parseFloat(optHqrealNextMonth[item].C.rate) < 0, fontRed:  optHqrealNextMonth[item] !=undefined &&  optHqrealNextMonth[item]['C'] != undefined && parseFloat(optHqrealNextMonth[item].C.rate) >= 0}]"
                                class="show">{{optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item].C !=undefined ? optHqrealNextMonth[item].C.range : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item] ? optHqrealNextMonth[item]['C']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'C', {fontGreen: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item]['C'] != undefined && parseFloat(optHqrealNextMonth[item].C.rate) < 0, fontRed:  optHqrealNextMonth[item] !=undefined &&  optHqrealNextMonth[item]['C'] != undefined && parseFloat(optHqrealNextMonth[item].C.rate) >= 0}]"
                                class="show">{{optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item].C != undefined ? optHqrealNextMonth[item].C.price : "---"}}</span>


                            <span class="fontMarketBlue">{{item}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item]['P'] ? optHqrealNextMonth[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item]['P'] != undefined && parseFloat(optHqrealNextMonth[item].P.rate) < 0, fontRed:  optHqrealNextMonth[item] !=undefined &&  optHqrealNextMonth[item]['P'] != undefined && parseFloat(optHqrealNextMonth[item].P.rate) >= 0}]"
                                class="show">{{optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item].P != undefined ? optHqrealNextMonth[item].P.price : "---"}}</span>


                            <span
                                @click="searchDetails({optionsName: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item]['P'] ? optHqrealNextMonth[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item]['P'] != undefined && parseFloat(optHqrealNextMonth[item].P.rate) < 0, fontRed:  optHqrealNextMonth[item] !=undefined &&  optHqrealNextMonth[item]['P'] != undefined && parseFloat(optHqrealNextMonth[item].P.rate) >= 0}]"
                                class="show">{{optHqrealNextMonth[item] !=undefined &&  optHqrealNextMonth[item].P  != undefined ? optHqrealNextMonth[item].P.range : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item]['P'] ? optHqrealNextMonth[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item]['P'] != undefined && parseFloat(optHqrealNextMonth[item].P.rate) < 0, fontRed:  optHqrealNextMonth[item] !=undefined &&  optHqrealNextMonth[item]['P'] != undefined && parseFloat(optHqrealNextMonth[item].P.rate) >= 0}]"
                                class="show">{{optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item].P != undefined ? optHqrealNextMonth[item].P.rate : "---"}}</span>


                            <span
                                @click="searchDetails({optionsName: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item]['P'] ? optHqrealNextMonth[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item]['P'] != undefined && parseFloat(optHqrealNextMonth[item].P.rate) < 0, fontRed:  optHqrealNextMonth[item] !=undefined &&  optHqrealNextMonth[item]['P'] != undefined && parseFloat(optHqrealNextMonth[item].P.rate) >= 0}]"
                                class="show">{{optHqrealNextMonth[item] !=undefined &&  optHqrealNextMonth[item].P  != undefined ? optHqrealNextMonth[item].P.buyPrice : "---"}}</span>


                            <span
                                @click="searchDetails({optionsName: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item]['P'] ? optHqrealNextMonth[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item]['P'] != undefined && parseFloat(optHqrealNextMonth[item].P.rate) < 0, fontRed:  optHqrealNextMonth[item] !=undefined &&  optHqrealNextMonth[item]['P'] != undefined && parseFloat(optHqrealNextMonth[item].P.rate) >= 0}]"
                                class="show">{{optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item].P != undefined ? optHqrealNextMonth[item].P.sellPrice : "---"}}</span>


                            <span
                                @click="searchDetails({optionsName: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item]['P'] ? optHqrealNextMonth[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealNextMonth[item] !=undefined && optHqrealNextMonth[item]['P'] != undefined && parseFloat(optHqrealNextMonth[item].P.rate) < 0, fontRed:  optHqrealNextMonth[item] !=undefined &&  optHqrealNextMonth[item]['P'] != undefined && parseFloat(optHqrealNextMonth[item].P.rate) >= 0}]"
                                class="show">{{optHqrealNextMonth[item] !=undefined &&  optHqrealNextMonth[item].P  != undefined ? optHqrealNextMonth[item].P.undropAmount : "---"}}</span>


                        </li>
                    </ul>
                    <ul class="market_content" v-show="tab == 2">
                        <li v-for="item in showData[3]">
                    <span
                        @click="searchDetails({optionsName: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item]['C'] ? optHqrealNextQuarter[item]['C']['optionCode'] :'' ,dir: 'up'})"
                        :class="['list' + item + 'C', {fontGreen: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item]['C'] != undefined && parseFloat(optHqrealNextQuarter[item].C.rate) < 0, fontRed: optHqrealNextQuarter[item] !=undefined &&  optHqrealNextQuarter[item]['C'] != undefined && parseFloat(optHqrealNextQuarter[item].C.rate) >= 0}]"
                        class="show">{{optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item].C !=undefined ? optHqrealNextQuarter[item].C.undropAmount : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item] ? optHqrealNextQuarter[item]['C']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'C', {fontGreen: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item]['C'] != undefined && parseFloat(optHqrealNextQuarter[item].C.rate) < 0, fontRed: optHqrealNextQuarter[item] !=undefined &&  optHqrealNextQuarter[item]['C'] != undefined && parseFloat(optHqrealNextQuarter[item].C.rate) >= 0}]"
                                class="show">{{optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item].C != undefined ? optHqrealNextQuarter[item].C.sellPrice : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item]['C'] ? optHqrealNextQuarter[item]['C']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'C', {fontGreen: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item]['C'] != undefined && parseFloat(optHqrealNextQuarter[item].C.rate) < 0, fontRed: optHqrealNextQuarter[item] !=undefined &&  optHqrealNextQuarter[item]['C'] != undefined && parseFloat(optHqrealNextQuarter[item].C.rate) >= 0}]"
                                class="show">{{optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item].C !=undefined ? optHqrealNextQuarter[item].C.buyPrice : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item] ? optHqrealNextQuarter[item]['C']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'C', {fontGreen: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item]['C'] != undefined && parseFloat(optHqrealNextQuarter[item].C.rate) < 0, fontRed: optHqrealNextQuarter[item] !=undefined &&  optHqrealNextQuarter[item]['C'] != undefined && parseFloat(optHqrealNextQuarter[item].C.rate) >= 0}]"
                                class="show">{{optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item].C != undefined ? optHqrealNextQuarter[item].C.rate : "---"}}</span>


                            <span
                                @click="searchDetails({optionsName: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item]['C'] ? optHqrealNextQuarter[item]['C']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'C', {fontGreen: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item]['C'] != undefined && parseFloat(optHqrealNextQuarter[item].C.rate) < 0, fontRed: optHqrealNextQuarter[item] !=undefined &&  optHqrealNextQuarter[item]['C'] != undefined && parseFloat(optHqrealNextQuarter[item].C.rate) >= 0}]"
                                class="show">{{optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item].C !=undefined ? optHqrealNextQuarter[item].C.range : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item] ? optHqrealNextQuarter[item]['C']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'C', {fontGreen: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item]['C'] != undefined && parseFloat(optHqrealNextQuarter[item].C.rate) < 0, fontRed: optHqrealNextQuarter[item] !=undefined &&  optHqrealNextQuarter[item]['C'] != undefined && parseFloat(optHqrealNextQuarter[item].C.rate) >= 0}]"
                                class="show">{{optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item].C != undefined ? optHqrealNextQuarter[item].C.price : "---"}}</span>


                            <span class="fontMarketBlue">{{item}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item]['P'] ? optHqrealNextQuarter[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item]['P'] != undefined && parseFloat(optHqrealNextQuarter[item].P.rate) < 0, fontRed:  optHqrealNextQuarter[item] !=undefined &&  optHqrealNextQuarter[item]['P'] != undefined && parseFloat(optHqrealNextQuarter[item].P.rate) >= 0}]"
                                class="show">{{optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item].P != undefined ? optHqrealNextQuarter[item].P.price : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item]['P'] ? optHqrealNextQuarter[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item]['P'] != undefined && parseFloat(optHqrealNextQuarter[item].P.rate) < 0, fontRed:  optHqrealNextQuarter[item] !=undefined &&  optHqrealNextQuarter[item]['P'] != undefined && parseFloat(optHqrealNextQuarter[item].P.rate) >= 0}]"
                                class="show">{{optHqrealNextQuarter[item] !=undefined &&  optHqrealNextQuarter[item].P  != undefined ? optHqrealNextQuarter[item].P.range : "---"}}</span>


                            <span
                                @click="searchDetails({optionsName: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item]['P'] ? optHqrealNextQuarter[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item]['P'] != undefined && parseFloat(optHqrealNextQuarter[item].P.rate) < 0, fontRed:  optHqrealNextQuarter[item] !=undefined &&  optHqrealNextQuarter[item]['P'] != undefined && parseFloat(optHqrealNextQuarter[item].P.rate) >= 0}]"
                                class="show">{{optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item].P != undefined ? optHqrealNextQuarter[item].P.rate : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item]['P'] ? optHqrealNextQuarter[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item]['P'] != undefined && parseFloat(optHqrealNextQuarter[item].P.rate) < 0, fontRed:  optHqrealNextQuarter[item] !=undefined &&  optHqrealNextQuarter[item]['P'] != undefined && parseFloat(optHqrealNextQuarter[item].P.rate) >= 0}]"
                                class="show">{{optHqrealNextQuarter[item] !=undefined &&  optHqrealNextQuarter[item].P  != undefined ? optHqrealNextQuarter[item].P.buyPrice : "---"}}</span>


                            <span
                                @click="searchDetails({optionsName: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item]['P'] ? optHqrealNextQuarter[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item]['P'] != undefined && parseFloat(optHqrealNextQuarter[item].P.rate) < 0, fontRed:  optHqrealNextQuarter[item] !=undefined &&  optHqrealNextQuarter[item]['P'] != undefined && parseFloat(optHqrealNextQuarter[item].P.rate) >= 0}]"
                                class="show">{{optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item].P != undefined ? optHqrealNextQuarter[item].P.sellPrice : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item]['P'] ? optHqrealNextQuarter[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealNextQuarter[item] !=undefined && optHqrealNextQuarter[item]['P'] != undefined && parseFloat(optHqrealNextQuarter[item].P.rate) < 0, fontRed:  optHqrealNextQuarter[item] !=undefined &&  optHqrealNextQuarter[item]['P'] != undefined && parseFloat(optHqrealNextQuarter[item].P.rate) >= 0}]"
                                class="show">{{optHqrealNextQuarter[item] !=undefined &&  optHqrealNextQuarter[item].P  != undefined ? optHqrealNextQuarter[item].P.undropAmount : "---"}}</span>


                        </li>
                    </ul>
                    <ul class="market_content" v-show="tab == 3">
                        <li v-for="item in showData[4]">
                    <span
                        @click="searchDetails({optionsName: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item]['C'] ? optHqrealNextSecondQuarter[item]['C']['optionCode'] :'' ,dir: 'up'})"
                        :class="['list' + item + 'C', {fontGreen: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item]['C'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].C.rate) < 0, fontRed:  optHqrealNextSecondQuarter[item] !=undefined &&  optHqrealNextSecondQuarter[item]['C'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].C.rate) >= 0}]"
                        class="show">{{optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item].C !=undefined ? optHqrealNextSecondQuarter[item].C.undropAmount : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item] ? optHqrealNextSecondQuarter[item]['C']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'C', {fontGreen: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item]['C'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].C.rate) < 0, fontRed:  optHqrealNextSecondQuarter[item] !=undefined &&  optHqrealNextSecondQuarter[item]['C'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].C.rate) >= 0}]"
                                class="show">{{optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item].C != undefined ? optHqrealNextSecondQuarter[item].C.buyPrice : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item]['C'] ? optHqrealNextSecondQuarter[item]['C']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'C', {fontGreen: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item]['C'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].C.rate) < 0, fontRed:  optHqrealNextSecondQuarter[item] !=undefined &&  optHqrealNextSecondQuarter[item]['C'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].C.rate) >= 0}]"
                                class="show">{{optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item].C !=undefined ? optHqrealNextSecondQuarter[item].C.sellPrice : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item] ? optHqrealNextSecondQuarter[item]['C']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'C', {fontGreen: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item]['C'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].C.rate) < 0, fontRed:  optHqrealNextSecondQuarter[item] !=undefined &&  optHqrealNextSecondQuarter[item]['C'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].C.rate) >= 0}]"
                                class="show">{{optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item].C != undefined ? optHqrealNextSecondQuarter[item].C.rate : "---"}}</span>


                            <span
                                @click="searchDetails({optionsName: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item]['C'] ? optHqrealNextSecondQuarter[item]['C']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'C', {fontGreen: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item]['C'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].C.rate) < 0, fontRed:  optHqrealNextSecondQuarter[item] !=undefined &&  optHqrealNextSecondQuarter[item]['C'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].C.rate) >= 0}]"
                                class="show">{{optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item].C !=undefined ? optHqrealNextSecondQuarter[item].C.range : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item] ? optHqrealNextSecondQuarter[item]['C']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'C', {fontGreen: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item]['C'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].C.rate) < 0, fontRed:  optHqrealNextSecondQuarter[item] !=undefined &&  optHqrealNextSecondQuarter[item]['C'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].C.rate) >= 0}]"
                                class="show">{{optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item].C != undefined ? optHqrealNextSecondQuarter[item].C.price : "---"}}</span>


                            <span class="fontMarketBlue">{{item}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item]['P'] ? optHqrealNextSecondQuarter[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item]['P'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].P.rate) < 0, fontRed:  optHqrealNextSecondQuarter[item] !=undefined &&  optHqrealNextSecondQuarter[item]['P'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].P.rate) >= 0}]"
                                class="show">{{optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item].P != undefined ? optHqrealNextSecondQuarter[item].P.price : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item]['P'] ? optHqrealNextSecondQuarter[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item]['P'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].P.rate) < 0, fontRed:  optHqrealNextSecondQuarter[item] !=undefined &&  optHqrealNextSecondQuarter[item]['P'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].P.rate) >= 0}]"
                                class="show">{{optHqrealNextSecondQuarter[item] !=undefined &&  optHqrealNextSecondQuarter[item].P  != undefined ? optHqrealNextSecondQuarter[item].P.range : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item]['P'] ? optHqrealNextSecondQuarter[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item]['P'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].P.rate) < 0, fontRed:  optHqrealNextSecondQuarter[item] !=undefined &&  optHqrealNextSecondQuarter[item]['P'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].P.rate) >= 0}]"
                                class="show">{{optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item].P != undefined ? optHqrealNextSecondQuarter[item].P.rate : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item]['P'] ? optHqrealNextSecondQuarter[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item]['P'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].P.rate) < 0, fontRed:  optHqrealNextSecondQuarter[item] !=undefined &&  optHqrealNextSecondQuarter[item]['P'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].P.rate) >= 0}]"
                                class="show">{{optHqrealNextSecondQuarter[item] !=undefined &&  optHqrealNextSecondQuarter[item].P  != undefined ? optHqrealNextSecondQuarter[item].P.buyPrice : "---"}}</span>


                            <span
                                @click="searchDetails({optionsName: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item]['P'] ? optHqrealNextSecondQuarter[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item]['P'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].P.rate) < 0, fontRed:  optHqrealNextSecondQuarter[item] !=undefined &&  optHqrealNextSecondQuarter[item]['P'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].P.rate) >= 0}]"
                                class="show">{{optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item].P != undefined ? optHqrealNextSecondQuarter[item].P.sellPrice : "---"}}</span>

                            <span
                                @click="searchDetails({optionsName: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item]['P'] ? optHqrealNextSecondQuarter[item]['P']['optionCode'] :'' ,dir: 'up'})"
                                :class="['list' + item + 'P', {fontGreen: optHqrealNextSecondQuarter[item] !=undefined && optHqrealNextSecondQuarter[item]['P'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].P.rate) < 0, fontRed:  optHqrealNextSecondQuarter[item] !=undefined &&  optHqrealNextSecondQuarter[item]['P'] != undefined && parseFloat(optHqrealNextSecondQuarter[item].P.rate) >= 0}]"
                                class="show">{{optHqrealNextSecondQuarter[item] !=undefined &&  optHqrealNextSecondQuarter[item].P  != undefined ? optHqrealNextSecondQuarter[item].P.undropAmount : "---"}}</span>


                        </li>
                    </ul>
                </div>

            </div>
        </div>
</template>

<script>
    import {setItem, errorMsg} from "../../plugins/tool";
    import {fetchToken} from "~/api/ajax";
    import SockJS from 'sockjs-client'
    import Stomp from 'stompjs'
    import Vue from 'vue'
    import {WebScoketUrl} from "../../api/api";
    import {getInfoOfETF} from '../../api/trade'
    import {getProduct} from "../../api/trade";
    import {mapState, mapMutations} from 'vuex';
    import {fixed, fillZero} from "../../plugins/tool";

    export default {
        name: "market",
        data() {
            return {
                tab: 0,
                WebScoketUrl: WebScoketUrl,
                access_token: '12345667',
                userid: 123456789,
                socket: {},
                stompClient: {},
                optHqrealCur: {},
                optHqrealNextMonth: {},
                optHqrealNextQuarter: {},
                optHqrealNextSecondQuarter: {},
                showData: [],
                getNewlyPrice: null,
                stockData: []
            }
        },
        methods: {
            ...mapMutations(['isShowJoint']),
            changeTab(value, key) {
                this.tab = key
                this.unsubscribe()
                this.socket = {}
                this.stompClient = {}
                this.connect(key)
            },
            getData() {
                getInfoOfETF().then(res => {
                    // 名称，当前价，涨跌值，涨跌幅，总手数，成交额
                    this.stockData = res
                })
            },
            searchDetails(value) {
                console.log(value)
                if (value.optionsName) {
                    if (!fetchToken()) {
                        this.isShowJoint()
                    } else {
                        this.$router.push({path: '/trade/buy', query: {code: value.optionsName}})
                    }
                } else {
                    alert('该产品暂无报价')
                    return false
                }
            },
            connect(key) {
                let now1 = new Date()
                let time1 = now1.getHours() + ':' + now1.getMinutes()
                let _this = this
                _this.socket = new SockJS(WebScoketUrl)
                _this.stompClient = Stomp.over(_this.socket)
                _this.stompClient.connect({'username': _this.userid}, function (frame) {
                    _this.stompClient.subscribe('/app/init/api/1.0/getHq/' + (key + 1), function (message) {
                        let redisData = (JSON.parse(message.body)).data
                        for (let item in redisData) {
                            _this.updateInfo(redisData[item], key)
                        }
                    })
                    switch (key) {
                        case 0:
                            _this.stompClient.subscribe('/topic/optionInfo/optHqrealCur', function (message) {
                                let data = message.body
                                if (_this.IsJSON(data)) {
                                    _this.updateInfo(JSON.parse(data), key)
                                }
                            })
                            break
                        case 1:
                            _this.stompClient.subscribe('/topic/optionInfo/optHqrealNextMonth', function (message) {
                                let data = message.body
                                _this.updateInfo(JSON.parse(data), key)
                            })
                            break
                        case 2:
                            _this.stompClient.subscribe('/topic/optionInfo/optHqrealNextQuarter', function (message) {
                                let data = message.body
                                _this.updateInfo(JSON.parse(data), key)
                            })
                            break
                        case 3:
                            _this.stompClient.subscribe('/topic/optionInfo/optHqrealNextSecondQuarter', function (message) {
                                let data = message.body
                                _this.updateInfo(JSON.parse(data), key)
                            })
                            break
                    }
                })
            },
            disconnect() {
                let _this = this
                if (_this.stompClient != null) {
                    _this.stompClient.disconnect()
                }
            },
            unsubscribe() {
                if (this.stompClient != null) {
                    this.stompClient.unsubscribe('sub-1')
                    this.stompClient.unsubscribe('sub-0')
                }
            },
            IsJSON(data) {
                try {
                    JSON.parse(data)
                } catch (e) {
                    return false
                }
                return true
            },
            updateInfo(data, type) {
                let JSONData = data
                let preSquarePrice = JSONData.PSP
                let lastPrice = JSONData.LP
                let OptionPrice = (JSONData.EP).substring(0, 6)
                let optionCode = JSONData.OC
                let OptionName = JSONData.ON
                let optexchStatus = JSONData.OT
                let undropAmount = JSONData.UA
                let sellPrice = JSONData.SP1
                let buyPrice = JSONData.BP1
                let range = (lastPrice - preSquarePrice).toFixed(4)
                if (OptionName.indexOf('A') != -1) {
                    OptionPrice += 'A'
                }
                let _this = this
                let rate = (Number(range / preSquarePrice) * 100).toFixed(2)  + '%'
                if (lastPrice == 0 || preSquarePrice == 0) {
                    rate = '---'
                    range = '---'
                }
                let Obj = {}
                let changeData = new Array()
                let keys = []
                switch (type) {
                    case 0:
                        let obj = optexchStatus == 'C' ? {
                            C: {
                                'optionCode': optionCode,
                                'rate': rate,
                                'price': lastPrice,
                                undropAmount: undropAmount,
                                sellPrice: sellPrice,
                                buyPrice: buyPrice,
                                range: range
                            }
                        } : {
                            P: {
                                'optionCode': optionCode,
                                'rate': rate,
                                'price': lastPrice,
                                undropAmount: undropAmount,
                                sellPrice: sellPrice,
                                buyPrice: buyPrice,
                                range: range
                            }
                        }
                        keys = Object.keys(_this.optHqrealCur)
                        if (keys.indexOf(OptionPrice) == -1) {
                            Vue.set(_this.optHqrealCur, OptionPrice, obj)
                        } else {
                            for (let val in _this.optHqrealCur) {
                                if (val == OptionPrice) {
                                    let changeObj = _this.optHqrealCur[val]
                                    optexchStatus == 'C' ? Vue.set(changeObj, optexchStatus, obj.C) : Vue.set(changeObj, optexchStatus, obj.P)
                                }
                            }
                        }
                        break
                    case 1:
                        obj = optexchStatus == 'C' ? {
                            C: {
                                'optionCode': optionCode,
                                'rate': rate,
                                'price': lastPrice,
                                undropAmount: undropAmount,
                                sellPrice: sellPrice,
                                buyPrice: buyPrice,
                                range: range
                            }
                        } : {
                            P: {
                                'optionCode': optionCode,
                                'rate': rate,
                                'price': lastPrice,
                                undropAmount: undropAmount,
                                sellPrice: sellPrice,
                                buyPrice: buyPrice,
                                range: range
                            }
                        }
                        keys = Object.keys(_this.optHqrealNextMonth)
                        if (keys.indexOf(OptionPrice) == -1) {
                            Vue.set(_this.optHqrealNextMonth, OptionPrice, obj)
                        } else {
                            for (let val in _this.optHqrealNextMonth) {
                                if (val == OptionPrice) {
                                    let changeObj = _this.optHqrealNextMonth[val]
                                    optexchStatus == 'C' ? Vue.set(changeObj, optexchStatus, obj.C) : Vue.set(changeObj, optexchStatus, obj.P)
                                }
                            }
                        }
                        break
                    case 2:
                        obj = optexchStatus == 'C' ? {
                            C: {
                                'optionCode': optionCode,
                                'rate': rate,
                                'price': lastPrice,
                                undropAmount: undropAmount,
                                sellPrice: sellPrice,
                                buyPrice: buyPrice,
                                range: range
                            }
                        } : {
                            P: {
                                'optionCode': optionCode,
                                'rate': rate,
                                'price': lastPrice,
                                undropAmount: undropAmount,
                                sellPrice: sellPrice,
                                buyPrice: buyPrice,
                                range: range
                            }
                        }
                        keys = Object.keys(_this.optHqrealNextQuarter)
                        if (keys.indexOf(OptionPrice) == -1) {
                            Vue.set(_this.optHqrealNextQuarter, OptionPrice, obj)
                        } else {
                            for (let val in _this.optHqrealNextQuarter) {
                                if (val == OptionPrice) {
                                    let changeObj = _this.optHqrealNextQuarter[val]
                                    optexchStatus == 'C' ? Vue.set(changeObj, optexchStatus, obj.C) : Vue.set(changeObj, optexchStatus, obj.P)
                                }
                            }
                        }
                        break
                    case 3:
                        obj = optexchStatus == 'C' ? {
                            C: {
                                'optionCode': optionCode,
                                'rate': rate,
                                'price': lastPrice,
                                undropAmount: undropAmount,
                                sellPrice: sellPrice,
                                buyPrice: buyPrice,
                                range: range
                            }
                        } : {
                            P: {
                                'optionCode': optionCode,
                                'rate': rate,
                                'price': lastPrice,
                                undropAmount: undropAmount,
                                sellPrice: sellPrice,
                                buyPrice: buyPrice,
                                range: range
                            }
                        }
                        keys = Object.keys(_this.optHqrealNextSecondQuarter)
                        if (keys.indexOf(OptionPrice) == -1) {
                            Vue.set(_this.optHqrealNextSecondQuarter, OptionPrice, obj)
                        } else {
                            for (let val in _this.optHqrealNextSecondQuarter) {
                                if (val == OptionPrice) {
                                    let changeObj = _this.optHqrealNextSecondQuarter[val]
                                    optexchStatus == 'C' ? Vue.set(changeObj, optexchStatus, obj.C) : Vue.set(changeObj, optexchStatus, obj.P)
                                }
                            }
                        }
                        break
                }
                let change = document.getElementsByClassName('list' + OptionPrice + optexchStatus)
                let len = change.length
                let c = ""
                if (parseFloat(rate) >= 0) {
                    c = "fontRed"
                } else {
                    c = "fontGreen"
                }
                for (let i = 0; i < len; i++) {
                    change[i].setAttribute('class', 'list' + OptionPrice + optexchStatus + ' fade ' + c)
                    setTimeout(() => {
                        change[i].setAttribute('class', 'list' + OptionPrice + optexchStatus + ' show ' + c)
                    }, 300)
                }
            },
            getInfo() {
                let _this = this
                getProduct().then(function (data) {
                    _this.showData = data.data
                })
            }
        },
        mounted() {
            this.connect(0)
            this.getData()
            this.getInfo()
            this.getNewlyPrice = setInterval(this.getData, 8000)
        },
        destroyed() {
            setItem('optHqrealCur', this.optHqrealCur)
            setItem('optHqrealNextMonth', this.optHqrealNextMonth)
            setItem('optHqrealNextQuarter', this.optHqrealNextQuarter)
            setItem('optHqrealNextSecondQuarter', this.optHqrealNextSecondQuarter)
        },
        beforeDestroy() {
            clearInterval(this.getNewlyPrice)
            this.unsubscribe()
        }
    }
</script>

<style scoped lang="less">
    @import url(~assets/less/market.less);

    .fade {
        background-color: #F4F8FF;
    }

    .show {
        color: #000;
    }
</style>
