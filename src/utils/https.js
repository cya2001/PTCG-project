import axios from 'axios'
const http = axios.create({
    baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout:5000
})

http.interceptors.request.use(config=>{
    return config
},e => Promise.reject(e))

http.interceptors.response.use(res=>res.data,e=>{
    return Promise.reject(e)
})

export default http