<template>
    <div class="container-protocol wrap">
        <div class="inner-page-content-wrap">
            <div class="contract_wrap" v-html="content"></div>
        </div>
    </div>
</template>

<script>
    import {errorMsg} from "~/plugins/tool";
    import {getProtocol} from "~/api/personal";
    import {bus} from '~/plugins/bus';
    export default {
        data() {
            return {
                content: "",
                type: ''
            }
        },
        methods: {
            update() {
                let _this = this
                getProtocol({type: 3})
                .then(function (res) {
                    if (res.status == 1) {
                        _this.content = res.data.content
                    }
                })
                .catch((err) => {
                    errorMsg('获取失败')
                })
            }
        },
        mounted() {
            this.update()
        }
    }
</script>

<style scoped>
    .container-protocol {
        margin-top: 160px;
        background-color: #fff;
        margin-bottom: 60px;
    }
    .contract_wrap {
        margin:50px auto 30px;
        padding:20px 30px 40px;
        text-align:left;
        color:#333;
        line-height:28px;
        font-size:16px
    }
    .contract_wrap h1{
        font-size:24px;
        text-align:center;
        margin:20px auto;
        padding-bottom:20px;
        font-weight:400
    }
    .contract_wrap h2{
        font-size:18px;
        margin:10px 0;
        font-weight:400
    }
    .contract_wrap ul{
        text-indent:2em
    }
    .contract_wrap p{
        padding-bottom:10px;
           
    }
    .contract_wrap .para_blank{text-indent:20px}
</style>
