<template>
    <div>
        <div class="main">
            <div>
                <p class="cz_h2">第一步：通过网上银行、银行柜台或ATM机等向{{platform_name}}转账<i>（请先手动转账成功后再进行第二步）</i></p>
                <table class="cz_two" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td width="202">
                                <img :src="transformPic" class="bank-img">
                            </td>
                            <td>银行帐号：{{transformAccount.recharge_bank_account}}
                            <br>
                            账户名称：{{transformAccount.recharge_real_name}}
                            <br>
                            开户银行：{{transformAccount.recharge_bank_name}}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3"><span>请使用实名认证对应姓名的银卡进行转账、汇款</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <p class="cz_h2">第二步：填写银行转账确认单<i>（转账确认单是用于财务核对具体转账单，便于及时入到您的个人中心）</i></p>
                <table class="cz_two" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <th>转账方式</th>
                            <td>
                                <el-radio-group v-model="transferData.transfer_type">
                                <el-radio :label="0">ATM</el-radio>
                                <el-radio :label="1">柜台转账</el-radio>
                                <el-radio :label="2">网上银行</el-radio>
                                <el-radio :label="3">手机银行</el-radio>
                                <el-radio :label="4">支付宝</el-radio>
                                <el-radio :label="5">其它</el-radio>
                                </el-radio-group>
                            </td>
                        </tr>
                        <tr>
                        <th style="color: red; width: 190px;">选择您转入的银行</th>
                        <td>
                            <select name="yh">
                                <option>{{transformAccount.recharge_bank_name}} 账号：{{transformAccount.recharge_bank_account}}</option>
                            </select>
                        </td>
                        </tr>
                        <tr>
                            <th>转账金额</th>
                            <td>
                                <input type="text" name="amount_of_account" required class="txt" style="width: 170px"
                                    autocomplete="off" v-model="transferData.amount_of_account" @keyup="limitLen">元<strong>*</strong>
                                <span class="fontRed">(此数值仅作校对使用)</span>
                            </td>
                        </tr>
                        <tr>
                        <th>备 注</th>
                        <td>
                            <textarea class="txt" style="width: 600px; height: 40px; line-height: 20px;" name="cust_remark"
                                        v-model="transferData.cust_remark">本人确认该笔款项用于期权交易之用</textarea><br>
                            <i>
                            <br>
                            提示：网上银行填写支付平台名称和交易号，其它填写转账银行及卡号,周五18:00至周一9:00的转账，将在周一9:30前完成入金
                            </i>
                        </td>
                        </tr>
                    <tr>
                    <th>转账凭证</th>
                    <td>
                        <el-upload
                            class="avatar-uploader"
                            :http-request="uploadFile"
                            :show-file-list="false"
                            action=""
                            :before-upload="beforeAvatarUpload">
                        <img v-if="transferData.cust_pic_remark" :src="transferData.cust_pic_remark" class="avatar">
                        <i v-else class="avatar-uploader-icon">
                            <img src="~static/images/add.png">
                        </i>
                        </el-upload>
                    </td>
                    </tr>
                    <tr>
                    <th>&nbsp;</th>
                    <td>
                        <button @click="submitTransfer" class="trans_button">确认上传</button>
                    </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="cz_three" v-html="getProtocol(4)"></div>
        </div>



        <!--转账支付提示-->
        <el-dialog
        title="提交成功"
        :visible.sync="transformMention"
        width="25%" :close-on-click-modal='false'>
            <p class="transformMention_text">温馨提示：</p>
            <p class="transformMention_text">请仔细阅读到账时间说明</p>
            <p class="transformMention_text">为了快速处理，请勿重复提交！！</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="transformMention = false">取 消</el-button>
                <el-button type="primary" @click="transformMention = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {offlineTransfer, uploadImage} from '~/api/personal.js';
