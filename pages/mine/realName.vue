<template>
    <div>
        <div class="main">
            <p class="title">实名认证</p>
            <div class="main-body">
                <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
                    <el-form-item label="真实姓名" prop="realName">
                        <el-input type="text" v-model="ruleForm.realName" auto-complete="off" placeholder="请输入您的真实姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" prop="idNumber">
                        <el-input type="text" v-model="ruleForm.idNumber" auto-complete="off" placeholder="请输入您的18位身份证号码"></el-input>
                    </el-form-item>
                </el-form>
                <p>实名认证将会影响您的充值和提现，请正确填写</p>
                <div align="center" class="sure">
                    <button @click="submitForm('ruleForm')" :disabled="isSubmitting">确定</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import {createCertification} from '~/api/personal';
import {successMsg, errorMsg} from '~/plugins/tool';
import {getUserInfo} from '~/api/ajax';
import {mapState, mapMutations} from 'vuex';

export default {
    data() {
        return {
            labelPosition: 'top',
            ruleForm: {
                realName: '',
                idNumber: ''
            },
            rules: {
                realName: [
                    {required: true, message: '请输入姓名', trigger: 'blur'},
                    {pattern: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/, message: '请输入正确的姓名', trigger: 'blur'}
                ],
                idNumber: [
                    {required: true, message: '请输入身份证号码', trigger: 'blur'},
                    {pattern: /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/, message: '请输入正确的身份证号码', trigger: 'blur'}
                ]
            },
        }
    },
    computed: {
        ...mapState(['isSubmitting'])
    },
    methods: {
        ...mapMutations(['changeSubmitting']),
        submitForm(formName) {
            let _this = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.changeSubmitting()
                    createCertification({
                        real_name: this.ruleForm.realName,
                        id_card: this.ruleForm.idNumber
                    })
                    .then((res) => {
                        if (res.status == 1) {
                            successMsg("认证成功!")
                            getUserInfo().then((res) => {
                                this.$router.push({name: 'mine-account', query:{tabView: 'select1', iscur: 0}})
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
    }
}
</script>

<style scoped lang="less">
.main {
    background-color: #fff;
    height: 627px;
    padding: 0 45px;
    margin-bottom: 188px;
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
        padding-left: 35px;
        padding-top: 29px;
        width: 400px;
        p {
            font-size: 14px;
            color: rgba(153,153,153,1);
            line-height: 31px;
            margin-bottom: 40px;
        }
        .sure {
            button {
                width: 200px;
                height: 40px;
                background: rgba(235,47,48,1);
                border-radius: 20px;
                box-shadow: 5px 0px 8px rgba(235,47,48,0.3);
                color: #fff;
                border: none;
                outline: none;
                cursor: pointer;
            }
        }
    }
}
</style>
