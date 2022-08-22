const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        proxy: {
            // 所有以/apis开头的请求路径会走这个代理
            '/apis': {
                target: "https://apis.map.qq.com",
                secure: true,
                ws: true,
                changeOrigin: true,
                pathRewrite: { '^/apis': '' }
            }
        }
    }
})