import {successMsg, errorMsg, validLogin, compress, getItem, checkRealName} from "~/plugins/tool.js";
import {mapState, mapMutations} from 'vuex';
export default {
    data() {	
        return {
             transformAccount: {
                recharge_bank_account: '',
                recharge_real_name: '',
                recharge_bank_name: ''
            },
            platform_name: '',
            transferData: {},
            transformPic: '',
            protocolData: '',
            transformMention: false,
            protocols: {1: '', 2: '', 3: '', 4: ''},
            bankDataAll: [
                {id: 1, src: '../../../images/icbc.jpg', alt: '工商银行', status: false, code: "icbc"},
                {id: 2, src: '../../../images/abc.jpg', alt: '农业银行', status: false, code: "abc"},
                {id: 3, src: '../../../images/ccb.jpg', alt: '建设银行', status: false, code: "ccb"},
                {id: 4, src: '../../../images/boc.jpg', alt: '中国银行', status: false, code: "boc"},
                {id: 5, src: '../../../images/bocom.jpg', alt: '交通银行', status: false, code: "comm"},
                {id: 6, src: '../../../images/cib.jpg', alt: '兴业银行', status: false, code: "cib"},
                {id: 7, src: '../../../images/citic.jpg', alt: '中信银行', status: false, code: "cncb"},
                {id: 8, src: '../../../images/ceb.jpg', alt: '光大银行', status: false, code: "ceb"},
                {id: 9, src: '../../../images/pab.jpg', alt: '平安银行', status: false, code: "pingan"},
                {id: 10, src: '../../../images/psbc.jpg', alt: '邮政储蓄银行', status: false, code: "psbc"},
                {id: 11, src: '../../../images/shb.gif', alt: '上海银行', status: false, code: "bosh"},
                {id: 12, src: '../../../images/spdb.jpg', alt: '浦发银行', status: false, code: "spdb"},
                {id: 13, src: '../../../images/cmb.jpg', alt: '招商银行', status: false, code: "cmb"},
                {id: 14, src: '../../../images/cmbc.jpg', alt: '民生银行', status: false, code: "cmbc"},
                {id: 15, src: '../../../images/hxb.jpg', alt: '华夏银行', status: false, code: "hxb"},
                {id: 16, src: '../../../images/gdb.jpg', alt: '广东发展银行', status: false, code: "gdb"},
                {id: 17, src: '../../../images/bob.jpg', alt: '北京银行', status: false, code: "bob"},
                {id: 18, src: '../../../images/yl.png', alt: 'others', status: false, code: "yl"}
            ],
        }
    },
    methods: {
        ...mapMutations(['changeSubmitting', 'routerTo']),
        updateBankPic() {
            let _this = this
            let bank_name = this.transformAccount.recharge_bank_name
            for (let i = 0; i < this.bankDataAll.length; i++) {
                let obj = _this.bankDataAll[i]
                if (bank_name.indexOf(obj.alt) > -1) {
                    _this.transformPic = obj.src
                    return false
                } else if (i == this.bankDataAll.length - 1) {
                    _this.transformPic = _this.bankDataAll[17].src
                }
            }
        },
        limitLen () {
            if (this.transferData.amount_of_account.length > 7) {
                this.transferData.amount_of_account = this.transferData.amount_of_account.substr(0, 7)
                errorMsg("充值金额不能超过7位")
            }
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 10
            if (!isLt2M) {
                errorMsg('上传图片大小不能超过 10MB!')
            }
            return isLt2M
        },
        uploadFile(file) {
            let _this = this
            compress(file.file, 0.1, function (e, data) {
                if (e) {
                    errorMsg(e)
                }
                uploadImage({file: data}).then((res) => {
                    if (res.status == 1) {
                        _this.transferData.cust_pic_remark = res.data.path
                    } else {
                        errorMsg(res.msg)
                    }
                })
            })
        },
        submitTransfer() {
            let _this = this
            let mount = Number(this.transferData.amount_of_account)
            if (!checkRealName()) {
                this.$confirm('您还未实名认证，请先实名认证再绑卡', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.routerTo('/mine/realName')
                }).catch(() => {
                });
            } else if (mount === '' || mount < 100) {
                errorMsg('充值金额不得小于100元')
            } else if (this.transferData.cust_remark === '') {
                errorMsg('备注不能为空')
            } else {
                offlineTransfer(this.transferData).then(function (res) {
                    if (res.status == 1) {
                        _this.initTransferForm()
                        _this.transformMention = true
                    } else {
                        errorMsg(res.msg)
                    }
                })
            }
        },
        initTransferForm() {
            this.transferData = {
                amount_of_account: "",
                transfer_type: 0,
                cust_pic_remark: '',
                cust_remark: '本人确认该笔款项用于期权交易之用'
            }
        },
        getProtocol (type) {
            return this.protocols[type] || ''
        },
        updateIndexData() {
            let indexData = getItem("indexData")
            if (indexData) {
                this.protocols = indexData.others
                this.platform_name = indexData.platform_name
                this.transformAccount.recharge_bank_account = indexData.recharge_bank_account
                this.transformAccount.recharge_bank_name = indexData.recharge_bank_name
                this.transformAccount.recharge_real_name = indexData.recharge_real_name
            }
        }
    },
    mounted() {
        this.updateBankPic()
        this.initTransferForm()
        this.updateIndexData()
    },
}
</script>

<style scoped lang="less">
@import url(~/assets/css/bank.css);
</style>