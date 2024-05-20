import { loginAPI } from "@/apis/user";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useCartStore } from "./cartStore";

export const useUserStore = defineStore(
    'user',
    ()=>{
        const userInfo = ref({})
        const cartStore = useCartStore()
        const getUserInfo = async(user) =>{
            const res = await loginAPI(user)
            userInfo.value = res.result
            await cartStore.updateLoginCartList()
        }
        const clearUserInfo = () => {
            userInfo.value = {}
          }
        return {
            userInfo,
            getUserInfo,
            clearUserInfo,
        }
    },
    {
        persist:true
    }
)