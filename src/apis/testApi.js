import http from '@/utils/https'

export function getCategoryAPI () {
    return http.get('home/category/head')
}