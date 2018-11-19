<template>
    <div>
        <div class="main">
            <p class="title">资金流水</p>
            <div class="main-body">
                <div class="select">
                    <span v-for="(tab, index) in tabs" :class="{cur: iscur==index}" :key=index @click="iscur=index, tabChange('select' + (index + 1))">{{tab.name}}</span>
                </div>
                <component :is="tabView"></component>
            </div>
        </div>
    </div>
</template>

<script>
import select1 from '~/pages/flow/all.vue';
import select2 from '~/pages/flow/recharge.vue';
import select3 from '~/pages/flow/withdraw.vue';
import select4 from '~/pages/flow/transaction.vue';
import select5 from '~/pages/flow/deferred.vue';
import select6 from '~/pages/flow/extension.vue';
export default {
    data() {	
        return {
            tabView: 'select1',
            tabs: [{name: "全部"}, {name: "充值明细"}, {name: "提现明细"}, {name: '交易明细'}, {name: '递延费'}, {name: '推广收益'}],
            iscur: 0
        }
    },
    components: {
        select1,
        select2,
        select3,
        select4,
        select5,
        select6
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
    // height: 627px;
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
        .select {
            span {
                width: 100px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                display: inline-block;
                cursor: pointer;
            }
        }
    }
}

.cur {
    background-color: #EB2F30 !important;
    color: #fff;
}

</style>