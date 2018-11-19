module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: '50ETF的投资目标是紧密跟踪上证50指数，最小化跟踪偏离度和跟踪误差，代码510050。基金采取被动式投资策略，具体使用的跟踪指数的投资方法主要是完全复制法，追求实现与上证50指数类似的风险与收益特征。'},
            {hid: 'keywords', name: 'keywords', content: '50ETF，50etf， 汇邦etf，汇邦ETF，汇邦50etf，汇邦50ETF，50ETF专业的场内期权交易平台，上证50etf，上证50ETF'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    /*
    ** Customize the progress bar color
    */
    loading: {color: '#409eff'},
    plugins: [
        {src: '~plugins/element-ui', ssr: true},
        {src: '~plugins/bus', ssr: true},
    ],
    router: {
        middleware: 'router',
        scrollBehavior: function (to, from, savedPosition) {
            return { x: 0, y: 0 }
        }
    },
    css: [
        '~assets/css/normalize.css',
        '~assets/css/main.css',
        {src: 'element-ui/lib/theme-chalk/index.css'},
        {src: '~assets/less/reset.less', lang: 'less'}
    ],
    /*
    ** Build configuration
    */
    build: {
        vendor: ['axios', 'element-ui'],
        ssr: true,
        // 配置webpack loader
        loaders: [

        ],
        extend(config, {isDev, isClient}) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
            config.node = {
                console: true,
                fs: 'empty',
                net: 'empty',
                tls: 'empty'
            }
        }
    }
}
