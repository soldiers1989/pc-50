<template>
    <div>
        <div class="main">
            <p class="title">绑定银行卡</p>
            <div class="main-body">
                <div class="from">
                    <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="106px" class="demo-ruleForm">
                        <el-form-item label="开户名" prop="cellphone">
                            <el-input type="text" v-model="userInfo.real_name" auto-complete="off"  disabled></el-input>
                        </el-form-item>
                        <el-form-item label="银行名称" prop="bankName">
                            <el-select v-model="ruleForm.bankName" placeholder="请选择银行">
                                <el-option
                                    v-for="item in bankList"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                         <el-form-item label="开户所在地区" prop="open_province">
                            <el-cascader
                                :options="options"
                                v-model="selectedOptions"
                                @change="handleChange"
                                :separator="' '"
                            >
                            </el-cascader>
                        </el-form-item>
                         <el-form-item label="开户行信息" prop="openBank">
                            <el-input type="text" v-model="ruleForm.openBank" auto-complete="off"  ></el-input>
                        </el-form-item>
                         <el-form-item label="银行卡号" prop="bankCard">
                            <el-input type="text" v-model="ruleForm.bankCard" auto-complete="off"  ></el-input>
                        </el-form-item>
                         <el-form-item label="重复银行卡号" prop="repeatBankCard">
                            <el-input type="text" v-model="ruleForm.repeatBankCard" auto-complete="off"  ></el-input>
                        </el-form-item>
                    </el-form>
                    <div align="center" class="login">
                        <button @click="submitForm('ruleForm')" :disabled="isSubmitting">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {createBankCard} from '~/api/personal.js';
import {getUserInfo} from '~/api/ajax.js';
import {successMsg, errorMsg, getItem} from "~/plugins/tool.js";
import {mapState, mapMutations} from 'vuex';
import options from '~/plugins/country-data.js';

export default {
    data() {
        var validateRepeatBankCard = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入银行卡号'));
            } else if (value !== this.ruleForm.bankCard) {
                callback(new Error('两次输入卡号不一致!'));
            } else {
                callback();
            }
        }
        return {
            labelPosition: 'right',
            ruleForm: {
                bankName: '',
                openBank: '',
                bankCard: '',
                repeatBankCard: '',
                open_province: '',
                open_district: ''
            },
            userInfo: {},
            bankList: [],
            selectedOptions: [],        // 存放默认值
            options: options,           // 存放城市数据
            rules: {
                bankName: [
                    {required: true, message: '请选择银行', trigger: 'blur'}
                ],
                open_province: [
                    {required: true, message: '请选择开户所在地区', trigger: 'blur'}
                ],
                openBank: [
                    {required: true, message: '请输入开户行信息', trigger: 'blur'}
                ],
                bankCard: [
                    {required: true, message: '请输入银行卡号', trigger: 'blur'},
                    {min: 16, message: '请正确输入银行卡号', trigger: 'blur'},
                ],
                repeatBankCard: [
                    {required: true, validator: validateRepeatBankCard, trigger: 'blur' }
                ]
            },
        }
    },
    computed: {
        ...mapState(['isSubmitting'])
    },
    methods: {
        ...mapMutations(['changeSubmitting']),
        handleChange(value) {
            this.ruleForm.open_province = value[1]
            this.ruleForm.open_district = value[2]
        },
        getUserData() {
            this.userInfo = getItem('userInfo')
            this.indexData = getItem('indexData')
            this.bankList = JSON.parse(this.indexData.permissionBank)
        },
        submitForm(formName) {
            let _this = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.changeSubmitting()
                    createBankCard({
                        bank_name: this.ruleForm.bankName,
                        open_bank: this.ruleForm.openBank,
                        bank_card: this.ruleForm.bankCard,
                        repeatBankCard: this.ruleForm.repeatBankCard,
                        open_province: this.ruleForm.open_province,
                        open_district: this.ruleForm.open_district
                    })
                    .then((res) => {
                        if (res.status == 1) {
                            successMsg("绑定成功")
                            getUserInfo().then((res) => {
                                _this.$router.push('/mine/bankCard')
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
        }
    },
    mounted() {
        this.getUserData()
    },
}
</script>

<style scoped lang="less">
.main {
    background-color: #fff;
    padding: 0 45px;
    margin-bottom: 188px;
    padding-bottom: 100px;
    .title {
        font-size: 18px;
        line-height: 40px;
        padding-top: 50px;
        color: #333;
        font-weight: 600;
        border-bottom: 1px solid rgba(204,204,204,1);
        text-indent: 35px;
    }
    .main-body {
        .from {
            width: 400px;
            margin-left: 34px;
            margin-top: 28px;
            .login {
                padding-top: 28px;
                button {
                    width: 220px;
                    height: 40px;
                    line-height: 40px;
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
    }
}

.el-select, .el-cascader {
    width: 100%;
}
</style>
