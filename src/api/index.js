/** 
 * api接口的统一出口
 */
// 用户列表模块
import user from '@/api/user'
import product from './product'
import packages from "@/api/package"
import news from "@/api/news"
import job from "@/api/job"
import home from "@/api/home"
import order from "@/api/order"
import post from "@/api/post"
import address from '@/api/address'
import server from "@/api/server"

// 其他模块的接口……

// 导出接口
export default {
    user,
    product,
    packages,
    news,
    job,
    home,
    order,
    post,
    address,
    server
}
