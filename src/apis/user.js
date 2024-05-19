import http from "@/utils/https";

/**
 * @description: 根据user对象进行登录
 * @param {Number} id 分类id
 * @return {*}
 */
export function loginAPI(user){
    return http.post('/login',user);
}