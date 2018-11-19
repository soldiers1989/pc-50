<template>
    <div slot="select1">
         <div class="from">
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="106px" class="demo-ruleForm">
                <el-form-item label="手机号" prop="cellphone">
                    <el-input type="text" v-model="ruleForm.cellphone" auto-complete="off"  disabled></el-input>
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
                    <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="请设置登陆密码"></el-input>
                </el-form-item>
            </el-form>
            <div align="center" class="login">
            <button @click="submitForm('ruleForm')" :disabled="isSubmitting">确定</button>
        </div>
        </div>
    </div>
</template>

<script>
import {updatePassword, getSms, logout} from '~/api/personal.js';
import {successMsg, errorMsg, getItem, setItem} from "~/plugins/tool.js";
import {TOKEN_OBJ_ID, fetchToken} from '~/api/ajax.js';
import {mapState, mapMutations} from 'vuex';
import vGetvercode from '~/components/getVerCode.vue';
import vPicvercode from '~/components/picVerCode.vue';
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
                captchaCode: '',
                captchaId: '',
                phoneCode: '',
                password: '',
            },
            password: '',
            rules: {
                captchaCode: [
                    {required: true, message: '请输入验证码', trigger: 'blur'},
                    {pattern: /^\d+$/, message: '请输入正确的验证码', trigger: 'blur'}
                ],
                phoneCode: [
                    {required: true, message: '请输入短信验证码', trigger: 'blur'},
                    {pattern: /^\d+$/, message: '请输入正确的短信验证码', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入新密码', trigger: 'blur'},
                    {min: 6, max: 20, message: '不小于6个字母数字或符号', trigger: 'blur'},
                    {pattern: /^[0-9a-zA-Z_#]{6,20}$/, message: '密码由6-20位数字字母或符号组成', trigger: 'blur'}
                ]
            },
            smsCallback: getSms,
        }
    },
    components: {
        vGetvercode,
        vPicvercode
    },
    computed: {
        ...mapState(['isSubmitting'])
    },
    methods: {
        ...mapMutations(['changeSubmitting']),
        getcaptCode(obj) {
            this.ruleForm.captchaCode = obj
        },
        getcaptData(obj) {
            this.captchaData = obj
        },
        getcaptId(obj) {
            this.ruleForm.captchaId = obj
        },
        submitForm(formName) {
            let _this = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.changeSubmitting()
                    this.password = crypt.encrypt(this.ruleForm.password)
                    updatePassword({
                        phoneCode: this.ruleForm.phoneCode,
                        password: this.password
                    })
                    .then((res) => {
                        if (res.status == 1) {
                            successMsg("修改成功，请重新登录")
                            _this.logout()
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
        logout() {
            logout()
            setItem("userInfo", "")
            setItem(TOKEN_OBJ_ID, "")
            this.$router.push({path: "/"})
        },
    },
    mounted() {
        let userInfo = getItem("userInfo")
        this.ruleForm.cellphone = userInfo.cellphone
    }
}
</script>

<style lang="less" scoped>
.from {
    width: 400px;
    margin-left: 34px;
    margin-top: 28px;
    .login {
        padding-top: 28px;
        button {
            width: 260px;
            height: 45px;
            line-height: 45px;
            background:rgba(235,47,48,1);
            border-radius: 23px;
            box-shadow: 5px 0px 8px rgba(235,47,48,0.3);
            border: none;
            color: #fff;
            font-size: 16px;
            outline: none;
            cursor: pointer;
        }
    }
}
</style>

