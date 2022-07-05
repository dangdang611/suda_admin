import VueRouter from 'vue-router'

import Index from "@/pages/Index"
import Home from "@/pages/Home"
import UserTable from "@/pages/UserTable"
import ProductTable from "@/pages/ProductTable"
import PackageTable from "@/pages/PackageTable"
import NewsTable from "@/pages/NewsTable"
import JobTable from "@/pages/JobTable"
import UndisposedOrder from "@/pages/UndisposedOrder"
import GoingOrder from "@/pages/GoingOrder"
import FinishedOrder from "@/pages/FinishedOrder"
import VirtualPost from "@/pages/VirtualPost"


export default new VueRouter({
    routes: [{
            path: '/index',
            redirect: '/'
        },
        {
            path: '/',
            name: 'index',
            component: Index,
            children: [{
                    path: '/home',
                    name: 'home',
                    component: Home
                },
                {
                    path: '/userLists',
                    name: 'userLists',
                    component: UserTable
                },
                {
                    path: '/productLists',
                    name: 'productLists',
                    component: ProductTable
                },
                {
                    path: '/packageLists',
                    name: 'packageLists',
                    component: PackageTable
                },
                {
                    path: '/newsLists',
                    name: 'newsLists',
                    component: NewsTable
                },
                {
                    path: '/jobLists',
                    name: 'jobLists',
                    component: JobTable
                },
                {
                    path: '/undisposedOrder',
                    name: 'undisposedOrder',
                    component: UndisposedOrder
                },
                {
                    path: '/goingOrder',
                    name: 'goingOrder',
                    component: GoingOrder
                }, {
                    path: '/finishedOrder',
                    name: 'finishedOrder',
                    component: FinishedOrder

                }
            ]
        },
        {
            path: '/virtualPost',
            name: "virtualPost",
            component: VirtualPost
        }
    ]
})