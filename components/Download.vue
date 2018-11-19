<template>
    <div>
        <div class="main">
            <p class="title">客户端下载</p>
            <div class=" wrap main-content">
                <div class="main-content-left">
                    <img :src="adverPic[0] && adverPic[0]['picUrl']">
                </div>
                <div class="main-content-right">
                    <p class="item1">APP客户端</p>
                    <p class="item2">随时随地查看行情</p>
                    <p class="item3">快速交易 自然胜人一筹</p>
                    <div class="item4">
                        <ul class="ul1">
                            <li><img :src='AndroidUrl'></li>
                            <li>Andriod扫码下载</li>
                        </ul>
                        <ul class="ul2">
                            <li><img :src="IosUrl"></li>
                            <li>iPhone扫码下载</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getItem} from '~/plugins/tool'
import {getDownloadApp} from '~/api/personal.js'
import {bus} from '~/plugins/bus';

export default {
    data() {
        return {
            AndroidUrl: '',
            IosUrl: '',
            cust_qr: '',
            adverPic: []
        }
    },
    methods: {
        init() {
            let _this = this
            getDownloadApp().then(res => {
                if (res.status == 1) {
                    _this.AndroidUrl = res.data.androidDownloadUrl
                    _this.IosUrl = res.data.iosDownloadUrl
                }
            })
        },
        updateIndexData() {
            let indexData = getItem('indexData')
            if (indexData) {
                this.cust_qr = indexData.public_qr
                this.adverPic = indexData.others[8] || this.adverPic
            }
        }
    },
    mounted() {
        this.init()
        this.updateIndexData()
        bus.$on('updateIndexData', () => {
            this.updateIndexData()
        })
    },
}
</script>

<style scoped lang="less">
@import url(~assets/less/reset.less);
.main {
    height: 585px;
    background-color: @bgc;
    .title {
        color: @333;
        padding: 40px 0 69px 0;
        text-align: center;
        font-size: 30px;
        line-height: 31px;
    }
    .main-content {
        display: flex;
        flex-direction: row;
        align-items: center;
        .main-content-left {
            width: 678px;
            height: 366px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .main-content-right {
            margin-top: 20px;
            margin-left: 51px;
            .item1 {
                font-size: 30px;
                line-height: 31px;
                margin-bottom: 18px;
            }
            .item2{
                font-size: 20px;
                line-height: 28px;
            }
            .item3 {
                font-size: 20px;
                line-height: 28px;
                margin-bottom: 33px;
            }
            .item4 {
                display: flex;
                flex-direction: row;
                .ul1 {
                    li:nth-child(1) {
                        width: 154px;
                        height: 154px;
                        margin-right: 61px;
                        img {
                            width: 100%;
                            height: 100%;

                        }
                    }
                    li:nth-child(2) {
                        margin-top: 14px;
                        text-align: center;
                        text-indent: -3.5em;
                    }
                }
                .ul2 {
                    li:nth-child(1) {
                        width: 154px;
                        height: 154px;
                        img {
                            width: 100%;
                            height: 100%;

                        }
                    }
                    li:nth-child(2) {
                        margin-top: 14px;
                        text-align: center;
                    }
                }
            }
        }
    }
}
</style>
