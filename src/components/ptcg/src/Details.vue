<template>
    <div class="cardinfo-hideback">
        <div class="cardinfo-overlay" @click="handleCardInfoClick">
            <div class="cardinfo-content">
                <div>
                    <img :src="requireImage(selectedCard.image)" class="pkmn-card-large">
                    <button @click="cardStore.addCard(selectedCard)">添加到收藏</button>
                    <el-button type="warning" :icon="Star" circle />
                </div>
                
                <div class="cardinfo-other">
                    <div class="section">
                        <div class="cardinfo-head">
                          <div class="level-left">
                            <div class="level-item">
                              <span>
                              <span class="bold">{{ selectedCard.name }}</span>
                              {{ selectedCard.details.pokemonCategory }}                            
                              </span>
                              <span class="italic">
                                  {{ selectedCard.details.cardTypeText }}-{{ selectedCard.details.evolveText }}
                              </span>                          
                            </div>
                          </div>
                          <div class="level-right">
                            <div class="level-item-right">
                            HP {{ selectedCard.details.hp }}
                          <img :src="requireAttribute(selectedCard.details.attribute)" class="attribute">
                            </div>
                          </div>
                      </div>
                      <hr>  
                    </div>
                    
                    <div class="section" v-if="selectedCard.details.cardFeatureItemList">
                      <div class="cardinfo-ability" >
                        <p class="heading">ABILITY</p>
                        <img src="@/assets/pokemon/a.png" class="ability">
                        <span class="bold">{{ selectedCard.details.cardFeatureItemList[0].featureName }}</span>
                        <p class="cardinfo-sdesc">{{ selectedCard.details.cardFeatureItemList[0].featureDesc}}</p>
                      </div>
                      <hr>
                    </div>

                    <div class="section">
                      <div class="cardinfo-attack">
                        <p class="heading">ATTACKS</p>
                        <div v-for="item in selectedCard.details.abilityItemList" class="cardinfo-attack-container ">
                          <div class="cardinfo-attack-cost">
                          <div v-for="cost in item.abilityCost.split(',')"  >
                            <img :src="requireAttribute(cost)" class="attribute">
                          </div>
                          <p class="bold">{{ item.abilityName }}</p>                          
                          </div>

                          <div class="">
                          <p v-if="item.abilityDamage!='none'">{{ item.abilityDamage }}</p>
                          <p v-else>0</p>
                        </div>
                        </div>
                      </div>
                      <hr>
                    </div>
                    <div class="section">
                      <div class="cardinfo-res">
                        <div class="cardinfo-res-box">
                          <p class="heading">Weakness</p>
                          <div v-if="selectedCard.details.weaknessType">
                            <img :src="requireAttribute(selectedCard.details.weaknessType)" class="attribute">
                            {{ selectedCard.details.weaknessFormula }}                            
                          </div>
                          <div v-else>
                            N/A
                          </div>
                        </div>

                        <div class="cardinfo-res-box">
                          <p class="heading">resistance</p>
                          <div v-if="selectedCard.details.resistanceType">
                            <img :src="requireAttribute(selectedCard.details.resistanceType)" class="attribute" alt="N/A">
                            {{ selectedCard.details.resistanceFormula }}
                          </div>
                          <div v-else>
                            N/A
                          </div>
                        </div>                  
                        <div class="cardinfo-res-box">
                          <p class="heading">RECEAT COST</p>
                          <img :src="requireAttribute(11)" class="attribute" v-for="i in selectedCard.details.retreatCost">
                        </div>
                        <div class="cardinfo-res-box"> 
                          <p class="heading">Artist</p>
                          {{ selectedCard.details.illustratorName[0] }}
                        </div>
                        <div class="cardinfo-res-box"> 
                          <p class="heading">rarity</p>
                          {{ selectedCard.details.rarityText }}
                        </div>
                        <div class="cardinfo-res-box"> 
                          <p class="heading">number</p>
                          {{ selectedCard.details.collectionNumber }}
                        </div>

                        <div class="cardinfo-res-box"> 
                          <p class="heading">SET</p>
                          <!-- <p v-for="i in selectedCard.details.commodityList">
                            {{ i.commodityName }}
                          </p> -->
                          {{  selectedCard.details.commodityList[0].commodityName }}
                        </div>
                      
                      <hr>                        
                      </div>

                    </div>

                    <!-- <select class = "collection-select" v-model="selectedCollection" >
                        <option value="">选择</option>
                        <option v-for="(collection,index) in collections" 
                        :key="collection.name" 
                        :value="collection.name" 
                        :selected="index===0">
                        {{ collection.name }}
                        </option>
                    </select>
                    <div  v-for="collection in collections" :key="collection.name" class= "cardinfo-collectionbox"  v-show="collection.name === selectedCollection">
                        <img class="collection-cover" :src=requireCollectionImage(collection.name)>                
                    </div> -->

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {Star} from '@element-plus/icons-vue'
import { defineProps, ref, onMounted } from 'vue';  
import {requireImage} from '@/apis/ptcg'
import {requireCollectionImage} from '@/apis/ptcg'
import {requireAttribute} from '@/apis/ptcg'
import {getptcgAPI} from '@/apis/ptcg'
import {getpokeAPI} from '@/apis/ptcg'
import { usecardStore } from "@/components/ptcg/stores/cardStore";

