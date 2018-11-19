<template>
    <div>
        <Swiper />
        <Peculiarity />
        <Download />
        <Structure />
        <div class="talk">
            <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=644605496&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:644605496:53" alt="点击这里给我发消息" title="点击这里给我发消息"/></a>
        </div>
    </div>
</template>

<script>
import {requestLogin} from "../api/personal";
import {getUserInfo} from "../api/ajax";
import {setItem, successMsg} from "../plugins/tool";
import Swiper from '~/components/Swiper.vue';
import Peculiarity from '~/components/Peculiarity.vue';
import Download from '~/components/Download.vue';
import Structure from '~/components/Structure.vue';
export default {
    components: {
        Swiper,
        Peculiarity,
        Download,
        Structure
    },
    data() {
        return {
            
        }
    },
    methods: {

    },
    mounted() {
    }
}
</script>

<style lang="less" scoped>
.talk {
    position: fixed;
    right: 80px;
    bottom: 200px;
    z-index: 999;
}
</style>
