import { loginAPI } from "@/apis/user";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
    'user',
    ()=>{
        const userInfo = ref({})
        const getUserInfo = async(user) =>{
            const res = await loginAPI(user)
            userInfo.value = res.result
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