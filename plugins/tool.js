import {Message, MessageBox, Loading} from 'element-ui';
import TOKEN_OBJ_ID from '~/api/ajax.js';

// 获取存储中某值
export const SAVE_LASTING = true

function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log('error：' + str + '!!!' + e);
            return false;
        }
    }
}

export const formatTime = (str) => {
    let d = new Date(str);
    let year = d.getFullYear();
    let month = change(d.getMonth() + 1);
    let day = change(d.getDate());
    let hour = change(d.getHours());
    let minute = change(d.getMinutes());
    let second = change(d.getSeconds());

    function change(t) {
        if (t < 10) {
            return "0" + t;
        } else {
            return t;
        }
    }
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}


export const getItem = (key) => {
    let val = ""
    if (SAVE_LASTING) {
        val = localStorage.getItem(key)
    } else {
        val = sessionStorage.getItem(key)
    }
    if (isJSON(val)) {
        return JSON.parse(val)
    } else {
        return val
    }
}

// 设置存储中某值
export const setItem = (key, val) => {
    val = JSON.stringify(val)
    if (SAVE_LASTING) {
        val = localStorage.setItem(key, val)
    } else {
        val = sessionStorage.setItem(key, val)
    }
}

// 正确的提示框
export const successMsg = (msg) => {
    MessageBox.alert(msg, '提示', {
        type: 'success',
        center: false
    })
}

// 错误的提示框
export const errorMsg = (msg) => {
    MessageBox.alert(msg, '提示', {
        type: 'error',
        center: false
    })
}

// 警告的提示框
export const warningMsg = (msg) => {
    MessageBox.alert(msg, '提示', {
        type: 'warning',
        center: false
    })
}

// 加载
export const loadingOpen = (msg) => {
    return Loading.service({
        fullscreen: true,
        lock: true,
        text: msg,
        spinner: 'el-icon-loading'
    })
}

// 关闭加载
export const loadingClose = () => {
    let loadingInstance = loadingOpen()
    loadingInstance.close()
}

// 是否实名验证
export const checkRealName = () => {
    let flag = true
    let real_name = getItem('userInfo').real_name
    let id_card = getItem('userInfo').id_card
    if (!real_name || !id_card || id_card == '' || real_name == '') {
        flag = false
    } else {
        flag = true
    }
    return flag
}

export const validLogin = () => {
    let userInfo = getItem('userInfo')
    let token = getItem(TOKEN_OBJ_ID)
    return userInfo && token
}

// 判断是否为微信环境
export const isWechat = () => {
    let ua = navigator.userAgent.toLowerCase()
    let isWeixin = ua.indexOf('micromessenger') != -1
    if (isWeixin) {
        return true
    } else {
        return false
    }
}

// 压缩图片
export const compress = function (file, quality, callback) {
    if (!window.FileReader || !window.Blob) {
        return errorHandler('您的浏览器不支持图片上传')()
    }

    var reader = new FileReader()
    var mimeType = file.type || 'image/jpeg'

    reader.onload = createImage
    reader.onerror = errorHandler('图片读取失败！')
    reader.readAsDataURL(file)

    function createImage() {
        var dataURL = this.result
        var image = new Image()
        image.onload = compressImage
        image.onerror = errorHandler('图片加载失败')
        image.src = dataURL
    }

    function compressImage() {
        var canvas = document.createElement('canvas')
        var ctx
        var dataURI

        canvas.width = this.naturalWidth
        canvas.height = this.naturalHeight
        ctx = canvas.getContext('2d')
        ctx.drawImage(this, 0, 0)
        dataURI = canvas.toDataURL(mimeType, quality)

        callback(null, dataURI)
    }

    function errorHandler(message) {
        return function () {
            var error = new Error('Compression Error:', message)
            callback(error, null)
        }
    }
}

// 时间格式化
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}

// 格式化金额
export function formatMoney(num) {
    let money
    if (num != '--') {
        if (typeof num === "string") {
            money = num.replace(/([0-9]+\.[0-9]{2})[0-9]*/, '$1')
        } else {
            money = Number(num).toFixed(2)
        }
        if (money == 'NaN') return '0.00'
        if (money.indexOf('.') == -1) {
            money = money + '.00'
        } else if (money.substr(-2, 1) == '.') {
            money = money + '0'
        }
        let now = money.replace(/(\d{1,3})(?=(\d{3})+(?:$|\D))/g, '$1,')
        return now
    } else {
        return num
    }

}

/*Number.prototype.toFixed = function (s) {
    let str = this.toString()
    let model = `([0-9]+\\.[0-9]{${s}})[0-9]*`
    return str.replace(new RegExp(model), '$1')
}*/

export function fixed (num, n) {
    /*
    * num 数字
    * n  保留几位小数
    * */
    num = Number(num)
    let i = parseInt(Math.ceil(num * Math.pow(10, n + 1)) / 10)
    return i / Math.pow(10, n)
}

/*
 params: num 期望长度
str: 目标字符串 */
export function fillZero (num, str) {
    if (!str) {
        return str
    }
    str = str.toString()
    let dec
    let inte
    if (str.indexOf(".") > -1) {
        dec = str.split('.')[1]
        inte = str.split('.')[0]
    } else {
        return str
    }
    if (dec.length < num) {
        return inte + '.' + dec.padEnd(num, "0")
    } else {
        return str
    }
}
