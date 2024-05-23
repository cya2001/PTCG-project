import http from "@/utils/https";

/**
 * @description: 根据id获得商品详情
 * @param {*} id 分类id
 * @return {*}
 */
export function getDetail(id){
    return http.get('/goods',{params:{id}});
}

export const getHotGoodsAPI = ({ id, type, limit = 3 }) => {
    return http.get('/goods/hot',{params:{
            id,
            type,
            limit
        }});
}