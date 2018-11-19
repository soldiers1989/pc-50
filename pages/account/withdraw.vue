<template>
    <div slot="select2">
        <div class="main">
            <div class="form">
                <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="账户余额">
                        <p class="balance">{{account.canExtract}}</p>
                    </el-form-item>
                    <el-form-item label="提现金额" prop="cash_amount">
                        <el-input type="text" v-model="ruleForm.cash_amount" auto-complete="off" placeholder="请输入提现金额"></el-input>
                    </el-form-item>
                     <el-form-item label="到账银行卡" prop="bank_name">
                        <el-select v-model="ruleForm.bank_name" placeholder="请选择银行">
                            <el-option
                                v-for="item in bankList"
                                :key="item.id"
                                :label="item.bank_card"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="提现密码 " prop="withdraw_pw">
                        <el-input type="password" v-model="ruleForm.withdraw_pw" auto-complete="off" placeholder="请输入提现密码"></el-input>
                    </el-form-item>
                </el-form>
                <p>提现请在工作日9:00-16:00内申请，T+1个工作日内到账。</p>
                <p>提现手续费单笔最少5元</p>
                <div align="center" class="login">
                    <button @click="submitForm('ruleForm')" :disabled="isSubmitting">提现</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getAccountCount, withdraw} from '~/api/personal.js';
import {getUserInfo} from '~/api/ajax.js';
import {successMsg, errorMsg, getItem, checkRealName} from "~/plugins/tool.js";
import {mapState, mapMutations} from 'vuex';

const JSEncrypt = require('node-jsencrypt');
const crypt = new JSEncrypt();
let public_key = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8yY4yneut770arIb+hhuwPbV4
qP75ZtfSZmEMK64pldpcGeCbp4uFaOqwXMy7cszsYnD9YnMJLN82zt2ttOU9APcC
HWS1Qi72AkxnyROTIICYU0oi+I+5elogPgkOxKyi2bWb6pR9IkDR3EYmYear0biw
D0DJ3ztdzWa+W1IbOQIDAQAB`;
crypt.setKey(public_key);

export default {
    data() {
        var validate = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入提现金额'))
            } else if (Number(value) >= Number(this.account.canExtract)) {
                callback(new Error('账户余额不足，无法提现'))
            } else {
                callback()
            }
        }
        return {
            labelPosition: 'right',
            ruleForm: {
                bank_name: '',
                cash_amount: '',
                withdraw_pw: ''

            },
            bankList: [],
            userInfo:{},
            indexData: {},
            account: {
                canExtract: ''
            },
            password: '',
            rules: {
                bank_name: [
                    {required: true, message: '请选择银行', trigger: 'blur'}
                ],
                cash_amount: [
                    {required: true, validator: validate, trigger: 'blur' },
                    {pattern: /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/, message: '请输入正确的金额', trigger: 'blur'}
                ],
                withdraw_pw: [
                    {required: true, message: '请输入提现密码', trigger: 'blur'}
                ]
            },
        }
    },
    computed: {
        ...mapState(['isSubmitting'])
    },
    methods: {
        ...mapMutations(['changeSubmitting', 'routerTo']),
        getAccount() {
            getAccountCount({}).then(res => {
                if (res.status == 1) {
                    this.account = res.data
                }
            })
        },
        getUserData() {
            this.userInfo = getItem('userInfo')
            this.indexData = getItem('indexData')
            this.bankList = this.userInfo.bankCards
        },
        // validName() {
        //     if(!checkRealName()) {
        //         // this.$confirm('您还未实名认证，请先实名认证再绑卡', '提示', {
        //         //     confirmButtonText: '确定',
        //         //     cancelButtonText: '取消',
        //         //     type: 'warning'
        //         // }).then(() => {
        //         //     this.routerTo('/mine/realName')
        //         // }).catch(() => {
        //         // });
        //         errorMsg('您还未实名认证，请先实名认证再绑卡')
        //     }
        // },
        // validCard() {
        //     if(this.userInfo.bankCards.length == 0) {
        //         // this.$confirm('您还未绑定银行卡，请先绑定银行卡', '提示', {
        //         //     confirmButtonText: '确定',
        //         //     cancelButtonText: '取消',
        //         //     type: 'warning'
        //         // }).then(() => {
        //         //     this.routerTo('/mine/bindCard')
        //         // }).catch(() => {
        //         // });
        //         errorMsg('您还未绑定银行卡，请先绑定银行卡')
        //     }
        // },
        submitForm(formName) {
            let _this = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.changeSubmitting()
                    this.password = crypt.encrypt(this.ruleForm.withdraw_pw)
                    withdraw({
                        cash_amount: this.ruleForm.cash_amount,
                        withdraw_pw: this.password,
                        bankcard_id: this.ruleForm.bank_name
                    })
                    .then((res) => {
                        if (res.status == 1) {
                            this.$alert('您的申请已提交成功！T+1工作日到账，实际以银行到账时间为准！', '提示', {
                                confirmButtonText: '确定',
                                type: 'success',
                                callback: action => {
                                    _this.init()
                                }
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
        init() {
            this.ruleForm = {
                bank_name: '',
                cash_amount: '',
                withdraw_pw: ''
            }
            this.getAccount()
        }
    },
    mounted() {
        this.getAccount()
        this.getUserData()
    }
}

</script>

<style lang="less" scoped>
.main {
    width: 100%;
    padding-left: 35px;
    padding-top: 33px;
    .form {
        width: 400px;
        .login {
            padding-top: 31px;
            padding-bottom: 45px;
            button {
                width: 200px;
                height: 40px;
                line-height: 40px;
                background:rgba(235,47,48,1);
                border-radius: 20px;
                box-shadow: 5px 0px 8px rgba(235,47,48,0.3);
                border: none;
                color: #fff;
                font-size: 16px;
                outline: none;
                cursor: pointer;
            }
        }
        p {
            color: #999;
            font-size: 14px;
        }
        .balance {
            color: #000;
            font-size: 16px;
        }
    }
}

.el-select, .el-cascader {
    width: 100%;
}

</style>


