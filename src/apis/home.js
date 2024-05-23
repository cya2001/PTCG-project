import http from '@/utils/https'

export function getBannerAPI (id='1') {
    return http.get('home/banner',{params:{id}})
}

export function getHotAPI () {
    return http.get('home/hot')
}

export function getNewAPI () {
    return http.get('/home/new')
}

export const getGoodsAPI = () => {
    return http.get('/home/goods')
}