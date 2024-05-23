import http from "@/utils/https";

export function findNewCartListAPI(){
    return http.get('/member/cart')
}

export function insertCartAPI(sku){
    return http.post('/member/cart',sku)
}

export const delCartAPI = (ids) => {
    return http.delete('/member/cart',{data:{ids}})
}

export function updateCartItem(skuId,data){   
    return http.put(`/member/cart/${skuId}`,data);
}

export function updateSelected(data){   
    return http.put('/member/cart/selected',data);
}