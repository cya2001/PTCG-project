import { defineStore } from "pinia";
import { ref } from "vue";
import { getptcgAPI } from "@/apis/ptcg";
import { getpokeAPI } from "@/apis/ptcg";
import { ElMessage } from "element-plus";

export const usecardStore = defineStore('favcard',()=>{
    const favcardList = ref()
    const getCard = async()=>{
        const res = await getptcgAPI()
        // favcardList.vale = res.
    }
    const addCard = async(card)=>{
        console.log(favcardList.value)
        if(favcardList.value.length!=0 && favcardList.value.find(item=>item.id===card.id)){
            // ElMessage('卡牌已经存在！')
            ElMessage({
                type:'warning',
                message:'卡牌已经存在！',
            })
        }else{
            favcardList.value.push(card)
        }
    }
    const delCard = (card)=>{
        const delidx = favcardList.value.findIndex(item=>item.id===card.id)
        favcardList.value.splice(delidx,1)
    }
    const clearCard = ()=>{
        favcardList.value = []
    }
    return{
        favcardList,
        addCard,
        delCard,
        clearCard,
    }

},{persist:true})