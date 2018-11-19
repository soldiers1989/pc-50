<template>
    <div>
        <div class="main">
            <div class="main-body">
                <div class="select">
                    <span v-for="(tab, index) in tabs" :class="{cur: iscur==index}" :key=index @click="iscur=index, tabChange('select' + (index + 1))">{{tab.name}}</span>
                </div>
            </div>
            <div class="main-footer">
                <component :is="tabView"></component>
            </div>
        </div>
    </div>
</template>

<script>
import select1 from '~/pages/password/loginPwd.vue';
import select2 from '~/pages/password/withdrawPwd.vue';
export default {
    data() {
        return {
            tabView: 'select1',
            tabs: [{name: "登录密码"}, {name: "提现密码"}],
            iscur: 0
        }
    },
    components: {
        select1,
        select2
    },
    methods: {
        tabChange(tab) {
            this.tabView = tab
        }
    }
}
</script>

<style scoped lang="less">
@import url(~assets/less/reset.less);
.main {
    height: 627px;
    background-color: #fff;
    margin-bottom: 188px;
    padding: 0 45px;
    .title {
        font-size: 18px;
        line-height: 40px;
        padding-top: 50px;
        color: #333;
        font-weight: 600;
        border-bottom: 1px solid rgba(204,204,204,1);
        text-indent: 35px;
    }
    .main-body {
        padding-left: 35px;
        padding-top: 29px;
        border-bottom: 1px solid #ccc;
        .select {
            span {
                width: 100px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                display: inline-block;
                border: 1px solid #ccc;
                margin-bottom: 16px;
            }
            span:nth-child(2) {
                margin-left: 30px;
            }
        }
    }
}

.cur {
    background-color: #EB2F30 !important;
    color: #fff;
    border: 1px solid #EB2F30 !important;
}

</style>
