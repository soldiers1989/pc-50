<template>
    <div class="footer_page">
        <div class="footer_content">
            <div class="footer_content-content">
                <dl>
                    <dt>平台相关</dt>
                    <dd><nuxt-link :to="{name: 'about'}">关于我们</nuxt-link></dd>
                    <dd><nuxt-link :to="{name: 'about'}">加入我们</nuxt-link></dd>
                    <dd><nuxt-link :to="{name: 'about'}">联系我们</nuxt-link></dd>
                    <!-- <dd>安全保障</dd> -->
                </dl>
                <dl>
                    <dt>帮助中心</dt>
                    <dd><nuxt-link :to="{name: 'guide'}">新手指引</nuxt-link></dd>
                    <!-- <dd>在线客服</dd> -->
                    <!-- <dd>APP下载</dd> -->
                </dl>
                <dl>
                    <dt>产品中心</dt>
                    <dd><nuxt-link :to="{name: 'market'}">实时行情</nuxt-link></dd>

                    <dd @click="validate1">买卖交易</dd>
                    <dd @click="validate2">个人中心</dd>
                </dl>
                <div>
                    <span>关注微信公众号</span>
                    <div><img :src="cust_qr" alt="这是一张二维码"></div>
                </div>
                <dl>
                    <dt>风险提示</dt>
                    <dd class="default">保护投资者利益是中国证监会工作的重中之重。
                        我们提醒您： 股市有风险，投资需谨慎！
                        市场风险莫测，务请谨慎行事！</dd>
                </dl>
                <dl>
                    <dt>客服热线</dt>
                    <dd class="default">{{phone}}</dd>
                    <dd class="default">周一至周五9:00-18:00</dd>
                </dl>
            </div>
            <hr style="border: 1px solid #404040">
            <div class="footer_link">
                <ul>
                    <li>友情链接：</li>
                    <li><a href="javascript:;">上海证券交易所</a></li>
                    <li><a href="javascript:;">东方财富网</a></li>
                    <li><a href="javascript:;">50ETF</a></li>
                    <li><a href="javascript:;">光大证券</a></li>
                    <li><a href="javascript:;">银生宝</a></li>
                </ul>
            </div>
        </div>
        <div class="footer_copyright">
            {{copyright}}
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import {successMsg, errorMsg, getItem} from '~/plugins/tool';
    import {getUserInfo, TOKEN_OBJ_ID, fetchToken} from '~/api/ajax.js';
    import {bus} from "~/plugins/bus";

    export default {
        data () {
            return {
                cust_qr: '',
                copyright: '',
                phone: ''
            }
        },
        methods: {
            ...mapMutations(['routerTo', 'isShowJoint']),
            getIndexData() {
                let indexData = getItem("indexData")
                if (indexData) {
                    this.cust_qr = indexData.public_qr
                    this.copyright = indexData.copyright
                    this.phone = indexData.service_phone
                }
            },
            validate1() {
                if (!fetchToken()) {
                    this.isShowJoint()
                } else {
                this.routerTo('/trade/buy')
                }
            },
            validate2() {
                if (!fetchToken()) {
                    this.isShowJoint()
                } else {
                    this.$router.push({name: 'mine-account', query:{tabView: 'select1', iscur: 0}})
                }
            }
        },
        mounted () {
            this.getIndexData()
            bus.$on('updateIndexData', () => {
                this.getIndexData()
            })
        }
    }
</script>

<style lang="less" scoped>

@import url(~assets/less/footer.less);
</style>

