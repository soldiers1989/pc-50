<template>
    <div slot="select2">
        <div class="from">
            <el-form :model="ruleForm"  ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
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
                <el-form-item label="推荐码" prop="recCode">
                    <el-input type="text" v-model="ruleForm.recCode" auto-complete="off" placeholder="请输入推荐码"></el-input>
                </el-form-item>
                <el-form-item label="注册密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="请输入注册密码" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div align="center" class="login">
            <button @click="submitForm('ruleForm')" :disabled="isSubmitting">注册</button>
        </div>
        <div class="protocol">
            <input type="checkbox" class="protocol-check" v-model="item.state" @click="alocked(item)">
            <span class="tips">我已阅读并同意</span>
            <a href="javascript:;" @click="protocol">《服务协议》</a>
        </div>
    </div>
</template>

<script>
    import {requestRegister, createCaptcha, getRegisterSms, getcaptdata} from '~/api/personal.js';
     import {getUserInfo} from '~/api/ajax.js';
    import {successMsg, errorMsg, validLogin, loadingOpen} from "~/plugins/tool.js";
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
                    recCode: ''
                },
                password: '',
                item: {
                    state: true
                },
                smsCallback: getRegisterSms,
                rules: {
                    cellphone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[35678]|18[0-9]|14[57])[0-9]{8}$/, message: '请输入正确的手机号', trigger: 'blur'}
                    ],
                    captchaCode: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                        {pattern: /^\d+$/, message: '请输入正确的验证码', trigger: 'blur'}

                    ],
                    phoneCode: [
                        {required: true, message: '请输入短信验证码', trigger: 'blur'},
                        {pattern: /^\d+$/, message: '请输入正确的短信验证码', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 20, message: '不小于6个字母数字或符号', trigger: 'blur'},
                        {pattern: /^[0-9a-zA-Z_#]{6,20}$/, message: '密码由6-20位数字字母或符号组成', trigger: 'blur'}
                    ],
                    recCode: [
                        {required: true, message: '请输入推荐码', trigger: 'blur'}
                    ]
                },
            }
        },
        computed: {
            ...mapState(['isSubmitting'])
        },
        methods: {
            ...mapMutations(['changeSubmitting', 'isShowJoinReg', 'isShowJoin', 'routerTo', 'isShowJoint']),
            getcaptCode(obj) {
                this.ruleForm.captchaCode = obj
            },
            getcaptData(obj) {
                this.captchaData = obj
            },
            getcaptId(obj) {
                this.ruleForm.captchaId = obj
            },
            alocked(item) {
                item.state = !item.state
            },
            submitForm(formName) {
                let _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (!this.item.state) {
                            errorMsg('请阅读并同意服务协议')
                            return false
                        }
                        this.changeSubmitting()
                        this.password = crypt.encrypt(this.ruleForm.password)
                        requestRegister({
                            cellphone: this.ruleForm.cellphone,
                            captchaCode: this.ruleForm.captchaCode,
                            captchaId: this.ruleForm.captchaId,
                            phoneCode: this.ruleForm.phoneCode,
                            password: this.password,
                            recCode: this.ruleForm.recCode
                        })
                        .then((res) => {
                            if (res.status == 1) {
                                _this.isShowJoin()
                                _this.isShowJoinReg()
                                this.$alert('注册成功，请登录', '提示', {
                                confirmButtonText: '确定',
                                type: 'success',
                                callback: action => {
                                        _this.isShowJoin()
                                        _this.isShowJoinReg()
                                        _this.isShowJoint()
                                    }
                                });
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
            protocol() {
                this.$router.push({name: 'protocol'})
                this.isShowJoin()
                this.isShowJoinReg()
            },
            resetForm (ruleForm) {
                this.$refs[ruleForm].resetFields()
            },
        }
    }
</script>

<style lang="less" scoped>
@import url(~assets/less/reset.less);
.from {
    margin: 60px 120px 0 80px;

}
.forgetPwd {
    margin: 14px 120px 40px 0;
    text-align: right;
    cursor: pointer;
}
.login {
    padding-bottom: 13px;
    margin-top: 15px;
    button {
        width: 260px;
        height: 45px;
        line-height: 45px;
        background:rgba(235,47,48,1);
        border-radius: 23px;
        box-shadow: 5px 0px 8px rgba(235,47,48,0.3);
        border: none;
        color: @fff;
        font-size: 16px;
        outline: none;
        cursor: pointer;
    }
}
.protocol {
    padding-bottom: 120px;
    text-align: center;
    a {
        color: #EB2F30;
    }
}

</style>
