<template>
    <div>
        <div class="news">
            <div class="news-left">
                <ul>
                    <li><span>行业资讯</span><span @click="more1">更多>></span></li>
                    <li v-for="(value, key) in data" :key="key" @click="showDetails(value.id)">
                        <span>{{value.title}}</span>
                        <span>{{value.created_time.split(' ')[0]}}</span>
                    </li>
                </ul>
            </div>
            <div class="news-right">
                <ul>
                    <li><span>公告</span><span @click="more2">更多>></span></li>
                    <li v-for="(value, key) in newsData" :key="key" @click="showDetails(value.id)">
                        <span>{{value.title}}</span>
                        <span>{{value.created_time.split(' ')[0]}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {getIndexArticles} from '~/api/common.js';
import { mapMutations } from 'vuex';
export default {
    data() {	
        return {
            newsData: [],
            data: []
        }
    },
    methods: {
        ...mapMutations(['routerTo']),
        getArticles () {
            getIndexArticles().then((res) =>{
                if (res.status == 1) {
                    this.newsData = res.data[2]
                    this.data = res.data[3]
                }
            })
        },
        showDetails (id) {
            this.$router.push('/news/' + id)
        },
        more1() {
            this.$router.push({name: 'news-newsList', query:{tabView: 'select1', iscur: 0}})
        },
        more2() {
            this.$router.push({name: 'news-newsList', query:{tabView: 'select2', iscur: 1}})
        }
    },
    mounted() {
        this.getArticles()
    },
}
</script>

<style scoped lang="less">
.news {
    display: flex;
    flex-direction: row;
    .news-left, .news-right {
        width: 500px;
        margin-right: 80px;
        max-height: 200px;
        overflow: hidden;
        ul {
            li {
                display: flex;
                justify-content: space-between;
                span:nth-child(1) {
                    font-size: 14px;
                    color:rgba(102,102,102,1);
                    line-height: 28px;
                    cursor: pointer;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: 400px;

                }
                span:nth-child(2) {
                    cursor: pointer;
                    font-size: 14px;
                    line-height: 28px;
                    color: rgba(102,102,102,1);
                    cursor: pointer;
                }
            }
            li:nth-child(1) {
                margin-bottom: 6px;
                span:nth-child(1) {
                    font-size: 20px;
                    line-height: 31px;
                    cursor: default;
                    font-weight: 600;
                }
                span:nth-child(2) {
                   cursor: pointer;
                }
            }
        }
    }
    .news-right {
        margin-right: 0px;  
    }
}
</style>