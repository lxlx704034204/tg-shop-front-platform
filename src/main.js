import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import VueResource from 'vue-resource';

import axios from 'axios';
import {SERVER_URL} from './assets/config';

axios.defaults.baseURL = SERVER_URL;
// axios.defaults.headers.common['Access-Token']='';

// 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//   // 对响应数据做点什么
//   console.log(response);
//   return response;
// }, function (error) {
//     console.log('axios.interceptors. '+error);
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });

Vue.prototype.$axios = axios;

Vue.use(VueI18n);
Vue.use(iView);
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;
// Vue.http.options.withCredentials = true;

require('./mock/mock');

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // iview-admin检查更新
        util.checkUpdate(this);
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
