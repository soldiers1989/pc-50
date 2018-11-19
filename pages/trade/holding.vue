<template>
    <div class="trade_child_page">
        <holding-content></holding-content>
    </div>
</template>
<script>
    import holdingContent from "~/components/holdingContent.vue"
    export default {
        name: "holding",
        components: {
            holdingContent
        }
    }
</script>

<style scoped lang="less">
    @import url(~assets/less/trade.less);
</style>
