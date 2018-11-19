<template>
    <div class="page-wrapper">
        <Header v-if="isRouterAlive"/>
            <div class="wrap-component">
                <nuxt/>
            </div>
        <Footer />
        <div class="page-component-up" id="backTop"><i class="el-icon-caret-top"></i></div>
    </div>
</template>

<script>
    import Header from '~/components/Header.vue'
    import Footer from '~/components/Footer.vue'
    import {getIndexData} from "~/api/common.js";
    import {setItem} from "~/plugins/tool";
    import {bus} from '~/plugins/bus.js'
    import {getHelpArticles, getAllProduct} from "../api/personal";
    import {setLoginInfo, getUserInfo} from "../api/ajax";
    import {validLogin} from "../plugins/tool";
    import {getProduct} from "../api/trade";

    export default {
        components: {
            Header, Footer
        },
        data () {
            return {
                articleList: [],
                isRouterAlive: true
            }
        },
        provide(){
            return {
                reload:this.reload
            }
        },
        methods: {
            getIndexData() {
                getIndexData().then(function (res) {
                    if (res.status == 1) {
                        setItem('indexData', res.data)
                        bus.$emit('updateIndexData')
                        let platform_name = res.data.platform_name
                        document.title = platform_name
                    }
                })
            },
            getProduct() {
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
            getHelpArticles() {
                getHelpArticles().then((res) => {
                    if (res.status == 1) {
                        this.articleList = res.data
                        setItem('article', res.data)
                    } else {
                        setItem('article', res.data)
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
        mounted() {
            this.getIndexData()
            this.getHelpArticles()
            this.getProduct()
            window.onload = function () {
                var btn = document.getElementById("backTop");
                // 获取页面可视区的高度
                var clientHeight = document.documentElement.clientHeight;
                var timer = null;
                var isTop = true;
                // 滚动条滚动时触发事件
                window.onscroll = function () {
                    var stop = document.documentElement.scrollTop || document.body.scrollTop;
                    if (stop >= 200) {
                        btn.style.display = 'block';
                    } else {
                        btn.style.display = 'none';
                    }
                    if (!isTop) {
                        clearInterval(timer);
                    }
                        isTop = false;
                }
                btn.onclick = function () {
                    clearInterval(timer);
                    timer = setInterval(function () {
                        var stop = document.documentElement.scrollTop || document.body.scrollTop;
                        // 创建滚动条的速度
                        var speed = Math.floor(stop / 5) + 1;
                        document.documentElement.scrollTop = document.body.scrollTop = stop - speed;
                        isTop = true;
                        if (stop == 0) {
                            clearInterval(timer);
                        }
                    }, 30)
                }
            }
        }
    }
</script>

<style>
    html {
        font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 16px;
        word-spacing: 1px;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
        background-color: #F5F5F5;
    }
    .page-component-up {
        background-color: #fff;
        position: fixed;
        right: 100px;
        bottom: 150px;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        cursor: pointer;
        box-shadow: 0 0 6px rgba(0,0,0,.12);
        z-index: 5;
        display: none;
    }
    .page-component-up i {
        color: #EB2F30;
        display: block;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
    }
    .el-icon-caret-top:before {
        content: "\E60C";
    }
</style>
