<template>
    <div>
         <div id="modal" class="modal" v-if="showJoin">
            <div class="modal-content">
                <div class="modal-header">
                    <img src="~static/images/icon_close.png" @click="cancel">
                </div>
                <div class="modal-body">
                    <div class="select">
                        <span v-for="(tab, index) in tabs" :class="{cur: iscur==index}" :key=index @click="iscur=index, tabChange('select' + (index + 1))">{{tab.name}}</span>
                    </div>
                    <component :is="tabView"></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import select1 from './loginForm';
import select2 from './register';
import {mapState, mapMutations} from 'vuex';
export default {
    components: {
        select1,
        select2
    },
    data() {	
        return {
            tabView: 'select1',
            tabs: [{name: "登录"}, {name: "注册"}],
            iscur: 0
        }
    },
    computed: {
        ...mapState(['showJoin'])
    },
    methods: {
        ...mapMutations(['isShowJoin']),
        tabChange(tab) {
            this.tabView = tab
        },
        cancel() {
            this.isShowJoin()
            this.tabView = "select1",
            this.iscur = 0
        }
    }  
}
</script>

<style lang="less" scoped>
@import url(~assets/less/reset.less);
@import url(~assets/less/modal.less);
</style>