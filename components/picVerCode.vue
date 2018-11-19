<template>
  <div>
    <el-col :span="12">
        <el-input v-model="captchaCode" placeholder="请输入图形验证码"></el-input>
    </el-col>
    <el-col :span="1">&nbsp;</el-col>
    <el-col :span="11" class="colImg">
        <img :src="capData" @click="getCaptcha">
    </el-col>
  </div>
</template>

<script type="text/ecmascript-6">
import {requestRegister, createCaptcha, getRegisterSms} from '~/api/personal.js';
import {bus} from '~/plugins/bus.js';
    export default {
        data () {
            return {
                captchaId: '',
                capData: '',
                captchaCode: ''
            }
        },
        methods: {
            getCaptcha() {
                let _this = this
                this.captchaId = new Date().getTime() + parseInt(Math.random() * 10000)
                createCaptcha({"captchaId": this.captchaId}).then((res) => {
                _this.capData = res.data
                })
                this.$emit('getcaptchaid', this.captchaId)
                this.$emit('getcaptdata', this.capData)
            },
            clearInput() {
                this.captchaCode = ""
                this.getCaptcha()
            }
        },
        created() {
            bus.$on('clearPicCode', () => {
                this.captchaCode = ''
                this.getCaptcha()
            })
        },
        mounted() {
            this.getCaptcha()
        },
        watch: {
            captchaCode (newVal, oldVal) {
                this.captchaCode = newVal
                this.$emit('getcaptcode', this.captchaCode)
            }
        }
    }
</script>

<style scoped lang="less">
.colImg {
    img {
        width: 100%;
        height: 100%;
    }
}
</style>

