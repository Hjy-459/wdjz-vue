//该文件用于创建Vuex中最为核心的store
import Vuex from "vuex"
import Vue from "vue";
Vue.use(Vuex)
//响应组件中的动作
const actions={
    demoApplyInfo(){
        console.log("test")
    }
}
//操作数据
const mutations={}
//存储数据
const state={}

export default new Vuex.Store({
    namespaced:true,
    actions,
    mutations,
    state
})