import {defineStore} from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './userStore'
import { delCartAPI, findNewCartListAPI, insertCartAPI ,updateCartItem,updateSelected} from '@/apis/cart'

export const useCartStore = defineStore(
    'cart',
    ()=>{
        const cartList = ref([])
        const userStore = useUserStore()
        const isLogin = computed(()=>userStore.userInfo.token)

        const updateLoginCartList = async ()=>{
            const res = await findNewCartListAPI()
            cartList.value = res.result
        }
        const addCart = async(goods)=>{
            if(isLogin.value){
                await insertCartAPI(goods)
                await updateLoginCartList()
            }else{
                //未登录
                const findItem = cartList.value.find(item=>goods.skuId===item.skuId);
                if (findItem){
                    findItem.count += goods.count
                }else{
                    cartList.value.push(goods)
                }                
            }

        }
        const deleteCart = async (skuId)=>{
            if(isLogin.value){
                await delCartAPI([skuId])
                await updateLoginCartList()
            }else{
                const deletidx = cartList.value.findIndex(item=>skuId===item.skuId)
                cartList.value.splice(deletidx,1)                
            }

        }
        const checkAll =async(selected)=>{

            if(isLogin.value){
                const check = {
                    "selected":selected,
                    "ids":[]
                }
                cartList.value.forEach(item=>{
                    check.ids.push(item.skuId)
                })
                console.log(check)                
                await updateSelected(check)
                await updateLoginCartList()
            }else
            cartList.value.forEach(item => item.selected = selected)
        }
        const clearCart = ()=>{
            cartList.value = []
        }
        const updateCart = async(goods)=>{
            const{skuId,count,selected} = goods
            if (isLogin.value){
                await updateCartItem(skuId,{count,selected})
            }
        }


        const isAll = computed(()=>cartList.value.every(item=>item.selected))
        const allCount = computed(()=>cartList.value.reduce((a,c)=>a+c.count,0))
        const allPrice = computed(()=>cartList.value.reduce((a,c)=>a+c.count*c.price,0))
        // 4. 已选择数量
        const selectedCount = computed(() => cartList.value.filter(item => item.selected)
        .reduce((a, c) => a + c.count, 0))
        // 5. 已选择商品价钱合计
        const selectedPrice = computed(() => cartList.value.filter(item => item.selected)
        .reduce((a, c) => a + c.count * c.price, 0))

        return{
            cartList,
            addCart,
            deleteCart,
            checkAll,
            isAll,
            updateLoginCartList,
            updateCart,
            clearCart,
            
            allCount,
            allPrice,
            selectedCount,
            selectedPrice,
        }
    },
    {
        persist:true
    }
)