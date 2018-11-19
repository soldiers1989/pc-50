<template>
    <div>
        <div class="wrap main cf">
            <ul class="main-left fl">
                <li v-for="(item, k) in articleList" :key=k @click="setHelpArticle(k)" :class="{hoverSelected: showFlag==k}">
                    <a href="javascript:;">{{item.name}}</a>
                </li>
            </ul>
            <div class="main-right fr">
                <div class="main-content" v-html="content"></div>
            </div>
        </div>
    </div>
</template>

<script>
import {errorMsg, getItem} from "~/plugins/tool.js";
import {getHelpArticles} from '~/api/personal.js';
export default {
    layout (context) {
        return 'default'
    },
    data() {
        return {
            showFlag: 1,
            articleList: [],
            content: "",
            tab: ''
        }
    },
    methods: {
        update() {
            this.getHelpArticles()
        },
        getHelpArticles() {
            this.articleList = getItem('article')
            if (this.articleList.length > 0) {
                this.setHelpArticle(0)
            }
        },
        setHelpArticle(index) {
            this.showFlag = index
            this.content = this.articleList[index].content
        }
    },
    mounted() {
        this.update()
    }
}
</script>

<style scoped lang="less">
.main {
    padding-top: 50px;
    .main-left {
        width: 180px;
        li {
            height: 50px;
            line-height: 50px;
            font-size: 18px;
            text-align: center;
            margin-bottom: 1px;
            background-color: #fff;
            a {
                color: #000;
            }
        }
    }
    .main-right {
        width: 1000px;
        min-height: 560px;
        background-color: #fff;
        padding-top: 40px;
        margin-bottom: 35px;
        .main-content {
            padding: 0 40px 40px;
        }
    }
}

.hoverSelected {
    background-color: #EB2F30 !important;
    a {
        color: #fff !important;
    }
}
</style>
