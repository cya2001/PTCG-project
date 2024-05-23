import http from '@/utils/https'

export function getTopCategoryAPI(id){
    const res = http.get('/category',{params:{id}})
    return res
}

export function getCategoryFilterAPI(id){
    return http.get('/category/sub/filter',{params:{id}});
}


/**
 * @description: 获取二级分类商品列表
 * @data {
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   }
 * @return {*}
 */
export const getSubCategoryAPI = (data) => {
    return http.post('/category/goods/temporary',data);
}