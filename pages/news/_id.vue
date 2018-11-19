<template>
    <div>
        <div class="main wrap">
            <div class="main-body">
                <h2>{{newsData.title}}</h2>
                <div v-html="newsData.content"></div>
                <ul>
                    <li>上一篇 &nbsp;&nbsp;&nbsp;<a href="javascript:;" @click="changeContent(1)">{{last.title}}</a></li>
                    <li>下一篇 &nbsp;&nbsp;&nbsp;<a href="javascript:;" @click="changeContent(2)">{{next.title}}</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {getArticle} from '~/api/common';
import {successMsg, errorMsg} from '~/plugins/tool';
export default {
    data: function() {	
        return {
            id: '',
            newsData: {},
            last: '',
            next: '',
            last_id: '',
            next_id: ''
        }
    },
    methods: {
        update() {
            let _this = this
            getArticle({id: this.id}).then((res) => {
                if (res.status == 1) {
                    _this.newsData = res.data
                    if (res.data.last != null) {
                        _this.last = res.data.last
                        _this.last_id = res.data.last.id
                    } else {
                        this.last = {
                            title: '没有上一篇'
                        }
                    }
                    if (res.data.next != null) {
                        _this.next = res.data.next
                        _this.next_id = res.data.next.id
                    } else {
                        this.next = {
                            title: '没有下一篇'
                        }
                    }
                }
            })
        },
        changeContent(type) {
            type == 1 ? this.id = this.last_id : this.id = this.next_id
            if (this.id == '') {
                errorMsg('已经没有更多了')
                return false
            }
            this.$router.push('/news/' + this.id)
            this.update()
            scrollTo(0, 0)            
        }
    },
    mounted() {
        this.id = this.$route.params.id
        this.update()
    },
}
</script>

<style scoped lang="less">
.main {
    background-color: #fff;
    margin-top: 190px;
    margin-bottom: 50px;
    .main-body {
        padding: 40px 30px 50px;
        line-height: 2em;
        h2 {
            text-align: center;
            padding-bottom: 10px;
        }
        ul {
            height: 80px;
            padding-top: 15px;
            li {
                height: 40px;
                line-height: 40px;
                a {
                    color: #000;
                    text-decoration: underline;
                    outline: none;
                }
            }
        }
    }
    
        
}
</style>