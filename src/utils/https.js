import { useUserStore } from '@/components/shop/stores/userStore'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useRouter } from 'vue-router';

// setup(){
//     const router= useRouter()
// }

const http = axios.create({
    baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout:10000
})

http.interceptors.request.use(config=>{
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
},e => Promise.reject(e))

http.interceptors.response.use(res=>res.data,e=>{
    //统一错误提示
    ElMessage({
        type:'error',
        message:e.response.data.message,
    })
    const userStore = useUserStore()

    if(e.response.status === 401){
        userStore.clearUserInfo()
        // router.push('/shop/login')
    }
    return Promise.reject(e)
})

export default http