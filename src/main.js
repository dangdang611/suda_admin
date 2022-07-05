import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css';
import 'mavon-editor/dist/css/index.css'
import mavonEditor from 'mavon-editor'
import router from '@/router'
import api from "@/api"

// 不是为了vue写的插件(插件内要处理)不支持Vue.use()加载方式
Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.use(mavonEditor);

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$echarts = echarts;
        Vue.prototype.$api = api;
    },
}).$mount('#app')