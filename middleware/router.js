// 中间件配置

import {fetchToken} from "../api/ajax";
import {bus} from "../plugins/bus";

export default function ({store, redirect}) {
    // console.log(store.app.context.route.name)
    if (store.app.context.route.name) {
        if (store.app.context.route.name.indexOf("trade") > -1) {
            bus.$emit("isSelectTrade")
        }
        if (store.app.context.route.name.indexOf("mine") > -1) {
            bus.$emit("isSelectMine")
        }
        if (store.app.context.route.name.indexOf("trade") > -1) {
            bus.$emit("tradeSelect", store.app.context.route.name)
        }
    }
}
