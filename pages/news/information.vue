<template>
    <div>
        <ul class="main">
            <li v-for="(value, key) in data" :key="key" @click="showDetails(value.id)">
                <span>{{value.title}}</span>
                <span>{{value.created_time.split(' ')[0]}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import {getIndexArticles} from '~/api/common.js';
import { mapMutations } from 'vuex';

export default {
    data() {	
        return {
             data: []
        }
    },
    methods: {
        getArticles () {
            getIndexArticles().then((res) =>{
                if (res.status == 1) {
                    this.data = res.data[3]
                }
            })
        },
        showDetails (id) {
            this.$router.push('/news/' + id)
        }
    },
    mounted() {
        this.getArticles()
    },
}
</script>

<style scoped lang="less">
.main {
    li {
        width: 100%;
        padding: 10px;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
        margin-bottom: 20px;
        span {
            display: block;
            padding-top: 10px;
        }
    }
}
</style>