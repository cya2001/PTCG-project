<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
// import getPowerSet from '../sku/power-set'

const http = axios.create({
    baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout:10000
})

http.interceptors.request.use(config=>{
    return config
},e => Promise.reject(e))

http.interceptors.response.use(res=>res.data,e=>{
    return Promise.reject(e)
})


const getDetail = (id)=>{
    return http.get('/goods',{params:{id}})
}

const goods= ref({})
let pathMap = {}
//1135076 初始化就有无库存的规格
//1369155859933827074 更新之后有无库存项 (蓝色-20cm-中国)
const id1 = 1135076
const id2 = 4026450
const id3 = 4026809
const getGoods = async()=>{
    const res = await getDetail(id3)
    goods.value = res.result
    pathMap = getPathMap(goods.value)
    initDisabledStatus(goods.value.specs,pathMap)
}
onMounted(()=>{getGoods()})

// 生成有效路径字典对象
const getPowerSet = (arr)=>{
    const powerset = []
    const n = arr.length
    for(let i =0;i<n**2;i++){
        const sub = []
        for (let j =0;j<n;j++){
            if (i&(1<<j)){
                sub.push(arr[j])
            }
        }
        powerset.push(sub)
    }
    return powerset
}

const getPathMap = (goods)=>{
    const pathMap = {}
    const effectiveSkus = goods.skus.filter(sku=>sku.inventory>0)
    effectiveSkus.forEach(sku=>{
        const selectedValArr = sku.specs.map(val=>val.valueName)
        const valueArrPowerSet = getPowerSet(selectedValArr)
        valueArrPowerSet.forEach(arr=>{
            const key = arr.join('-')
            if(pathMap[key]){
                pathMap[key].push(sku.id)
            }else{
                pathMap[key] = [sku.id]
            }
        })
    })
    return pathMap
}
const changeSelectedStatus = (item,val) =>{
    if(val.disabled){
        return
    }
    if(val.selected){
        val.selected = false
    }else{
        item.values.forEach((i)=>{
            i.selected = false
        })
        val.selected = true
    }
    updateDisabledStatus(goods.value.specs,pathMap)
    const index = getSelectedValues(goods.value.specs).findIndex(item=>item === undefined)
    if (index>-1){
        // console.log('notyet')
    }else{
        const key = getSelectedValues(goods.value.specs).join('-')
        const skuIds = pathMap[key]
        const skuobj = goods.value.skus.find(item=>item.id === skuIds[0])
    }
}

const initDisabledStatus = (specs,pathMap)=>{
    specs.forEach(spec=>{
        spec.values.forEach(val=>{
            if(pathMap[val.name]){
                val.disabled = false
            }else{
                val.disabled = true
            }
        })
    })
}

const getSelectedValues = (specs)=>{
    const arr = []
    specs.forEach(spec=>{
        const selectedVal = spec.values.find(item=>item.selected)
        arr.push(selectedVal?selectedVal.name:undefined)
    })

    return arr
}

const updateDisabledStatus = (specs,pathMap)=>{
    specs.forEach((spec,index)=>{
        const selectedValues = getSelectedValues(specs)
        spec.values.forEach(val=>{
            selectedValues[index] = val.name
            const key = selectedValues.filter(item=>item).join('-')
            if(pathMap[key]){
                val.disabled = false
            }else{
                val.disabled = true
            }
        })

    })

}

</script>

<template>
 <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img :class="{selected:val.selected ,disabled:val.disabled}" 
          @click="changeSelectedStatus(item,val)"
            v-if="val.picture" :src="val.picture" />
          <span  :class="{selected:val.selected,disabled:val.disabled}" v-else @click="changeSelectedStatus(item,val)">{{val.name}}</span>
        </template>
      </dd>
    </dl>
</div>

</template>


<style scoped lang="scss">
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: $xtxColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      >img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>