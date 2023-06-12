import VueRouter from 'vue-router'
import UpdateCalendar from '../pages/UpdateCalendar'
import NewsManagement from "../pages/NewsManagement";
import DemoApplyInfo from '../pages/DemoApplyInfo'
import Wall3DShowList from '../pages/Wall3DShowList'
import full3DWall from '../pages/full3DWall(1)'
import home from '../pages/House'
import addNews from "../pages/AddNews";
import login from "../pages/Login";


export default new VueRouter({
    routes:[
        {
            path:'/',
            component:login
        },
        {
            path:'/updateCalendar',
            component:UpdateCalendar
        },
        {
            path:'/login',
            component:login
        },
        {
            path:'/addNews',
            component:addNews
        },
        {
            path:'/NewsManagement',
            component:NewsManagement
        },
        {
            path:'/Wall3DShowList',
            component:Wall3DShowList,
        },
        {
            path: '/demoApplyInfo',
            component: DemoApplyInfo,
        },
        {
            path: '/full3DWall',
            component: full3DWall,
        },
        {
            path: '/home',
            component: home,
        },
    ]
})