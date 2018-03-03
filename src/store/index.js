import Vue from 'vue'	 
import Vuex from 'vuex' 
import classify from './classify/index'
import frontManage from './front-manage/index' 
import backManage from './back-manage/index' 
Vue.use(Vuex)
export default new Vuex.Store({
	modules: {
       	classify,
        frontManage,
        backManage
    } 
})