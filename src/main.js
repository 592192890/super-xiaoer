import "babel-polyfill";
import Vue from 'vue'
import router from './router'
import store from './store'
import filters from './filters';
import ajax from './assets/js/ajax'
import apiUrl from './assets/js/api-url'
import util from './assets/js/util'
import ElementUI from 'element-ui'
import './assets/sass/reset/_reset.scss';
import './assets/sass/fonts/common/1.0.0/_common.scss';
import 'element-ui/lib/theme-default/index.css'
import './assets/sass/main.scss';
import App from './App';
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor);
Vue.use(ElementUI);

// 实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
window.center=new Vue();
new Vue({
    el: '#jApp',
    template:'<App />',
    components:{ App },
    router,
    store
})

