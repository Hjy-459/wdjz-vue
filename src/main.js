import Vue from "vue"
import App from './App'
// //elementUI的完整引入
//引入elementUI组件库
// import ElementUI from 'element-ui';
// //引入elementUI全部样式
// import 'element-ui/lib/theme-chalk/index.css';
import * as Tcb from 'vue-tcb'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import './assets/Wall3D.css'

// 按需引入
import {Menu, MenuItem,Container,Main,Aside,Table,TableColumn,Button,FormItem,Form,Input,Upload,Image,Row,Col,Submenu,MenuItemGroup,Message,MessageBox} from "element-ui";
//
Vue.config.productionTip=false

Vue.component(Menu.name, Menu);
Vue.component(Main.name, Main);
Vue.component(Aside.name, Aside);
Vue.component(Container.name, Container);
Vue.component(Button.name,Button);
Vue.component(Table.name,Table);
Vue.component(TableColumn.name,TableColumn);
Vue.component(FormItem.name,FormItem);
Vue.component(Form.name,Form);
Vue.component(Input.name,Input);
Vue.component(Upload.name,Upload);
Vue.component(Image.name,Image);
Vue.component(MenuItemGroup.name,MenuItemGroup);
Vue.component(Submenu.name,Submenu);
Vue.component(Row.name,Row);
Vue.component(Col.name,Col);
Vue.component(MenuItem.name,MenuItem);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
// //应用elementUI
// Vue.use(ElementUI);
Vue.use(Tcb,{env:'cloud2-4gsel94f65018501'})

Vue.use(VueRouter)

import cloudbase from "@cloudbase/js-sdk";

const app = cloudbase.init({
    env: "cloud2-4gsel94f65018501"
});


new Vue({
    el:'#app',
    render:h=>h(App),
    router,
    store,
    beforeCreate:function(){
        Vue.prototype.$bus=this;
        const auth=this.$tcb.auth();
        auth.signInAnonymously();
    },

})