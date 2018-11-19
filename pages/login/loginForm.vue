<template>
    <div slot="select1">
        <div class="from">
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                <el-form-item label="手机号" prop="cellphone">
                    <el-input type="text" v-model="ruleForm.cellphone" auto-complete="off" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="请输入密码" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <p class="forgetPwd" @click="isShowForgetPwd">忘记密码？</p>
        <div align="center" class="login">
            <button @click="submitForm('ruleForm')" :disabled="isSubmitting">登录</button>
        </div>
        <ForgetPwd />
    </div>
</template>

<script>
    import {requestLogin} from '~/api/personal.js';
    import {getUserInfo, setLoginInfo} from '~/api/ajax.js';
    import {bus} from '~/plugins/bus.js';
    import {setItem, validLogin, successMsg, errorMsg, getItem, loadingOpen, loadingClose} from '~/plugins/tool.js';
    import {mapState, mapMutations} from 'vuex';
    import ForgetPwd from './forgetPwd.vue'
    const JSEncrypt = require('node-jsencrypt');
    const crypt = new JSEncrypt();
    let public_key = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8yY4yneut770arIb+hhuwPbV4
    qP75ZtfSZmEMK64pldpcGeCbp4uFaOqwXMy7cszsYnD9YnMJLN82zt2ttOU9APcC
    HWS1Qi72AkxnyROTIICYU0oi+I+5elogPgkOxKyi2bWb6pR9IkDR3EYmYear0biw
    D0DJ3ztdzWa+W1IbOQIDAQAB`;
    crypt.setKey(public_key);
    export default {
        data() {
            return {
                labelPosition: 'right',
                ruleForm: {
                    cellphone: '',
                    password: ''
                },
                password: '',
                rules: {
                    cellphone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[35678]|18[0-9]|14[57])[0-9]{8}$/, message: '请输入正确的手机号', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不正确', trigger: 'change'}
                    ]
                },
                loginFlag: true

            }
        },
        components: {
            ForgetPwd
        },
        computed: {
            ...mapState(['isSubmitting'])
        },
        methods: {
            ...mapMutations(['changeSubmitting', 'isShowForgetPwd', 'isShowJoin','isShowJoinReg', 'isShowJoint', 'routerTo', 'upUserInfo']),
            submitForm(formName) {
                let _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.changeSubmitting()
                        this.password = crypt.encrypt(this.ruleForm.password)
                        requestLogin({username: this.ruleForm.cellphone, password: this.password})
                        .then((res) => {
                            if (res.status == 1) {
                                setLoginInfo(res.data)
                                bus.$emit('send', _this.loginFlag)
                                getUserInfo().then((res) => {
                                    _this.isShowJoin()
                                    _this.isShowJoinReg()
                                    _this.upUserInfo()
                                })
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
        },
        mounted() {
            let access_token = this.$route.query.access_token
            if (access_token) {
                setLoginInfo({'access_token': access_token})
                getUserInfo().then(res => {
                    if (validLogin()) {
                        this.$router.push({path: "/"})
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
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
    padding-bottom: 133px;
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
</style>
