<template>
    <div>
        <div class="main wrap">
            <div class="select">
                <span v-for="(tab, index) in tabs" :class="{cur: iscur==index}" :key=index @click="iscur=index, tabChange('select' + (index + 1))">{{tab.name}}</span>
            </div>
            <component :is="tabView"></component>
        </div>
    </div>
</template>

<script>
import select1 from './information.vue';
import select2 from './notice.vue';

export default {
    data() {	
        return {
            tabView: 'select1',
            tabs: [{name: "行业资讯"}, {name: "平台公告"}],
            iscur: 0,
        }
    },
    components: {
        select1,
        select2
    },
    methods: {
        tabChange(tab) {
            this.tabView = tab
        },
    },
    mounted() {
        this.tabView = this.$route.query.tabView
        this.iscur = this.$route.query.iscur
    },
}
</script>

<style scoped lang="less">
.main {
    background-color: #fff;
    margin-top: 190px;
    margin-bottom: 50px;
    .select {
        border-top: 2px solid #303849;
        border-bottom: 1px solid #ddd;
        padding: 16px 0;
        margin-bottom: 20px;
        span {
            cursor: pointer;
            padding: 0 20px;
        }
    }
}

.cur {
    color: #317fac ;
}
</style>