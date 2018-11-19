<template>
    <div>
         <div id="modal" class="modal" v-if="showForgetPwd">
            <div class="modal-content">
                <div class="modal-header">
                    <img src="~static/images/icon_close.png" @click="isShowForgetPwd">
                </div>
                <div class="modal-body">
                    <div class="select">忘记密码</div>
                    <div class="from">
                        <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="108px" class="demo-ruleForm">
                            <el-form-item label="手机号" prop="cellphone">
                                <el-input type="text" v-model="ruleForm.cellphone" auto-complete="off" placeholder="请输入手机号"></el-input>
                            </el-form-item>
                            <el-form-item label="图形验证码" prop="captchaCode">
                                <v-picvercode ref="childPicCode" @getcaptcode="getcaptCode" @getcaptdata="getcaptData" @getcaptchaid="getcaptId"></v-picvercode>
                            </el-form-item>
                            <el-form-item label="短信验证码" prop="phoneCode">
                                <el-col :span="12">
                                    <el-input v-model="ruleForm.phoneCode" placeholder="请输入短信验证码"></el-input>
                                </el-col>
                                <el-col :span="1">&nbsp;</el-col>
                                <el-col :span="11">
                                    <v-getvercode :formData="ruleForm" :requestCallback="smsCallback"></v-getvercode> 
                                </el-col>
                            </el-form-item>
                            <el-form-item label="重置登陆密码" prop="password">
                                <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="请输入新密码" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div align="center" class="login">
                        <button :disabled="isSubmitting" @click="submitForm('ruleForm')">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getBackPassword, createCaptcha, getGetBackSms} from '~/api/personal.js';
import {successMsg, errorMsg} from "~/plugins/tool.js";
import vGetvercode from '~/components/getVerCode.vue';
import vPicvercode from '~/components/picVerCode.vue';
import {mapState, mapMutations} from 'vuex';
const JSEncrypt = require('node-jsencrypt');
const crypt = new JSEncrypt();
let public_key = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8yY4yneut770arIb+hhuwPbV4
qP75ZtfSZmEMK64pldpcGeCbp4uFaOqwXMy7cszsYnD9YnMJLN82zt2ttOU9APcC
HWS1Qi72AkxnyROTIICYU0oi+I+5elogPgkOxKyi2bWb6pR9IkDR3EYmYear0biw
D0DJ3ztdzWa+W1IbOQIDAQAB`;
crypt.setKey(public_key);
export default {
    components: {
      vGetvercode, vPicvercode
    },
    data() {	
        return {
            labelPosition: 'right',
            ruleForm: {
                cellphone: '',
                captchaCode: '',
                captchaId: '',
                phoneCode: '',
                password: '',
            },
            password: '',
            rules: {
                cellphone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                captchaCode: [
                    {required: true, message: '请输入验证码', trigger: 'blur'}
                ],
                phoneCode: [
                    {required: true, message: '请输入手机验证码', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 6, max: 20, message: '不小于6个字母数字或符号', trigger: 'blur'},
                    {pattern: /^[0-9a-zA-Z_#]{6,20}$/, message: '密码由6-20位数字字母或符号组成', trigger: 'blur'}
                ]
            },
            smsCallback: getGetBackSms,
        }
    },
    computed: {
        ...mapState(['showForgetPwd', 'isSubmitting'])
    },
    methods: {
        ...mapMutations(['isShowForgetPwd', 'changeSubmitting']),
        getcaptCode(obj) {
            this.ruleForm.captchaCode = obj
        },
        getcaptData(obj) {
            this.captchaData = obj
        },
        getcaptId(obj) {
            this.ruleForm.captchaId = obj
        },
        submitForm (ruleForm) {
            this.$refs.ruleForm.validate((valid) => {
                let _this = this
                if (valid) {
                    this.changeSubmitting()
                    this.password = crypt.encrypt(this.ruleForm.password)
                    getBackPassword({
                        cellphone: this.ruleForm.cellphone,
                        phoneCode: this.ruleForm.phoneCode,
                        password: this.password
                    })
                    .then((res) => {
                        if (res.status == 1) {
                            successMsg("设置成功，请重新登录")
                            _this.isShowForgetPwd()
                        } else {
                            errorMsg(res.msg)
                        }
                    })
                    .then((res) => {
                        this.changeSubmitting()
                    })
                } else {
                        return false
                }
            })
        },
        resetForm (ruleForm) {
            this.$refs[ruleForm].resetFields()
        },
    } 
}
</script>

<style lang="less" scoped>
@import url(~assets/less/reset.less);
@import url(~assets/less/modalPwd.less);
</style>