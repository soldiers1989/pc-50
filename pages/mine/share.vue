<template>
    <div>
        <div class="main">
            <p class="title">分享赚钱</p>
            <div class="main-body">
                <div class="bg">
                    <img src="~static/images/img_invite.png">
                </div>
                <p class="inviteCode">{{recCode}}</p>
                <p class="inviteTip">专属推荐码</p>
                <div class="dash"></div>
                <div class="inviteQr">
                    <img :src="code">
                </div>
                <p class="inviteTip2">专属推荐二维码</p>
                <div class="record">邀请记录</div>
                <div class="end">
                    <ul>
                        <li>注册时间</li>
                        <li v-for="(value, key) in userData" :key=key>{{value.registerTime}}</li>
                    </ul>
                    <ul>
                        <li>手机号码</li>
                        <li v-for="(value, key) in userData" :key=key>{{value.cellphone}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getShareCount} from '~/api/personal';
export default {
    data() {
        return {
            code: '',
            recCode: '',
            userData: [],
        }
    },
    methods: {
        getShare() {
            let _this = this
            getShareCount({}).then((res) =>　{
                if (res.status == 1) {
                    _this.code = res.data.bar_code
                    _this.recCode = res.data.recCode
                    _this.userData = res.data.promotionUsers
                    console.log(res.data.promotionUsers)
                    for (let value of _this.userData) {
                        value.registerTime = value.registerTime.split(' ')[0]
                    }
                }
            })
        }
    },
    mounted() {
        this.getShare()
    }
}
</script>

<style scoped lang="less">
@import url(~assets/less/share.less);
</style>
