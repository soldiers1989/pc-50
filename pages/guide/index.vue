<template>
    <div>
        <div class="new-guide">
            <div class="new-guide-banner">
                <a :href="headerImgInfo[0] && headerImgInfo[0]['url']">
                    <img :src="headerImgInfo[0] && headerImgInfo[0]['picUrl']" alt="新手指引" width="1200" />
                </a>
            </div>
            <div class="left_line"></div>
            <div class="new-guide-step_sec">
                <div class="new-guide-step">
                    <div class="new-guide-step-title">第一步：注册登录</div>
                    <span></span>
                </div>
                <div class="new-guide-step-img">
                    <a :href="imgGroup[0] && imgGroup[0]['url']"><img :src="imgGroup[0] && imgGroup[0]['picUrl']" /></a>
                </div>
            </div>
            <div class="new-guide-step_sec">
                <div class="new-guide-step">
                    <div class="new-guide-step-title margin_top_40">第二步：实名认证</div>
                    <span></span>
                </div>
                <div class="new-guide-step-img">
                    <a :href="imgGroup[1] && imgGroup[1]['url']"><img :src="imgGroup[1] && imgGroup[1]['picUrl']"/></a>
                </div>
            </div>
            <div class="new-guide-step_sec">
                <div class="new-guide-step">
                    <div class="new-guide-step-title margin_top_30">第三步：绑定银行卡</div>
                    <span></span>
                </div>
                <div class="new-guide-step-img">
                    <a :href="imgGroup[2] && imgGroup[2]['url']"><img :src="imgGroup[2] && imgGroup[2]['picUrl']"/></a>
                </div>
            </div>
            <div class="new-guide-step_sec">
                <div class="new-guide-step">
                    <div class="new-guide-step-title margin_top_20">第四步：账户充值</div>
                    <span></span>
                </div>
                <div class="new-guide-step-img">
                    <a :href="imgGroup[3] && imgGroup[3]['url']"><img :src="imgGroup[3] && imgGroup[3]['picUrl']"/></a>
                </div>
            </div>
            <div class="new-guide-step_sec">
                <div class="new-guide-step">
                    <div class="new-guide-step-title margin_top_20">第五步：买卖交易</div>
                    <span></span>
                </div>
                <div class="new-guide-step-img">
                    <a :href="imgGroup[4] && imgGroup[4]['url']"><img :src="imgGroup[4] && imgGroup[4]['picUrl']" /></a>
                </div>
            </div>
            <div class="new-guide-step_sec">
                <div class="new-guide-step">
                    <div class="new-guide-step-title margin_top_20">第六步：盈利提现</div>
                    <span></span>
                </div>
                <div class="new-guide-step-img">
                    <a :href="imgGroup[5] && imgGroup[5]['url']"><img :src="imgGroup[5] && imgGroup[5]['picUrl']"/></a>
                </div>
            </div>
            <div class="new-guide-end">
                <a :href="footerImgInfo[0] && footerImgInfo[0]['url']">
                    <img :src="footerImgInfo[0] && footerImgInfo[0]['picUrl']" width="1200" />
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { getItem } from "~/plugins/tool";
export default {
    data() {
        return {
            platform_name: "",
            headerImgInfo: [],
            footerImgInfo: [],
            imgGroup: []
        };
    },
    methods: {
        updateIndexData () {
            let indexData = getItem("indexData")
            if (indexData) {
                this.platform_name = indexData.platform_name
                this.headerImgInfo = indexData.others[21] || this.headerImgInfo
                this.footerImgInfo = indexData.others[23] || this.footerImgInfo
                this.imgGroup = indexData.others[22] || this.imgGroup
            }
        }
    },
    mounted() {
        this.updateIndexData()
    }
}
</script>

<style scoped>
.new-guide {
    width: 1200px;
    margin: 0 auto;
    padding-top: 50px;
    text-align: left;
    background-color: #fff;
}

.new-guide-end {
    position: relative;
    margin-top: -50px;
}

.new-guide-end img {
  vertical-align: middle;
}

.left_line {
  width: 2px;
  height: 2600px;
  background:rgba(212,56,52,1);
  float: left;
  margin-left: 47px;
}

.new-guide-step_sec {
  display: flex;
}

.new-guide-step {
  padding-top: 96px;
}

.new-guide-step span {
  font-size: 14px;
  color: rgba(102,102,102,1);
  padding-left: 40px;
  padding-top: 10px;
  display: inline-block;
}

.new-guide-step-title {
  height: 48px;
  width: 272px;
  background: url(../../static/images/ribbon.png) no-repeat;
  line-height: 48px;
  font-size: 18px;
  color:rgba(255,255,255,1);
  padding-left: 40px;
}

.new-guide-step-img {
  padding-top: 50px;
  padding-left: 106px;
}

.new-guide-step-img  img {
    width: 565px;
}

.new-guide-step-img_5 {
  padding-top: 50px;
  padding-left: 70px;
}

.margin_top_40 {
  margin-top: 40px;
}

.margin_top_30 {
  margin-top: 30px;
}

.margin_top_20 {
  margin-top: 20px;
}
</style>