const cardStore = usecardStore()

const ptcg = getptcgAPI()


const props = defineProps({
    selectedCard:{
        type:Object,
        required:true,
    }
})

const collections = ref([])

const selectedCollection = ref('')

const closeCardInfo = defineEmits(['close']); 

onMounted(() => {  
      findCollections()
    })

    const handleCardInfoClick = (event) => {  
      const targetElement = event.target;  
      const cardInfoElement = document.querySelector('.cardinfo-content');  
      if (!cardInfoElement.contains(targetElement)) {  
        // 点击事件在特定区域内，执行相关操作  
        closeCardInfo('close');  
      }  
    };  
  
    const findCollections = () => {  
      const selectedCardID = getIdByImagePath(props.selectedCard.image);  
      for (const collection of ptcg.collections) {  
        for (const card of collection.cards) {  
          if (card.id === selectedCardID) {  
            collections.value.push(collection);  
            // 如果只需要找到第一个匹配的集合，可以添加 break 语句  
            // break;  
          }  
        }  
      }  
    };  
  
    const getIdByImagePath = (imagePath) => {  
      for (const collection of ptcg.collections) {  
        for (const card of collection.cards) {  
          if (card.image === imagePath) {  
            return card.id;  
          }  
        }  
      }  
      return null; // 如果没有找到，返回 null  
    };  
  
    // 隐藏卡片信息并发出事件  
    const hideCardInfo = () => {  
      closeCardInfo('close');  
    };  
 
</script>

<style scoped>
.cardinfo-hideback{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;

}
.cardinfo-overlay{
    /* top:100px; */
    /* left: 0; */
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}
hr {
    background-color: #d3d3d3;
    border: none;
    display: block;
    height: 5px;
    margin: 5px 0;
}
.nodisplay{
  display: none;
}
.cardinfo-content{
    width: 70%;
    max-width: 100%;
    height: auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 4%;
    display: flex;
    .cardinfo-sdesc{
      font-size: 13px;
    }
    .attribute{
      display: inline-block;
      vertical-align: top;
      min-width: 25px;
      max-width: 25px;
      width: 25px;
      height: auto;
    }
    .bold{
      font-weight: bold;
    }
    .italic{
      font-style: italic;
    }
}
.cardinfo-other{
    margin: 15px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
    .section{
      display: flex;
      flex-direction: column;
    }
    .cardinfo-head{
      display: flex;
      flex: 1;
      justify-content: space-between;
      .level-item {
          display: flex;
          flex-direction: column;
          justify-content: start;
      }
    }
    .heading{
      display: block;
      font-size: 11px;
      letter-spacing: 1px;
      margin-bottom: 5px;
      text-transform: uppercase
    }
    .cardinfo-ability{
      .ability{
            display: inline-block;
            vertical-align: top;
            min-width: 80px;
            width: 100px;
            height: auto;
          }
    }
    .cardinfo-attack-container{
      display: flex;
      justify-content: space-between;
      .cardinfo-attack-cost{
        display: flex;
      }      
    }
    .cardinfo-res{
      display: flex;
      flex-wrap: wrap;
      .cardinfo-res-box{
        /* flex:1 0 auto; */
        flex: none;
        width: 33.3333%;
        padding: 10px;
        
      }
    }

}
.cardinfo-collectionbox{
    flex: 1 1 auto;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column; /* 根据需要选择flex方向，默认为row */
    justify-content: center;
    align-items: center;
    text-align: center;
}

.pkmn-card-large {
    min-width: fit-content;
    height: 80%;
    margin: 15px;
    border-radius: 20px;
    box-shadow: 5px 5px 6px rgba(0, 0, 0, 0.45);
}

.collection-cover {
    max-width: fit-content;
    height: 300px;
    margin: 15px;

}
.collection-select{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 50px;
    width: 100%;
}

</style>