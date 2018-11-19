<template>
    <section class="error container">
        <h1 class="error-title">
            <img src="~/static/images/img_404.png">
        </h1>
        <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
            回到首页
        </nuxt-link>
    </section>
</template>

<script>
    export default {
        props: ['error']
    }
</script>

<style lang='less' scoped>
.error {
    text-align: center;
    .error-title {
        font-size: 5em;
        font-weight: 600;
        padding: 60px;
    }
    .button {
        display: inline-block;
        color: #000;
        padding: 40px;
        text-decoration: underline;
    }
}
</style>

